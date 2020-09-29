const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');

const ADMIN_JWT_SECRET = 'Super%Secret%Admin/85615';

exports.adminLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Zadané údaje sú nesprávne, skontrolujte dĺžku mena a hesla");
        error.statusCode = 422;
        return next(error);
    }
    const {name, password} = req.body;
    try {
        const loadedAdmin = await Admin.findOne({name: name});
        if (!loadedAdmin) {
            const error = new Error("Nesprávne meno")
            error.statusCode = 401;
            return next(error);
        }
        const isPasswordValid = await bcrypt.compare(password, loadedAdmin.password);
        if (!isPasswordValid) {
            const error = new Error("Nesprávne heslo")
            error.statusCode = 401;
            return next(error);
        }
        const token = jwt.sign({
            adminId: loadedAdmin._id,
            role: loadedAdmin.role
        }, ADMIN_JWT_SECRET, {expiresIn: "24h"})
        res.status(200).json({
            message: "Admin prihlásený",
            token: token
        })
    } catch (error) {
        if(!error.statusCode) {
        error.statusCode = 500;
        }
        next(error);
    }
    
}; 