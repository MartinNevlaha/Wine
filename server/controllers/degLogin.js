const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');

const Degustator = require('../models/degustator');

const DEGUSTATOR_JWT_SECRET = 'Super%Secret%Degustator/sd54135';

exports.degustatorLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Zadané údaje sú nesprávne, skontrolujte dĺžku mena a hesla");
        error.statusCode = 422;
        return next(error);
    }
    const {surname, password} = req.body;
    try {
        const degustator = await Degustator.findOne({surname: surname}) 
        if (!degustator) {
            const error = new Error('Nesprávne prihlasovacie meno');
            error.statusCode = 422;
            return next(error);
        }
        const isPasswordValid = await bcrypt.compare(password, degustator.password);
        if (!isPasswordValid) {
            const error = new Error('Nesprávne heslo');
            error.statusCode = 401;
            return next(error);
        }
        const token = jwt.sign({
            degId: degustator._id,
            role: degustator.role
        }, DEGUSTATOR_JWT_SECRET, {expiresIn: '12h'})
        res.status(200).json({
            message: "Degustator prihlásený",
            token: token
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
            }
            next(error);       
    }
}