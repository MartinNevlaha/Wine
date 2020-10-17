const router = require('express').Router();

const adminSettingsController = require('../controllers/adminSettings');

const { isAdminAuth } = require('../middleware/isAuth');

router.put('/degustation-settings', isAdminAuth, adminSettingsController.setSettings);

module.exports = router;