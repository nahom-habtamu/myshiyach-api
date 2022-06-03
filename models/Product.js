const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title Is Required"]
    },
    description: {
        type: String,
        required: [true, "Description is Required"]
    },
    price: {
        type: Number,
        required: [true, "Price is Required"]
    },
    mainCategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please Select Main Category"]
    },
    subCategory: {
        type: String,
        required: [true, "Please Select Main Category"]
    },
    brand: {
        type: String,
        required: [true, "Enter Brand Of Product"]
    },
    state: {
        type: String,
        required: [true, "Enter State Whether New Or Old"]
    },
    city: {
        type: String,
        required: [true, "Enter City"]
    },
    productImages: {
        type: [String],
        required: [true, "Enter Images For Product"]
    },
    createdAt: {
        type: String,
        required: [true, "Please Enter The Time Product was created"]
    },
    createdBy: {
        type: String,
        required: [true, "Please Enter ID of user who created the product"]
    },
    other: {}
});

const Product = new mongoose.model('Product', productSchema);

module.exports = {
    Product,
    productSchema
};