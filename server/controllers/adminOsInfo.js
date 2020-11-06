const si = require('systeminformation');
const path = require('path');

const Wine = require('../models/wine');
const Degustator = require('../models/degustator');
const Result = require('../models/result');
const Group = require('../models/degGroup');
const CompetitiveCategory = require('../models/competitiveCategory');
const Setting = require('../models/settings');

const inicializedDefaultSettings = require('../utils/inicializeDefaultSettings');

exports.getOsInfo = async (req, res, next) => {
    try {   
        const cpu = await si.cpu();
        const memory = await si.mem();
        const os = await si.osInfo();
        const systemInfo = {
            opSystem: os.distro + " " + os.codename + " " + os.release + " " + os.platform,
            cpuInfo: cpu.manufacturer + " " + cpu.brand + " " +cpu.speed + "GHz" + " " + cpu.cores + 'cores',
            totalRAM: (+memory.total/1000000).toFixed(0),
            freeRAM: (+memory.free/1000000).toFixed(0)
        }
        const totalNumberOfWine = await Wine.countDocuments({});
        if (!totalNumberOfWine) {
            const error = new Error('Nemožem načitať údaje vín')
            error.statusCode = 404;
            return next(error);
        }
        const totalNumberOfDeg = await Degustator.countDocuments({});
        if (!totalNumberOfWine) {
            const error = new Error('Nemožem načitať údaje degustátorov')
            error.statusCode = 404;
            return next(error);
        }
        const totalNumberOfGroups = await Group.countDocuments({});
        if (!totalNumberOfWine) {
            const error = new Error('Nemožem načitať údaje skupín degustátorov')
            error.statusCode = 404;
            return next(error);
        }
        const totalNumberOfResults = await Result.countDocuments({});
        if (!totalNumberOfWine) {
            const error = new Error('Nemožem načitať údaje výsledkov')
            error.statusCode = 404;
            return next(error);
        }
        const totalNumberOfCompetitiveCat = await CompetitiveCategory.countDocuments({});
        if (!totalNumberOfCompetitiveCat) {
            const error = new Error('Nemožem načítať údajne súťažných categorií');
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            message: "Systémové informácie načítané",
            infoData: systemInfo,
            dbData: {
                numOfWine: totalNumberOfWine,
                numOfDeg: totalNumberOfDeg,
                numOfGroups: totalNumberOfGroups,
                numOfResults: totalNumberOfResults,
                numOfComCat: totalNumberOfCompetitiveCat
            }
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
            }
            return next(error);
    }
};

exports.resetDb = async (req, res, next) => {
    try {
        await Wine.deleteMany({});
        await Degustator.deleteMany({});
        await Group.deleteMany({});
        await Result.deleteMany({});
        await CompetitiveCategory.deleteMany({});
        await Setting.deleteMany({});
        await inicializedDefaultSettings();
        res.status(200).json({
            message: "Databaza kompletne vymazaná"
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
            }
            return next(error);
    }
}

exports.downloadLogs = (req, res, next) => {
    const logsFile = path.join(__dirname, '../', 'logs/post_log.log')
    res.status(200).download(logsFile, (err) => {
        if (err) {
            const error = new Error('Súbor sa nedá stiahnuť')
            error.statusCode = 404;
            return next(error)
        }
    });
}

