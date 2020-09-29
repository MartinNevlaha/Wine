const router = require('express').Router();
const { body } = require('express-validator');

const adminDegGroups = require('../controllers/adminDegGroups');

router.post('/degustator-groups', [
    body().isArray(),
    body('*.groupName').trim().notEmpty().isString(),
    body('*.index').trim().notEmpty().isNumeric(),
    body('*.items').isArray()
], adminDegGroups.createGroups);

router.delete('/degustator-groups', adminDegGroups.deleteGroups);

router.get('/degustator-groups', adminDegGroups.getGroups);

module.exports = router;