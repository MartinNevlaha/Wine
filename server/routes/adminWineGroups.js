const router = require('express').Router();

const { isAdminAuth } = require('../middleware/isAuth');

const adminWineGroupsController = require('../controllers/adminWineGroups');

router.get('/wine-groups-edit', isAdminAuth, adminWineGroupsController.getEditGroup);

module.exports = router;