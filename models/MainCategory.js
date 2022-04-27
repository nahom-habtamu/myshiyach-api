const mongoose = require('mongoose');

const mainCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 50,
        minlength: 5,
        required: [true, "Please Enter Title"]
    },
    subCategories: {
        type: [String],
        required: [true, "Please Enter Sub Categories"]
    }
});

const MainCategory = new mongoose.model('MainCategory', mainCategorySchema);

module.exports = {
    mainCategorySchema,
    MainCategory
};