const Wine = require('../models/wine');
const Result = require('../models/result');
const Group = require('../models/degGroup');
const Degustator = require('../models/degustator');
const CompetitiveCategory = require('../models/competitiveCategory');

exports.getFinalResultsByCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;
    const populateQuery = {
        path: 'group',
        model: 'Group',
        select: '_id groupName'
    }
    try {
        const wines = await Wine.find({competitiveCategoryId: categoryId}).sort({'finalResult': -1}).lean().populate(populateQuery);
        if (!wines) {
            const error = new Error('Nemôžem načítať výsledky pre túto kategóriu');
            error.statusCode = 404;
            return next(error);
        }
        const sortedWines = wines.map((wine, index) => {
            return {...wine, place: index + 1}
        })
        res.status(200).json({
            message: 'Zoznam vín načítaný',
            results: sortedWines
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
        path: 'degId',
        model: 'Degustator',
        select: '_id id name surname',
    }
    try {
        const results = await Result.find({wineDbId: wineId}).populate(populateQuery)
        if (!results) {
            const error = new Error('Nemôžem načítať výsledky pre dané číslo vína');
            error.statusCode = 404;
            return next(error);
        }

        const wineInfo = await Wine.findById(wineId);
        if (!wineInfo) {
            const error = new Error('Nemôžem načítať výsledky pre dané číslo vína');
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            message: "Výsledky načítané",
            results: results,
            wineInfo: wineInfo
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
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getWineCompetitionCategory = async (req, res, next) => {

    try {
        const competitiveCategory = await CompetitiveCategory.find({});
        if (!competitiveCategory) {
            const error = new Error('Nemôžem načítať sútažné skupiny');
            error.statusCode = 404;
            return next(error);
        }
        const results = await Wine.find({competitiveCategoryId: competitiveCategory[0]._id}).sort({"finalResult": -1}).lean().populate('group');
        if (!results) {
            const error = new Error("Nemôžem načítať výsledky");
            error.statusCode = 404;
            return next(error);
        }
        const sortedWines = results.map((wine, index) => {
            return {...wine, place: index + 1}
        })
        res.status(200).json({
            message: 'Dáta načítané',
            competitiveCategory: competitiveCategory,
            results: sortedWines
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

