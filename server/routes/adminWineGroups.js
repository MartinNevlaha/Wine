const router = require("express").Router();
const { body } = require("express-validator");

const { isAdminAuth } = require("../middleware/isAuth");
const adminWineGroupsController = require("../controllers/adminWineGroups");
const emptyWines = require("../middleware/emptyWines");

router.get(
  "/wine-groups-edit",
  isAdminAuth,
  adminWineGroupsController.getEditGroup
);

router.put(
  "/wine-groups-edit",
  isAdminAuth,
  emptyWines,
  [
    body().isArray(),
    body("*._id").trim().isMongoId(),
    body("*.group").trim().isMongoId(),
  ],
  adminWineGroupsController.saveWineGroups
);

router.get(
  "/wine-groups/export",
  isAdminAuth,
  adminWineGroupsController.exportWineGroups
);

module.exports = router;
