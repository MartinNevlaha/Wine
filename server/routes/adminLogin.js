const router = require('express').Router();
const { body } = require('express-validator');

const authControler = require('../controllers/adminLogin');

router.post('/login', [
    body('name').trim().notEmpty().isString().isLength({ min: 3 }),
    body('password').trim().notEmpty().isLength({min: 5})
], authControler.adminLogin);

module.exports = router;