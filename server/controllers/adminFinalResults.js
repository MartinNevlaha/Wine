const Wine = require('../models/wine');
const Degustator = require('../models/degustator');

const sendConfig = 'id name color character producer vintage wineCategory finalResult'

exports.getFinalResults = async (req, res, next) => {
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