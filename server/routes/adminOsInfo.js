const router = require('express').Router();


const { isAdminAuth } = require('../middleware/isAuth');

const adminOsInfoControler = require('../controllers/adminOsInfo');

router.get('/system-info', isAdminAuth, adminOsInfoControler.getOsInfo);

router.delete('/reset-db', isAdminAuth, adminOsInfoControler.resetDb);

router.get('/download-logs', isAdminAuth, adminOsInfoControler.downloadLogs);


module.exports = router;

