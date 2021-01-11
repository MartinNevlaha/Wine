const { validationResult } = require("express-validator");

const Setting = require("../models/settings");

exports.setSettings = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Niektoré z poskytnutých dát sú nesprávne");
    error.statusCode = 422;
    return next(error);
  }
  const {
    isValuesEliminated,
    isDegustationOpen,
    degustationName,
    competitionChairman,
  } = req.body;
  try {
    const setting = await Setting.find();
    if (!setting) {
      const error = new Error("Nemôžem zmeniť nastavenia degustácie");
      error.statusCode = 404;
      return next(error);
    }
    setting[0].isValuesEliminated = isValuesEliminated;
    setting[0].isDegustationOpen = isDegustationOpen;
    setting[0].degustationName = degustationName;
    setting[0].competitionChairman = competitionChairman;
    const updatedSetting = await setting[0].save();
    res.status(200).json({
      message: "nastavenia boli uspešne zmenené",
      setting: updatedSetting,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getSettings = async (req, res, next) => {
  const host = process.env.HOST;
  const ssl = process.env.SSL;
  let hostName = `http://${host}`;
  if (ssl) {
    hostName = `https://${host}`;
  }
  try {
    const settings = await Setting.find();
    if (!settings) {
      const error = new Error("Nemôžem načítať nastavenia");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      message: "Nastavenia načítané",
      settings: settings[0],
      host: hostName,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
