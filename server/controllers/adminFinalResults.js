const Wine = require('../models/wine');

exports.getFinalResults = async (req, res, next) => {
    
    try {
        const sendConfig = 'id name color character producer vintage wineCategory finalResult'
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