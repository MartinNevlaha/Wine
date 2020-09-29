const Wine = require('../models/wine');

module.exports = async (req, res, next) => {
    if (!req.body.eliminated) {
        let wineCategory;
        const wineRating = ['Vynikajúce', 'Veľmi dobré', 'Dobré', 'Priemerné', 'Podpriemerné'];
        const actualSum = req.body.totalSum;
        try {
            const wine = await Wine.findOne({id: req.body.wineId}).populate('results');
            if (!wine) {
                const error = new Error('Zadané číslo vína neexistuje');
                error.statusCode = 404;
                return next(error)
            }
            wine.totalResults.push(actualSum)
            const lengOfArray = wine.totalResults.length;
            const sumOfarray = wine.totalResults.reduce((prevValue, nextValue) => prevValue + nextValue, 0); 
            const averageResults = (sumOfarray / lengOfArray).toFixed(2);
            wine.finalResult = averageResults;
            if (averageResults >= 90) {
                wineCategory = wineRating[0];
            } else if (averageResults >= 85) {
                wineCategory = wineRating[1];
            } else if (averageResults >= 80) {
                wineCategory = wineRating[2];
            } else if (averageResults >= 60) {
                wineCategory = wineRating[3];
            } else if (averageResults < 60) {
                wineCategory = wineRating[4];
            }
            wine.wineCategory = wineCategory;
            await wine.save();
        } catch (error) {
            if(!error.statusCode) {
                error.statusCode = 500;
            }
            return next(error);
        }
       
    }
    return next();
}