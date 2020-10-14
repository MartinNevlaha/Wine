const timestamp = require('time-stamp');
const io = require('../socket');
const path = require('path');
const fs = require('fs');

const Result = require('../models/result');
const Wine = require('../models/wine');
const Degustator = require('../models/degustator');
const Group = require('../models/degGroup');

const logFile = path.join(__dirname, '../', 'logs/post_log.log')
const logger = fs.createWriteStream(logFile, {
    flags: "a"
});

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
        const wine = await Wine.findOne({id: wineId})
        if (!wine) {
            const error = new Error('Nemožem uložiť hodnotenie pre toto číslo vína')
            error.statusCode = 404;
            return next(error);
        }
        const result = new Result({
            wineDbId: wine._id,
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
        const log = {
                time: timestamp('YYYY/MM/DD/HH:mm:ss'),
                group: group.groupName,
                degId: degustator.id,
                wine: wineId,
                eliminated: eliminated ? "Áno" : 'Nie',
                wineCategory: wineCategory || 'eliminované',
                totalSum: totalSum || 'eliminované'
        }
        io.getIO().emit('post-log', { action: 'create', 
            log: log
        })
        logger.write(`${log.time} skupina: ${log.group} degustátor: ${log.degId} víno: ${log.wine} eliminované: ${log.eliminated} kategoria vína: ${log.wineCategory} hodnotenie: ${log.totalSum} \n`);
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
    const degId = req.userData.degId;
    try {
        const isAllreadyDegust = await Result.findOne({degId: degId, wineId: wineId});
        const wine = await Wine.findOne({id: wineId}, 'color character');
        if (!wine) {
            const error = new Error('Zadané číslo vína neexistuje, zadajte iné')
            error.statusCode = 404;
            return next(error);
        }
        if (isAllreadyDegust) {
            const error = new Error('Víno ste už hodnitili, zadajte prosím iné číslo vína');
            error.statusCode = 409;
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
    const populateQuery = {
        path: 'results',
        model: "Result",
        populate: {
            path: 'wineDbId',
            model: 'Wine'
        }
    }
    try {
        const degustator = await Degustator.findById(degId).populate(populateQuery);
        if (!degustator) {
            const error = new Error('Nemožem načitať udaje pre degustátora');
            error.statusCode = 404;
            return next(error);
        }
        const updateResults = degustator.results.map(result => {
            return {
                _id: result._id,
                wineInfo: {
                    wineId: result.wineId,
                    color: result.wineDbId.color,
                    character: result.wineDbId.character
                },
                eliminated: result.eliminated ? 'Eliminované' : '-',
                wineCategory: result.wineCategory,
                totalSum: result.totalSum
            }
        })    
        
        res.status(200).json({
            message: "Výsledky načítané",
            results: updateResults,
            degName: degustator.name + " " + degustator.surname,
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        return next(error);
    }
};

exports.getResult = async (req, res, next) => {
    const resultId = req.params.resultId;
    const {degId} = req.userData;
    try {
        const result = await Result.findOne({degId: degId, _id: resultId});
        if (!result) {
            const error = new Error('Nemožem načitať udaje pre danné víno');
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            message: "Podrobné výsledky načítané",
            results: result.results,
            eliminated: result.eliminated,
            totalSum: result.totalSum,
            wineCategory: result.wineCategory
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        return next(error);
    }
};