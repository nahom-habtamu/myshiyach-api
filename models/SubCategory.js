const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Sub Category Title Is Required"]
    }
});

const SubCategory = new mongoose.model("SubCategory", subCategorySchema);

module.exports = {
    SubCategory,
    subCategorySchema
};