const si = require('systeminformation');
const fs = require('fs');
path = require('path');

const Wine = require('../models/wine');
const Degustator = require('../models/degustator');
const Result = require('../models/result');
const Group = require('../models/degGroup');

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
        }
        const totalNumberOfDeg = await Degustator.countDocuments({});
        if (!totalNumberOfWine) {
            const error = new Error('Nemožem načitať údaje degustátorov')
            error.statusCode = 404;
        }
        const totalNumberOfGroups = await Group.countDocuments({});
        if (!totalNumberOfWine) {
            const error = new Error('Nemožem načitať údaje skupín degustátorov')
            error.statusCode = 404;
        }
        const totalNumberOfResults = await Result.countDocuments({});
        if (!totalNumberOfWine) {
            const error = new Error('Nemožem načitať údaje výsledkov')
            error.statusCode = 404;
        }
        res.status(200).json({
            message: "Systémové informácie načítané",
            infoData: systemInfo,
            dbData: {
                numOfWine: totalNumberOfWine,
                numOfDeg: totalNumberOfDeg,
                numOfGroups: totalNumberOfGroups,
                numOfResults: totalNumberOfResults
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
    const logsFile = path.join(__dirname, '../', 'logs/postResults.log')
    res.status(200).download(logsFile, function (err){
        if (err) {
            const error = new Error('Súbor sa nedá stiahnuť')
            error.statusCode = 404;
            return next(error)
        }
    });
}

