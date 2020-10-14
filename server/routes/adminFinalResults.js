const router = require('express').Router();

const { isAdminAuth } = require('../middleware/isAuth');
const adminFinalResultsController = require('../controllers/adminFinalResults');

router.get('/final-results', isAdminAuth, adminFinalResultsController.getFinalResults);

router.get('/final-results/:wineId', isAdminAuth, adminFinalResultsController.getFinalResultsByWineId);

module.exports = router;