const Wine = require('../models/wine');
const Group = require('../models/degGroup');

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