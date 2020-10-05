const Result = require('../models/result');
const Wine = require('../models/wine');
const Degustator = require('../models/degustator');
const Group = require('../models/degGroup');

exports.postResult = async(req, res, next) => {
    const {degId} = req.userData;
    const degustator = await Degustator.findById(degId);
    const groupId = degustator.group;
    if (!degustator) {
        const error = new Error('Nemôžem uložiť hodnotenie ku degustátorovi');
        error.statusCode = 404;
        return next(error)
    }
    const {
        wineId, 
        eliminated, 
        comment, 
        wineCategory, 
        totalSum, 
        results} = req.body;
    try {
        const result = new Result({
            degId,
            groupId,
            wineId,
            eliminated,
            comment,
            wineCategory,
            totalSum,
            results
        });
        await result.save();
        const wine = await Wine.findOne({id: wineId})
        if (!wine) {
            const error = new Error('Nemožem uložiť hodnotenie pre toto číslo vína')
            error.statusCode = 404;
            return next(error);
        }
        wine.results.push(result);
        await wine.save();
        degustator.results.push(result);
        await degustator.save();
        const group = await Group.findById(groupId);
        if (!group) {
            const error = new Error('Nemožem uložiť hodnotenie do skupiny')
            error.statusCode = 404;
            return next(error);
        }
        group.results.push(result);
        await group.save();
        res.status(201).json({message: 'Hodnotenie poslané'})
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        return next(error);
    }
};

exports.getWineInfo = async (req, res, next) => {
    const wineId = req.params.wineId;
    try {
        const wine = await Wine.findOne({id: wineId}, 'color character');
        if (!wine) {
            const error = new Error('Nemože načítať dáta pre zadané číslo vína')
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            message: 'Víno načítané',
            wine: wine
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        return next(error);
    }
};

exports.getResults = async (req, res, next) => {
    const {degId} = req.userData;
    try {
        const degustator = await Degustator.findById(degId).populate('results');
        if (!degustator) {
            const error = new Error('Nemožem načitať udaje pre degustátora');
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            message: "Výsledky načítané",
            results: degustator.results,
            degName: degustator.name + " " + degustator.surname
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        return next(error);
    }
};