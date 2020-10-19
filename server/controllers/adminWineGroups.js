const Wine = require('../models/wine');
const Group = require('../models/degGroup');
const wine = require('../models/wine');

exports.getEditGroup = async (req, res, next) => {
    try {
        const wines = await Wine.find({}, '-results -totalResults -wineCategory -finalResult');
        if (!wines) {
            const error = new Error("Nemôžem načítať dáta z DB");
            error.statusCode = 404;
            return next(error);
        }
        const groups = await Group.find({}, '-items -results');
        if (!groups) {
            const error = new Error("Nepodarilo sa načítať skupiny");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            message: 'data načítané',
            wines: wines,
            groups: groups
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.saveWineGroups = async (req, res, next) => {
    const wineGroupsData = req.body;
    try {
        await wineGroupsData.forEach( async (wine) => {
            const saveWine = await Wine.findById(wine._id);
            saveWine.group = wine.group;
            await saveWine.save();
            const saveGroup = await Group.findById(wine.group);
            saveGroup.wines.push(wine._id);
            await saveGroup.save();
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}