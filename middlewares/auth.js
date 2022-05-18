const { decodeToken } = require('../repositories/TokenRepository');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send('Access Denied. Found 0 token');
    }
    try {
        const decoded = decodeToken(token);
        req.currentUser = decoded;
        next();
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports = auth;