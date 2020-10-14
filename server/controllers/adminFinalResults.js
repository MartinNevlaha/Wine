const Wine = require('../models/wine');
const Result = require('../models/result');
const Group = require('../models/degGroup');
const Degustator = require('../models/degustator');

exports.getFinalResults = async (req, res, next) => {
    const sendConfig = 'id name color character producer vintage wineCategory finalResult'
    try {
        const wines = await Wine.find({}, sendConfig).sort('finalResult');
        if (!wines) {
            const error = new Error('Nemože načítať výsledky');
            error.statusCode = 404;
            return next(error);
        }
        res.json({
            message: 'Výsledky načítané',
            results: wines 
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getFinalResultsByWineId = async (req, res, next) => {
    const wineId = req.params.wineId
    const populateQuery = {
        path: 'results',
        model: 'Result',
        select: 'degId wineId eliminated comment wineCategory totalSum',
        populate: {
            path: 'degId',
            model: 'Degustator',
            select: 'name surname',
            populate: {
                path: 'group',
                model: 'Group',
                select: 'groupName'
            }
        }
    }
    try {
        const results = await Wine.findById(wineId).populate(populateQuery);
        if (!results) {
            const error = new Error('Nemôžem načítať dáta pre zvolené víno');
            error.statusCode = 404;
            return next(error);
        }
        res.json({
            message: "Výsledky načítané",
            results: results.results
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getDetailedResults = async (req, res, next) => {
    const resultId = req.params.resultId;
    try {
        const result = await Result.findById(resultId, 'results wineId eliminated comment wineCategory totalSum');
        if (!result) {
            const error = new Error('Nemôžem načítať detailné výsledky pre toto víno')
            error.statusCode = 404;
            return next(error);
        }
        res.json({
            message: 'Detailné výsledky načítané',
            result: result
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getFinalResultsByGroup = async (req, res, next) => {
    const groupId = req.params.groupId;
    try {
        const group = await Group.findById(groupId).populate('results');
        if (!group) {
            const error = new Error('Výsledky podľa skupín sa nepodarilo načítané');
            error.statusCode = 404;
            return next(error);
        }
        res.json({
            message: 'Výsledky boli načítané',
            results: group.results
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getFinalResultsByDeg = async (req, res, next) => {
    const degId = req.params.degId;
    try {
        const deg = await Degustator.findById(degId).populate('results');
        if (!deg) {
            const error = new Error('Nemožem načítat výsledky pre tohto degustátora');
            error.statusCode = 404;
            return next(error);
        }
        res.json({
            message: 'Výsledky pre tohto degustátora boli načítané',
            results: deg.results
        })
    } catch (error) {
        
    }
}

