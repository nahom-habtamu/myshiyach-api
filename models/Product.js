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
        required: [true, "Please Select Sub Category"]
    },
    city: {
        type: String,
        required: [true, "Enter City"]
    },
    contactPhone: {
        type: String,
        required: [true, "Enter Contact Phone"]
    },
    productImages: {
        type: [String],
        required: [true, "Enter Images For Product"]
    },
    createdAt: {
        type: Date,
        required: [true, "Please Enter The Time Product was created"]
    },
    refreshedAt: {
        type: Date,
        required: [true, "Please Enter The Time Product was refreshed"]
    },
    createdBy: {
        type: String,
        required: [true, "Please Enter ID of user who created the product"]
    },
    productDetail: {},
    isReported: {
        type: Boolean,
        default: false
    }
});

const Product = new mongoose.model('Product', productSchema);

module.exports = {
    Product,
    productSchema
};