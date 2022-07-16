const { Product } = require('../models/Product');

const refreshedAtTime = require('../utils/dateTimeUtil');

const getAllProducts = async () => {
    const products = await Product.find({});
    return products;
};

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
    console.log({ ...productInDb });

    const patchedProduct = await Product.findByIdAndUpdate(
        id, {
        title: product.title ?? productInDb.title,
        description: product.description ?? productInDb.description,
        price: product.price ?? productInDb.price,
        mainCategory: product.mainCategory ?? productInDb.mainCategory,
        subCategory: product.subCategory ?? productInDb.subCategory,
        refreshedAt: productInDb.refreshedAt,
        createdAt: productInDb.createdAt,
        createdBy: productInDb.createdBy,
        city: product.city ?? productInDb.city,
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

module.exports = {
    getAllProducts,
    getProductById,
    deleteProductById,
    updateProductById,
    patchProductById,
    createProduct,
    refreshProduct
}