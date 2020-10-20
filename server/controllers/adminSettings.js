const { validationResult } = require('express-validator');
const Setting = require('../models/settings');

exports.setSettings = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Niektoré z poskytnutých dát sú nesprávne')
        error.statusCode = 422;
        return next(error);
    }
    const isEliminated = req.body.isValuesEliminated
    try {
        const setting = await Setting.find(); 
        if (!setting) {
            const error = new Error('Nemôžem zmeniť nastavenia degustácie');
            error.statusCode = 404;
            return next(error);
        }
        setting[0].isValuesEliminated = isEliminated
        const updatedSetting = await setting[0].save();
        res.status(200).json({
            message: 'nastavenia boli uspešne zmenené',
            setting: updatedSetting
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.setIsDegustationOpen = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Niektoré z poskytnutých dát sú nesprávne')
        error.statusCode = 422;
        return next(error);
    }
    const isOpen = req.body.isOpen
    try {
        const setting = await Setting.find();
        if (!setting) {
            const error = new Error('Nemôžem zmeniť nastavenia degustácie');
            error.statusCode = 404;
            return next(error);
        }
        setting[0].isDegustationOpen = isOpen;
        const updatedSetting = await setting[0].save();
        res.status(200).json({
            message: 'nastavenia boli uspešne zmenené',
            setting: updatedSetting
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}