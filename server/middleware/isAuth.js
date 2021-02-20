const jwt = require("jsonwebtoken");

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;
const DEGUSTATOR_JWT_SECRET = process.env.DEGUSTATOR_JWT_SECRET;

const isAdminAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      const error = new Error("Autentifikácia zlyhala");
      error.statusCode = 401;
      return next(error);
    }
    const decodedToken = jwt.verify(token, ADMIN_JWT_SECRET, (err, admin) => {
      if (err) {
        const error = new Error("Token nie je valídny");
        error.statusCode = 401;
        return next(error);
      }
      return admin;
    });
    if (decodedToken.role !== "admin") {
      const error = new Error("Neoprávený prístup, vyžaduje sa prístup ADMINA");
      error.statusCode = 401;
      return next(error);
    }
    req.userData = {
      adminId: decodedToken.adminId,
      role: decodedToken.role,
    };
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
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      const error = new Error("Autentifikácia zlyhala");
      error.statusCode = 401;
      return next(error);
    }
    const decodedToken = jwt.verify(
      token,
      DEGUSTATOR_JWT_SECRET,
      (err, degustator) => {
        if (err) {
          const error = new Error("Token nie je valídny");
          error.statusCode = 401;
          return next(error);
        }
        return degustator;
      }
    );
    if (decodedToken.role != "degustator") {
      const error = new Error(
        "Neoprávený prístup, vyžaduje sa prístup Degustátora"
      );
      error.statusCode = 401;
      return next(error);
    }
    req.userData = {
      degId: decodedToken.degId,
      role: decodedToken.role,
      groupId: decodedToken.groupId,
      group: decodedToken.group,
    };
    next();
  } catch (err) {
    const error = new Error("Autentifikácia zlyhala");
    error.statusCode = 401;
    return next(error);
  }
};

module.exports = {
  isAdminAuth,
  isDegustatorAuth,
};
