const { validationResult } = require('express-validator');

const Wine = require('../models/wine');
const Group = require('../models/degGroup');

exports.getEditGroup = async (req, res, next) => {
    const populateQuery = {
        path: 'group',
        model: "Group",
        select: 'groupName _id'
    }
    try {
        const wines = await Wine.find({}, 
            '-results -totalResults -wineCategory -finalResult').populate(populateQuery);
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Niektoré z poskytnutých dát sú nesprávne')
        error.statusCode = 422;
        return next(error);
    }
    const wineGroupsData = req.body;

    try {
        await wineGroupsData.forEach( async (wine) => {
            const saveWine = await Wine.findById(wine._id);
            if (!saveWine) {
                const error = new Error(`Nemôžem uložiť dáta pre id vína ${wine.id}`);
                error.statusCode = 404;
                return next(error)
            }
            saveWine.group = wine.group;
            await saveWine.save();
            const saveGroup = await Group.findById(wine.group);
            if (!saveGroup) {
                const error = new Error(`Nemôžem uložiť dáta pre degustačnú skupinu ${wine.group}`);
                error.statusCode = 404;
                return next(error)
            }
            saveGroup.wines.push(wine._id);
            await saveGroup.save();
        })

        res.status(200).json({
            message: 'dáta uložené'
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}