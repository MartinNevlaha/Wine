const Wine = require('../models/wine');
const { validationResult } = require('express-validator');

exports.getAllWine = async (req, res, next) => {
    try {
        const wines = await Wine.find();
        if (!wines) {
            const error = new Error("Nemôžem načítať dáta z DB");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            message: 'Načítanie dát úspešné',
            wines: wines
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.createWine = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Zadané dáta sú nesprávne");
        error.statusCode = 422;
        return next(error) ;
    }
    const {id, name, producer, vintage, color, character} = req.body;
    try {
        const wine = new Wine ({
            id,
            name,
            producer,
            vintage,
            color,
            character
        });
        const response = await wine.save();
        res.status(201).json({
            message: 'Víno úspešne pridané',
            _id: response._id
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.editWine = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Zadané dáta sú nesprávne");
        error.statusCode = 422;
        return next(error) ;
    }
    const wineId = req.params.wineId;
    const {id, name, color, character, producer, vintage} = req.body;
    try {
        const wine = await Wine.findById(wineId);
        if (!wine) {
            const error = new Error("Nemôžem načítať údaje pre toto víno a vykonať update");
            error.statusCode = 404;
            return next(error);
        }
        wine.id = id;
        wine.name = name;
        wine.color = color;
        wine.character = character;
        wine.producer = producer;
        wine.vintage = vintage;
        const updatedWine = await wine.save();
        res.status(200).json({
            message: 'Víno bolo aktualizované',
            wine: updatedWine
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.deleteWine = async (req, res ,next) => {
    const wineId = req.params.wineId;
    try {
        const wine = Wine.findById(wineId)
        if (!wine) {
            const error = new Error("Nemôžem načítať údaje pre toto víno a vymazať ho");
            error.statusCode = 404;
            return next(error);
        }
        await Wine.findByIdAndDelete(wineId);
        res.status(200).json({message: "Vino bolo vymazané"})
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.deleteAllWines = async (req, res, next) => {
    try {
        await Wine.deleteMany({});
        res.status(200).json({message: "Databáza vín bola zmazaná"})
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.importWines = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Importné dáta sú nesprávne");
        error.statusCode = 422;
        return next(error) ;
    }
    const importedData = req.body;
    try {
        const deleted = await Wine.deleteMany({});
        if (!deleted) {
            const error = new Error('Nepodarilo sa vymazať databazu vín pred importom')
            error.statusCode = 500;
            return next(error);
        }
        const wines = await Wine.insertMany(importedData);
        if (!wines) {
            const error = new Error("Nepodarilo sa importovat danné údaje");
            error.statusCode = 500;
            return next(error);
        }
        res.status(201).json({
            message: "Import vín uspešný",
            wines: wines
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};