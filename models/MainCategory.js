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
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, "Please Enter Sub Categories"]
    },
    requiredFields: {
        type: [
            {
                objectKey: String,
                isDropDown: Boolean,
                dropDownValues: [String]
            }
        ]
    }
});

const MainCategory = new mongoose.model('MainCategory', mainCategorySchema);

module.exports = {
    mainCategorySchema,
    MainCategory
};