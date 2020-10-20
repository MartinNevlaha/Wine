const router = require('express').Router();
const { body } = require('express-validator');
 
const degustatorControler = require('../controllers/degustator');
const degLogin = require('../controllers/degLogin');

const { isDegustatorAuth } = require('../middleware/isAuth');

const finalSum = require('../middleware/finalSum');
// doplň validáciu
router.post('/results', isDegustatorAuth, finalSum, degustatorControler.postResult); 

router.get('/wine-list/:wineId', isDegustatorAuth, degustatorControler.getWineInfo);

router.get('/results', isDegustatorAuth, degustatorControler.getResults);

router.get('/result/:resultId', isDegustatorAuth, degustatorControler.getResult);

router.get('/wine-list-group', isDegustatorAuth, degustatorControler.getWineInGroup);

router.post('/login', [
    body('name').trim().notEmpty().isString().isLength({ min: 3 }),
    body('password').trim().notEmpty().isLength({ min:4 })
], degLogin.degustatorLogin);

module.exports = router;