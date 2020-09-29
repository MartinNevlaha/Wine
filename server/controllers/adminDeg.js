const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const Degustator = require('../models/degustator');
const Groups = require('../models/degGroup');
const generatePassword = require('../utils/generatePaswword');


exports.getAllDeg = async (req, res, next) => {
    try {
        const degustators = await Degustator.find({}, '-password');
        if (!degustators) {
            const error = new Error("Nemožem načítat dáta z DB");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            message: 'Načítanie dát úspešné',
            degustators: degustators
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.createDeg = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Zadané dáta sú nesprávne');
        error.statusCode = 422;
        return next(error);
    } 
    const {id, name, surname} = req.body;
    const password = generatePassword(surname, id);
    const hashedPw = await bcrypt.hash(password, 12);
    try {
        const deg = new Degustator({
            id, 
            name, 
            surname, 
            group: null,
            password: hashedPw
        });
        const response = await deg.save();
        res.status(201).json({
            message: "Degustator vytvorený",
            _id: response._id
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.deleteAllDegustators = async (req, res, next) => {
    try {
        await Degustator.deleteMany({});
        await Groups.deleteMany({});
        res.status(200).json({message: 'Databáza degustátorov bola vymazaná'})
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.editDegustator = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Zadané dáta sú nesprávne');
        error.statusCode = 422;
        return next(error);
    } 
    const degId = req.params.degId;
    const { id, name, surname } = req.body;
    try {
        const deg = await Degustator.findById(degId);
        if (!deg) {
            const error = new Error("Nemôžem načítať údaje pre degustátora a vykonať update")
            error.statusCode = 404;
            return next(error);
        }
        const password = generatePassword(surname, id);
        console.log(password)
        const updatedPw = await bcrypt.hash(password, 12);
        deg.id = id;
        deg.name = name;
        deg.surname = surname;
        deg.password = updatedPw;
        const updatedDeg = await deg.save();
        console.log(updatedDeg);
        res.status(200).json({
            message: "Degustátor bol aktualizovaný",
            _id: updatedDeg._id
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.deleteDeg = async (req, res, next) => {
    const degId = req.params.degId;
    try {
        const deg = await Degustator.findById(degId)
        if (!deg) {
            const error = new Error("Nemôžem načítať údaje pre degustátora a vymazať ho")
            error.statusCode = 404;
            return next(error);
        }
        const deletedDeg = await Degustator.findByIdAndDelete(degId);
        if (!deletedDeg) {
            const error = new Error("Nemôžem načítať údaje pre degustátora a vymazať ho")
            error.statusCode = 404;
            return next(error);
        }
        //delete from group only if degustator connect to the group
        if (deg.group) {
            const group = await Groups.findById(deg.group)
            if (!group) {
                const error = new Error("Nemôžem najst degustora v skupine a vymazať ho")
                error.statusCode = 404;
                return next(error);
            }
            group.items.pull(degId)
            await group.save();
        }

        res.status(200).json({message: 'Degustátor bol vymazaný'})
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.importDegs = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Importované dáta sú nesprávne');
        error.statusCode = 422;
        return next(error);
    } 
    const importedData = await Promise.all(req.body.map( async deg => {
        const password = generatePassword(deg.surname, deg.id);
        const hashedPw = await bcrypt.hash(password, 12);
        return {
            ...deg,
            group: null,
            password: hashedPw            
        }
    }))
    try {
        const degs = await Degustator.insertMany(importedData);
        if (!degs) {
            const error = new Error("Nepodarilo sa importovať danné údaje");
            error.statusCode = 500
            return next(error);
        }
        const degustators = await Degustator.find({}, '-password')
        res.status(201).json({
            message: "Import degustátorov úspešný",
            degustators: degustators
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}; 
