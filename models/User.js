const mongoose = require('mongoose');
const validatePhoneNumber = require("../utils/validatePhoneNumber");

const { generateAuthToken } = require('../repositories/TokenRepository');
const ROLES = require('../constants/Roles');

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: [true, "Enter Valid Name"],
        maxlength: 100,
    },
    email: {
        type: String,
        maxlength: 50,
    },
    password: {
        type: String,
        required: [true, "Enter Valid Password"],
        maxlength: 255,
        minlength: 6
    },
    phoneNumber: {
        type: String,
        required: [true, "Enter Your Phone Number"],
    }
});

userSchema.methods.generateAuthToken = function () {
    return generateAuthToken({
        sub: this._id,
        role: ROLES.USER
    });
}

const User = new mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.userSchema = userSchema;