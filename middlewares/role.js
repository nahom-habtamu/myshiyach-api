const ROLES = require('../constants/Roles');

function admin(req, res, next) {
    if (req.currentUser.role !== ROLES.ADMIN) {
        return res.status(403).send("Access Denied");
    }
    else {
        next();
    }
}

function user(req, res, next) {
    if (req.currentUser.role !== ROLES.USER) {
        return res.status(403).send("Access Denied");
    }
    else {
        next();
    }
}

function user(req, res, next) {
    if (req.currentUser.role !== ROLES.USER) {
        return res.status(403).send("Access Denied");
    }
    else {
        next();
    }
}

module.exports = {
    admin,
    user
}