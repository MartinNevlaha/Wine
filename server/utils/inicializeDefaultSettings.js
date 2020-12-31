const Setting = require("../models/settings");
const winston = require("../config/winston");
const timestamp = require("time-stamp");

const inicializeDefaultSettins = async () => {
  try {
    const setting = await Setting.find();
    if (!setting.length) {
      const defaultSetting = new Setting({
        isValuesEliminated: true,
        isDegustationOpen: false,
        destationName: "Zmeniť",
        competitionChairman: "Zmeniť",
      });
      await defaultSetting.save();
      winston.log({
        time: timestamp("YYYY/MM/DD/HH:mm:ss"),
        level: "info",
        message: "Defaultné nastavenia boli zapísané do DB",
      });
    }
  } catch (error) {
    winston.log({
      time: timestamp("YYYY/MM/DD/HH:mm:ss"),
      level: "error",
      message: "Nemôžem inicializovať úvodné nastavenia degustácie" + error,
    });
  }
};

module.exports = inicializeDefaultSettins;
