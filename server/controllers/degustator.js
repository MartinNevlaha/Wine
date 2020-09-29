const Result = require('../models/result');
const Wine = require('../models/wine');

exports.postResult = async(req, res, next) => {
    const {
        wineId, 
        eliminated, 
        comment, 
        wineCategory, 
        totalSum, 
        results} = req.body;
    try {
        const result = new Result({
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
            next(error);
        }
        wine.results.push(result);
        await wine.save();
        res.status(201).json({message: 'Hodnotenie poslané'})
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
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
        next(error);
    }
};