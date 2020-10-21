const Setting = require('../models/settings');

const isDegustationLock = async (req, res, next) => {
    try {
        const setting = await Setting.find();
        if (!setting[0].isDegustationOpen) {
            const error = new Error("Degustácia je zatvorená, kontaktuj administrátora")
            error.statusCode = 403;
            return next(error);
        }
        next();
    } catch (err) {
        const error = new Error("Chyba otvorenia degustácie kontaktuj administrátora");
        error.statusCode = 401;
        return next(error);
    }
}

module.exports = isDegustationLock;