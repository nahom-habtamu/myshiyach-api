const mongoose = require('mongoose');

const mainCategorySchema = new mongoose.Schema({
    title : {
        type: String,
        maxlength: 50,
        minlength: 5
    },
    subCategories : {
        type: [String]
    }
});

const MainCategory = new mongoose.model('MainCategory', mainCategorySchema);

module.exports = {
    mainCategorySchema,
    MainCategory
};