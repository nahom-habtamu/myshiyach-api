const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please Enter Username"],
        maxlength: 50
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
        maxlength: 255
    }
});

const Admin = new mongoose.model('Admin', adminSchema);

module.exports = {
    Admin,
    adminSchema
};