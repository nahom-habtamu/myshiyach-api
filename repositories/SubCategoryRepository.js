const { SubCategory } = require('../models/SubCategory');

const getAllSubCategories = async () => {
    let allSubCategories = await SubCategory.find({});
    return allSubCategories;
}

const getSubCategoryById = async (id) => {
    let subCategory = await SubCategory.findById(id).exec();
    if (!subCategory) {
        throw new Error("SubCategory Not Found");
    }
    return subCategory;
}

const deleteSubCategoryById = async (id) => {
    let subCategoryToDelete =
        await SubCategory.findByIdAndRemove(id).exec();
    if (!subCategoryToDelete) {
        throw new Error("SubCategory Not Found")
    }
    return subCategoryToDelete;
}

const updateSubCategoryById = async (id, subCategory) => {
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
        id, subCategory,
        { new: true }
    ).exec();
    return updatedSubCategory;
}

const patchSubCategoryById = async (id, subCategory) => {
    let subCategoryInDb = await getSubCategoryById(id);
    const patchedSubCategory = await SubCategory.findByIdAndUpdate(
        id, {
        title: subCategory.title ?? subCategoryInDb.title
    },
        { new: true }
    ).exec();
    return patchedSubCategory;
}

const createSubCategory = async (subCategory) => {
    const subCategoryToCreate = new SubCategory({
        ...subCategory
    });

    const response = await subCategoryToCreate.save();
    return response;
}

module.exports = {
    getAllSubCategories,
    getSubCategoryById,
    deleteSubCategoryById,
    updateSubCategoryById,
    patchSubCategoryById,
    createSubCategory
}
