const router = require('express').Router();

const degustatorControler = require('../controllers/degustator');

const finalSum = require('../middleware/finalSum');

router.post('/results', finalSum, degustatorControler.postResult);

router.get('/wine-list/:wineId', degustatorControler.getWineInfo);

router.post('/login')

module.exports = router;