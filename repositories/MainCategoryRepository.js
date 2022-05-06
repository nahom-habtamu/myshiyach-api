const { MainCategory } = require('../models/MainCategory');

const getAllMainCategories = async () => {
    let mainCategories = await MainCategory.find({});
    return mainCategories;
}

const getMainCategoryById = async (id) => {
    let mainCategory = await MainCategory.findById(id).exec();
    if (!mainCategory) {
        throw new Error("MainCategory Not Found")
    }
    return mainCategory;
}

const deleteMainCategoryById = async (id) => {
    let deletedMainCategory =
        await MainCategory.findByIdAndRemove(id).exec();
    if (!deletedMainCategory) {
        throw new Error("MainCategory Not Found")
    }
    return deletedMainCategory;
}

const updateMainCategoryById = async (id, mainCategory) => {
    const updatedMainCategory = await MainCategory.findByIdAndUpdate(
        id, mainCategory,
        { new: true }
    ).exec();
    return updatedMainCategory;
}

const patchMainCategoryById = async (id, mainCategory) => {
    let mainCategoryInDb = await getMainCategoryById(id);
    const patchedMainCategory = await MainCategory.findByIdAndUpdate(
        id, {
        title: mainCategory.title ?? mainCategoryInDb.title,
        subCategories: mainCategory.subCategories
            ?? mainCategoryInDb.subCategories,
    },
        { new: true }
    ).exec();
    return patchedMainCategory;
}

const createMainCategory = async (mainCategory) => {
    const mainCategoryToCreate = new MainCategory({
        ...mainCategory
    });

    const response = await mainCategoryToCreate.save();
    return response;
}

module.exports = {
    getAllMainCategories,
    getMainCategoryById,
    deleteMainCategoryById,
    updateMainCategoryById,
    patchMainCategoryById,
    createMainCategory
}