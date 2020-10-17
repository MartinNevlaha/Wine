const Setting = require('../models/settings');

const inicializeDefaultSettins = async () => {
    try {
        const setting = await Setting.find();
        if (!setting.length) {
            const defaultSetting = new Setting({
                isValuesEliminated: true
            })
            await defaultSetting.save();
        }
    } catch (error) {
        console.log('Nemôžem inicializovať úvodné nastavenia degustácie', error)
    }
};

module.exports = inicializeDefaultSettins;