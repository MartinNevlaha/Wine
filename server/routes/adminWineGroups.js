const router = require('express').Router();
const { body } = require('express-validator');

const { isAdminAuth } = require('../middleware/isAuth');
const adminWineGroupsController = require('../controllers/adminWineGroups');

router.get('/wine-groups-edit', isAdminAuth, adminWineGroupsController.getEditGroup);

router.put('/wine-groups-edit', isAdminAuth, [
    body().isArray(),
    body('*._id').trim().isMongoId(),
    body('*.group').trim().isMongoId()
], adminWineGroupsController.saveWineGroups);

module.exports = router;