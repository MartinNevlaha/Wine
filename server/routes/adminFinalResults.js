const router = require("express").Router();

const { isAdminAuth } = require("../middleware/isAuth");
const adminFinalResultsController = require("../controllers/adminFinalResults");

router.get(
  "/final-results-category",
  isAdminAuth,
  adminFinalResultsController.getWineCompetitionCategory
);

router.get(
  "/final-results-export-by-cat",
  isAdminAuth,
  adminFinalResultsController.exportResults
);

router.get(
  "/final-results-generate-cert/:wineId",
  isAdminAuth,
  adminFinalResultsController.generatePdf
);

router.get(
  "/final-results-by-category/:categoryId",
  isAdminAuth,
  adminFinalResultsController.getFinalResultsByCategory
);

router.get(
  "/final-results-by-wineId/:wineId",
  isAdminAuth,
  adminFinalResultsController.getFinalResultsByWineId
);

router.get(
  "/final-results-groups",
  isAdminAuth,
  adminFinalResultsController.getDegGroups
);

router.get(
  "/final-results/group/:groupId",
  isAdminAuth,
  adminFinalResultsController.getFinalResultsByGroup
);

router.get(
  "/final-results-degustators",
  isAdminAuth,
  adminFinalResultsController.getListOfDegustators
);

router.get(
  "/final-results/degustator/:degId",
  isAdminAuth,
  adminFinalResultsController.getFinalResultsByDeg
);

router.post(
  "/final-results-write/:categoryId",
  isAdminAuth,
  adminFinalResultsController.writeFinalResults
);

module.exports = router;
