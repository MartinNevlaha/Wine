const si = require('systeminformation');

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
        res.status(200).json({
            message: "Systémové informácie načítané",
            infoData: systemInfo
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
            }
            return next(error);
    }
};