const Setting = require('../models/settings');
const winston = require('../config/winston');

const inicializeDefaultSettins = async () => {
    try {
        const setting = await Setting.find();
        if (!setting.length) {
            const defaultSetting = new Setting({
                isValuesEliminated: true,
                isDegustationOpen: false,
                destationName: 'Zmeniť',
                competitionChairman: 'Zmeniť',
            })
            await defaultSetting.save();
        }
    } catch (error) {
        winston.log({
            level: 'error',
            message: 'Nemôžem inicializovať úvodné nastavenia degustácie' + error
        })
    }
};

module.exports = inicializeDefaultSettins;