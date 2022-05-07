const mongoose = require('mongoose');

const { generateAuthToken } = require('../repositories/TokenRepository');
const ROLES = require('../constants/Roles');

const adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: [true, "Please Enter Username"],
        maxlength: 50,
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
        maxlength: 255
    }
});


adminSchema.methods.generateAuthToken = function () {
    return generateAuthToken({
        sub: this._id,
        role: ROLES.ADMIN
    });
}

const Admin = new mongoose.model('Admin', adminSchema);

module.exports = {
    Admin,
    adminSchema
};