const { Product } = require('../models/Product');

const getAllProducts = async () => {
    const products = await Product.find({});
    return products;
};

const getProductById = async (id) => {
    const product = await Product.findById(id).exec();
    if(!product){
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

const updateProductById = async (id, product) => {
    const updatedProduct = await Product.findByIdAndUpdate(
        id, {
            ...product,
            other : product.other ? { ...product.other } : {} 
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
            brand: product.brand ?? productInDb.brand,
            other: product.other ?
                 { ...product.other } : {...productInDb.other},
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
    createProduct
}