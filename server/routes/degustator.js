const router = require('express').Router();
const { body } = require('express-validator');
 
const degustatorControler = require('../controllers/degustator');
const degLogin = require('../controllers/degLogin');

const { isDegustatorAuth } = require('../middleware/isAuth');

const finalSum = require('../middleware/finalSum');

router.post('/results', isDegustatorAuth, finalSum, degustatorControler.postResult);

router.get('/wine-list/:wineId', isDegustatorAuth, degustatorControler.getWineInfo);

router.post('/login', [
    body('name').trim().notEmpty().isString().isLength({ min: 3 }),
    body('password').trim().notEmpty().isLength({ min:4 })
], degLogin.degustatorLogin);

module.exports = router;