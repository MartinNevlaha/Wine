const router = require('express').Router();

const { isAdminAuth } = require('../middleware/isAuth');
const adminFinalResultsController = require('../controllers/adminFinalResults');

router.get('/final-results', isAdminAuth, adminFinalResultsController.getFinalResults);

router.get('/final-results/wine/:wineId', isAdminAuth, adminFinalResultsController.getFinalResultsByWineId);

router.get('/final-results/result/:resultId', isAdminAuth, adminFinalResultsController.getDetailedResults);

router.get('/final-results/group/:groupId', isAdminAuth, adminFinalResultsController.getFinalResultsByGroup);

router.get('/final-results/degustator/:degId', isAdminAuth, adminFinalResultsController.getFinalResultsByDeg);

module.exports = router;