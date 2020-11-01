const Wine = require('../models/wine');

const isDegCompleteChceck = async (wineId, arrayOfDeg) => {
    let arrayOfChcecks = [];
    const savedResults = await Wine.findOne({id: wineId}).populate('results');    
    const degIdOfResults = savedResults.results.map(res => res.degId);
    arrayOfDeg.forEach(id => {
        arrayOfChcecks.push(degIdOfResults.includes(id))
    })
    savedResults.isComplete = !arrayOfChcecks.includes(false)
    return savedResults;
};

module.exports = isDegCompleteChceck;