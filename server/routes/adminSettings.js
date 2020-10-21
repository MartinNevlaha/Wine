const router = require('express').Router();
const { body } = require('express-validator');

const adminSettingsController = require('../controllers/adminSettings');

const { isAdminAuth } = require('../middleware/isAuth');

router.get('/degustation-settings', isAdminAuth, adminSettingsController.getSettings);

router.put('/degustation-settings', [
    body('isValuesEliminated').isBoolean()
], isAdminAuth, adminSettingsController.setSettings);

router.put('/degustation-setting-is-open', [
    body('isOpen').isBoolean()
], isAdminAuth, adminSettingsController.setIsDegustationOpen);


module.exports = router;