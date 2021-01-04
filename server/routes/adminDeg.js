const router = require("express").Router();
const { body } = require("express-validator");

const { isAdminAuth } = require("../middleware/isAuth");
const adminDegConroller = require("../controllers/adminDeg");

router.get("/degustator-list", isAdminAuth, adminDegConroller.getAllDeg);

router.post(
  "/degustator-list",
  isAdminAuth,
  [
    body("id").trim().not().isEmpty().isNumeric().isLength({ max: 3 }),
    body("name").trim().not().isEmpty().isString(),
    body("surname").trim().not().isEmpty().isString(),
  ],
  adminDegConroller.createDeg
);

router.delete(
  "/degustator-list",
  isAdminAuth,
  adminDegConroller.deleteAllDegustators
);

router.put(
  "/degustator-list/:degId",
  isAdminAuth,
  [
    body("id").trim().not().isEmpty().isNumeric().isLength({ max: 3 }),
    body("name").trim().not().isEmpty().isString(),
    body("surname").trim().not().isEmpty().isString(),
  ],
  adminDegConroller.editDegustator
);

router.delete(
  "/degustator-list/:degId",
  isAdminAuth,
  adminDegConroller.deleteDeg
);

router.post(
  "/degustator-list/import",
  isAdminAuth,
  [
    body().isArray(),
    body("*.id").trim().not().isEmpty().isNumeric().isLength({ max: 3 }),
    body("*.name").trim().not().isEmpty().isString(),
    body("*.surname").trim().not().isEmpty().isString(),
  ],
  adminDegConroller.importDegs
);

router.get(
  "/degustator-export-card",
  isAdminAuth,
  adminDegConroller.exportCardWithQr
);

module.exports = router;
