const path = require('path');
const Excel = require('exceljs');
const fs = require('fs');

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


exports.getFinalResultsByGroup = async (req, res, next) => {
    const groupId = req.params.groupId;
    const populateQueryDeg = {
        path: 'degId',
        model: 'Degustator',
        select: '_id id name surname',
    }    
    const populateQueryWine = {
        path: 'wineDbId',
        model: 'Wine',
        select: 'id name clasification color character _id vintage producer'
    }
    try {
        const results = await Result.find({groupId: groupId}).populate(populateQueryDeg).populate(populateQueryWine);
        if (!results) {
            const error = new Error("Nemôžem načítať výsledky");
            error.statusCode = 404;
            return next(error);
        }
        res.json({
            message: 'Výsledky boli načítané',
            results: results
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
    const populateQueryDeg = {
        path: 'degId',
        model: 'Degustator',
        select: '_id id name surname',
    }    
    const populateQueryWine = {
        path: 'wineDbId',
        model: 'Wine',
        select: 'id name clasification color character _id vintage producer'
    }
    try {
        const results = await Result.find({degId: degId}).populate(populateQueryDeg).populate(populateQueryWine);
        if (!results) {
            const error = new Error("Nemôžem načítať výsledky");
            error.statusCode = 404;
            return next(error);
        }
        res.json({
            message: 'Výsledky pre tohto degustátora boli načítané',
            results: results
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

exports.getDegGroups = async (req, res, next) => {
    const populateQueryDeg = {
        path: 'degId',
        model: 'Degustator',
        select: '_id id name surname',
    }    
    const populateQueryWine = {
        path: 'wineDbId',
        model: 'Wine',
        select: 'id name clasification color character _id vintage producer'
    }
    try {
        const groups = await Group.find({}, '_id groupName results');
        if (!groups) {
            const error = new Error('Nemôžem načítať skupiny')
            error.statusCode = 404;
            return next(error)
        }
        const results = await Result.find({groupId: groups[0]._id}).populate(populateQueryDeg).populate(populateQueryWine);
        if (!results) {
            const error = new Error("Nemôžem načítať výsledky");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            message: 'Dáta načítané',
            groups: groups,
            results: results
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getListOfDegustators = async (req, res, next) => {
    const populateQueryDeg = {
        path: 'degId',
        model: 'Degustator',
        select: '_id id name surname',
    }    
    const populateQueryWine = {
        path: 'wineDbId',
        model: 'Wine',
        select: 'id name clasification color character _id vintage producer'
    }
    try {
        const degustators = await Degustator.find({}, '_id id name surname group');
        if (!degustators) {
            const error = new Error('Nemôžem načítať degustátorov')
            error.statusCode = 404;
            return next(error)
        }
        const results = await Result.find({degId: degustators[0]._id}).populate(populateQueryDeg).populate(populateQueryWine);
        if (!results) {
            const error = new Error("Nemôžem načítať výsledky");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            message: 'Degustátory načítaný',
            degustators: degustators,
            results: results
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.exportResults = async (req, res, next) => {
    const exportFile = path.join(__dirname, '../', `export/result_by_cat.xlsx`)
    console.log(exportFile)
    res.status(200).download(exportFile, (err) => {
        if (err) {
            const error = new Error('Súbor sa nedá stiahnuť')
            error.statusCode = 404;
            return next(error)
        }
    })
};
