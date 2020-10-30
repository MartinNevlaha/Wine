const router = require('express').Router();

const { isAdminAuth } = require('../middleware/isAuth');
const createExportByCat = require('../middleware/createExportByCat');
const adminFinalResultsController = require('../controllers/adminFinalResults');

router.get('/final-results-category', isAdminAuth, adminFinalResultsController.getWineCompetitionCategory);

router.get('/final-results-export-by-cat', isAdminAuth, createExportByCat, adminFinalResultsController.exportResults); 

router.get('/final-results-by-category/:categoryId', isAdminAuth, adminFinalResultsController.getFinalResultsByCategory);

router.get('/final-results/wine/:wineId', isAdminAuth, adminFinalResultsController.getFinalResultsByWineId);

router.get('/final-results-groups', isAdminAuth, adminFinalResultsController.getDegGroups);

router.get('/final-results/group/:groupId', isAdminAuth, adminFinalResultsController.getFinalResultsByGroup);

router.get('/final-results-degustators', isAdminAuth, adminFinalResultsController.getListOfDegustators);

router.get('/final-results/degustator/:degId', isAdminAuth, adminFinalResultsController.getFinalResultsByDeg);


module.exports = router;