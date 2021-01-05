const router = require("express").Router();
const { body } = require("express-validator");

const adminDegGroups = require("../controllers/adminDegGroups");
const { isAdminAuth } = require("../middleware/isAuth");

router.post(
  "/degustator-groups",
  isAdminAuth,
  [
    body().isArray(),
    body("*.groupName").trim().notEmpty().isString(),
    body("*.index").trim().notEmpty().isNumeric(),
    body("*.items").isArray(),
  ],
  adminDegGroups.createGroups
);

router.delete("/degustator-groups", isAdminAuth, adminDegGroups.deleteGroups);

router.get("/degustator-groups", isAdminAuth, adminDegGroups.getGroups);

router.get(
  "/degustator-groups/export",
  isAdminAuth,
  adminDegGroups.exportsDegGroups
);

module.exports = router;
