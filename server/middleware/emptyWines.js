const Group = require('../models/degGroup');

module.exports = async (req, res, next) => {
    try {
        const groups = await Group.find();
        if (!groups) {
            const error = new Error('Nemôžem uložiť priradenie vín do skupín');
            error.statusCode = 404;
            return next(error);
        }
        await groups.forEach(async group => {
            const groupToEmpty = await Group.findById(group._id);
            groupToEmpty.wines = [];
            await groupToEmpty.save();
        })
        return next();
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        return next(error);
    }
}