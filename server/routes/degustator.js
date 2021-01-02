const router = require("express").Router();
const { body } = require("express-validator");

const degustatorControler = require("../controllers/degustator");
const degLogin = require("../controllers/degLogin");

const { isDegustatorAuth } = require("../middleware/isAuth");
const isDegustationLock = require("../middleware/isDegustationLock");
const finalSum = require("../middleware/finalSum");

// doplň validáciu
router.post(
  "/results",
  isDegustationLock,
  isDegustatorAuth,
  finalSum,
  degustatorControler.postResult
);

router.get(
  "/wine-list/:wineId",
  isDegustationLock,
  isDegustatorAuth,
  degustatorControler.getWineInfo
);

router.get(
  "/results",
  isDegustationLock,
  isDegustatorAuth,
  degustatorControler.getResults
);

router.get(
  "/result/:resultId",
  isDegustationLock,
  isDegustatorAuth,
  degustatorControler.getResult
);

router.get(
  "/wine-list-group",
  isDegustationLock,
  isDegustatorAuth,
  degustatorControler.getWineInGroup
);

router.post(
  "/login",
  isDegustationLock,
  [
    body("name").trim().notEmpty().isString().isLength({ min: 3 }),
    body("password").trim().notEmpty().isLength({ min: 4 }),
  ],
  degLogin.degustatorLogin
);

router.post("/login-qr", isDegustationLock, [
  body("name").trim().notEmpty().isString().isLength({ min: 3 }),
  body("hassPwd").trim().notEmpty().isString(),
], degLogin.degustatorLoginQr);

module.exports = router;
