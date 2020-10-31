const router = require('express').Router();
const { body } = require('express-validator');

const adminSettingsController = require('../controllers/adminSettings');

const { isAdminAuth } = require('../middleware/isAuth');

router.get('/degustation-settings', isAdminAuth, adminSettingsController.getSettings);

router.put('/degustation-settings', [
    body('isValuesEliminated').isBoolean(),
    body('isDegustationOpen').isBoolean(),
    body('degustationName').trim().notEmpty().isString(),
    body('competitionChairman').trim().notEmpty().isString()
], isAdminAuth, adminSettingsController.setSettings);

module.exports = router;