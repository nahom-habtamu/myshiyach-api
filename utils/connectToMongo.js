const mongoose = require('mongoose');
module.exports = async function(dbName){
    try {
        await mongoose.connect(`mongodb://localhost/${dbName}`, {
            useNewUrlParser : true,
            useUnifiedTopology : true,
        });
        console.log("Connected To { " + dbName + " } database succesfully"); 
    } 
    catch (error) {
        console.log(error.message);
    }
};