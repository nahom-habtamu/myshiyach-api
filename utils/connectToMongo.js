const mongoose = require('mongoose');
module.exports = function (dbName) {
    try {
        mongoose.connect(`mongodb+srv://nahom-hab:ecommercetest@cluster0.rxw0t.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected To { " + dbName + " } database succesfully");
    }
    catch (error) {
        console.log(error.message);
    }
};