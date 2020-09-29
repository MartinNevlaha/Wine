const Groups = require('../models/degGroup');
const Degustator = require('../models/degustator');
const { validationResult } = require('express-validator');


exports.createGroups = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Niektoré z poskytnutých dát sú nesprávne')
        error.statusCode = 422;
        return next(error);
    }
    const postData = req.body;
    try {
        const emptyGroups = await Groups.deleteMany();
        if (!emptyGroups) {
            const error = new Error("Nepodarilo sa uložiť skupiny")
            error.statusCode = 500;
            return next(error);
        }
        const groups = await Groups.insertMany(postData);
        if (!groups) {
            const error = new Error("Nepodarilo sa uložiť skupiny")
            error.statusCode = 500;
            return next(error);
        }
        const groupsWithDeg = await Groups.find().populate('items');
        if (!groupsWithDeg) {
            const error = new Error("Nepodarilo sa uložiť skupiny")
            error.statusCode = 500;
            return next(error);
        }
        //for loop to write group to deg
        groupsWithDeg.forEach( async (group) => {
            await group.items.forEach(async (deg) => {
                const degustator = await Degustator.findById(deg._id);
                degustator.group = group._id;
                await degustator.save();
            })
        });

        res.status(201).json({
            message: 'Skupiny boli vytvorené správne',
            groups: groupsWithDeg
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.deleteGroups = async (req, res , next) => {
    try {
        await Groups.deleteMany({});
        res.status(200).json({message: "Skupiny boli vymazané"})
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getGroups = async (req, res, next) => {
    try {
        const groups = await Groups.find().populate('items');
        if (!groups) {
            const error = new Error("Nepodarilo sa načítať skupiny");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            message: 'Načítanie dát úspešné',
            groups: groups
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
