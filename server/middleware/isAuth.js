const jwt = require('jsonwebtoken');

const ADMIN_JWT_SECRET = 'Super%Secret%Admin/85615';
const DEGUSTATOR_JWT_SECRET = 'Super%Secret%Degustator/sd54135';

const isAdminAuth = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            const error = new Error("Autentifikácia zlyhala");
            error.statusCode = 401;
            return next(error);
        }
        const decodedToken = jwt.verify(token, ADMIN_JWT_SECRET);
        if (decodedToken.role !== 'admin') {
            const error = new Error("Neoprávený prístup, vyžaduje sa prístup ADMINA");
            error.statusCode = 401;
            return next(error);
        }
        req.userData = {
            adminId: decodedToken.adminId,
            role: decodedToken.role
        }
        next();
    } catch (err) {
        const error = new Error("Autentifikácia zlyhala");
        error.statusCode = 401;
        return next(error);
    }
};
const isDegustatorAuth = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            const error = new Error('Autentifikácia zlyhala');
            error.statusCode = 401;
            return next(error);
        }
        const decodedToken = jwt.verify(token, DEGUSTATOR_JWT_SECRET);
        console.log(decodedToken)
        if (decodedToken.role != 'degustator') {
            const error = new Error("Neoprávený prístup, vyžaduje sa prístup Degustátora");
            error.statusCode = 401;
            return next(error);
        }
        req.userData = {
            degId: decodedToken.degId,
            role: decodedToken.role,
        }
        next();
    } catch (err) {
        const error = new Error("Autentifikácia zlyhala");
        error.statusCode = 401;
        return next(error);
    }
};

module.exports = {
    isAdminAuth,
    isDegustatorAuth
};