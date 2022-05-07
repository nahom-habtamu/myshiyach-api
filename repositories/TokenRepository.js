const jwt = require('jsonwebtoken');

const privatKey = "MYPRIVATEKEY";

function generateAuthToken(payload) {
    const token = jwt.sign({
        sub: payload.sub,
        role: payload.role,
    }, privatKey);
    return token;
}

function decodeToken(token) {
    const decoded = jwt.verify(token, privatKey);
    return decoded;
}


module.exports = {
    generateAuthToken,
    decodeToken
}