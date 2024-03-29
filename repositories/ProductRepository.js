const mongoose = require('mongoose')

const { Product } = require('../models/Product');

const refreshedAtTime = require('../utils/dateTimeUtil');
const paginate = require('../middlewares/pagination');

const getAllProducts = async () => {
    let products = await Product.find({});
    return products;
}

const getAllProductsWithListOfId = async (listOfId) => {
    let listOfIdParsed = listOfId.map(l => mongoose.Types.ObjectId(l));
    let products = await Product.find({ "_id": { "$in": listOfIdParsed } });
    return products;
}

const getProductsCreatedByUser = async (userId) => {
    let products = await Product.find({ createdBy: userId });
    return products;
}

const getPaginatedProducts = async (page, limit, filterCriteria) => {
    let paginatedProducts = paginate(Product, page, limit, filterCriteria);
    return paginatedProducts;
}

const getProductById = async (id) => {
    const product = await Product.findById(id).exec();
    if (!product) {
        throw new Error('Product Not Found');
    }
    return product;
}

const deleteProductById = async (id) => {
    let deletedProduct =
        await Product.findByIdAndRemove(id).exec();
    if (!deletedProduct) {
        throw new Error("Product Not Found")
    }
    return deletedProduct;
}

const refreshProduct = async (id) => {
    let productInDb = await getProductById(id);
    if (!productInDb) {
        throw new Error("Product Not Found");
    }
    const updatedProduct = await Product.findByIdAndUpdate(
        id, {
        ...productInDb._doc,
        refreshedAt: refreshedAtTime()
    }, { new: true }).exec();
    return updatedProduct;
}

const updateProductRefreshedAtByConstantTime = async (id) => {
    let productInDb = await getProductById(id);
    if (!productInDb) {
        throw new Error("Product Not Found");
    }
    let updatedRefreshedAt = addHours(24, new Date(productInDb.refreshedAt));
    let convertedToLocalDate = updatedRefreshedAt.toLocaleString(
        'en-US', { timeZone: 'Africa/Addis_Ababa' }
    );
    const updatedProduct = await Product.findByIdAndUpdate(
        id, {
        ...productInDb._doc,
        refreshedAt: convertedToLocalDate
    }, { new: true }).exec();
    return updatedProduct;
}

function addHours(numOfHours, date) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    return date;
}

const updateProductById = async (id, product) => {
    const updatedProduct = await Product.findByIdAndUpdate(
        id, {
        ...product,
        productDetail: product.productDetail ? { ...product.productDetail } : {}
    },
        { new: true }
    ).exec();
    return updatedProduct;
}

const patchProductById = async (id, product) => {
    let productInDb = await getProductById(id);
    const patchedProduct = await Product.findByIdAndUpdate(
        id, {
        title: product.title ?? productInDb.title,
        description: product.description ?? productInDb.description,
        price: product.price ?? productInDb.price,
        mainCategory: product.mainCategory ?? productInDb.mainCategory,
        subCategory: product.subCategory ?? productInDb.subCategory,
        refreshedAt: refreshedAtTime(),
        createdAt: productInDb.createdAt,
        createdBy: productInDb.createdBy,
        city: product.city ?? productInDb.city,
        contactPhone: product.contactPhone ?? productInDb.contactPhone,
        contactName: product.contactName ?? productInDb.contactName,
        productImages: product.productImages ?? productInDb.productImages,
        productDetail: product.productDetail ?
            { ...product.productDetail } :
            { ...productInDb.productDetail },
    },
        { new: true }
    ).exec();
    return patchedProduct;
}

const createProduct = async (product) => {
    const productToCreate = new Product({
        ...product
    });
    const response = await productToCreate.save();
    return response;
}

const reportProduct = async (id) => {
    let productInDb = await getProductById(id);
    const reportedProduct = await Product.findByIdAndUpdate(
        id, { ...productInDb._doc, isReported: true }, { new: true }
    ).exec();
    return reportedProduct;
}

const unReportProduct = async (id) => {
    let productInDb = await getProductById(id);
    const reportedProduct = await Product.findByIdAndUpdate(
        id, { ...productInDb._doc, isReported: false }, { new: true }
    ).exec();
    return reportedProduct;
}

const updateProductsImages = async (oldUrl, newUrl) => {
    let products = await Product.find({});
    let updatedProductsIds = [];
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (product.productImages.filter(i => i.includes(oldUrl)).length > 0) {
            const productImagesUpdated = product.productImages.map((i) => {
                if (i.includes(oldUrl)) {
                    return i.replace(oldUrl, newUrl)
                }
                return i;
            });
            updatedProductsIds.push(product._id);
            await Product.findByIdAndUpdate(
                product._id, { ...product._doc, productImages: productImagesUpdated }, { new: true }
            ).exec();
        }
    }
    return updatedProductsIds;
}

module.exports = {
    getPaginatedProducts,
    getProductById,
    deleteProductById,
    updateProductById,
    patchProductById,
    createProduct,
    refreshProduct,
    getAllProducts,
    getProductsCreatedByUser,
    updateProductRefreshedAtByConstantTime,
    reportProduct,
    unReportProduct,
    updateProductsImages,
    getAllProductsWithListOfId
}