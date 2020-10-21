const express = require('express');
const { body } = require('express-validator');

const { isAdminAuth } = require('../middleware/isAuth');
const isDegustationLock = require('../middleware/isDegustationLock');
const adminWineController = require('../controllers/adminWine');

const router = express.Router();

router.get('/wine-list', isAdminAuth, adminWineController.getAllWine)

router.post('/wine-list', isAdminAuth, [
    body('id').trim().not().isEmpty().isNumeric().isLength({ max:3 }),
    body('competitiveCategory').trim().notEmpty().isString(),
    body('name').trim().not().isEmpty().isString(),
    body('producer').trim().not().isEmpty().isString(),
    body('vintage').trim().not().isEmpty().isNumeric().isLength({min:4, max:4}),
    body('clasification').trim().notEmpty().isString(),
    body('color').trim().not().isEmpty().isString(),
    body('character').trim().not().isEmpty().isString()
], adminWineController.createWine);

router.put('/wine-list/:wineId', isAdminAuth, [
    body('id').trim().not().isEmpty().isNumeric().isLength({ max:3 }),
    body('competitiveCategory').trim().notEmpty().isString(),
    body('name').trim().not().isEmpty().isString(),
    body('producer').trim().not().isEmpty().isString(),
    body('vintage').trim().not().isEmpty().isNumeric().isLength({min:4, max:4}),
    body('clasification').trim().notEmpty().isString(),
    body('color').trim().not().isEmpty().isString(),
    body('character').trim().not().isEmpty().isString()
], adminWineController.editWine);

router.delete('/wine-list/:wineId', isAdminAuth, adminWineController.deleteWine);

router.delete('/wine-list', isAdminAuth,  adminWineController.deleteAllWines);

router.post('/wine-list/import', isAdminAuth, [
    body().isArray(),
    body('*.id').trim().not().isEmpty().isNumeric().isLength({ max:3 }),
    body('*.competitiveCategory').trim().notEmpty().isString(),
    body('*.name').trim().trim().not().isEmpty().isString(),
    body('*.producer').trim().trim().not().isEmpty().isString(),
    body('*.vintage').trim().not().isEmpty().isNumeric().isLength({min:4, max:4}),
    body('*.clasification').trim().notEmpty().isString(),
    body('*.color').trim().not().isEmpty().isString(),
    body('*.character').trim().not().isEmpty().isString()
], adminWineController.importWines);

module.exports = router;