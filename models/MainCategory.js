const mongoose = require('mongoose');

const mainCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        maxlength: 50,
        minlength: 3,
        required: [true, "Please Enter Title"]
    },
    subCategories: {
        type: [
            {
                title: {
                    type: String,
                    required : true
                },
                additionalData: [String]
            }
        ],
        required: [true, "Please Enter Sub Categories"]
    }
});

const MainCategory = new mongoose.model('MainCategory', mainCategorySchema);

module.exports = {
    mainCategorySchema,
    MainCategory
};