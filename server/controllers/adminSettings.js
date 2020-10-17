const Setting = require('../models/settings');

exports.setSettings = async (req, res, next) => {
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