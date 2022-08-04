const { MainCategory } = require('../models/MainCategory');
const subCategoryRepo = require('../repositories/SubCategoryRepository');

const getAllMainCategories = async () => {
    let mainCategories = await MainCategory.find({});
    let mainCategoriesWithSubCategoriesAdded =
        await buildSubCategoriesForEveryMainCategory(mainCategories);
    return mainCategoriesWithSubCategoriesAdded;
}

async function buildSubCategoriesForEveryMainCategory(mainCategories) {
    let mainCategoriesWithSubCategoriesAdded = [];
    for (let i = 0; i < mainCategories.length; i++) {
        let subCategories = await buildSubCategories(mainCategories[i]);
        mainCategoriesWithSubCategoriesAdded = [
            ...mainCategoriesWithSubCategoriesAdded,
            {
                _id: mainCategories[i]._id,
                title: mainCategories[i].title,
                subCategories: subCategories,
                requiredFields: mainCategories[i].requiredFields,
            }
        ];
    }
    return mainCategoriesWithSubCategoriesAdded;
}

const getMainCategoryById = async (id) => {
    let mainCategory = await MainCategory.findById(id).exec();
    if (!mainCategory) {
        throw new Error("MainCategory Not Found")
    }
    let subCategories = await buildSubCategories(mainCategory);
    return {
        _id: mainCategory._id,
        title: mainCategory.title,
        subCategories: subCategories,
        requiredFields: mainCategory.requiredFields,
    };
}

async function buildSubCategories(mainCategory) {
    let subCategories = [];
    for (let i = 0; i < mainCategory.subCategories.length; i++) {
        let subCategoryId = (mainCategory.subCategories)[i];
        let subCategory = await subCategoryRepo.getSubCategoryById(subCategoryId);
        subCategories = [...subCategories, subCategory];
    }
    return subCategories;
}

const deleteMainCategoryById = async (id) => {
    let mainCategory =
        await MainCategory.findById(id).exec();
    if (!mainCategory) {
        throw new Error("MainCategory Not Found")
    }
    else {
        let deletedMainCategory =
            await MainCategory.findByIdAndRemove(id).exec();
        await deleteAllSubCategories(deletedMainCategory);
        return deletedMainCategory;
    }
}

const deleteAllSubCategories = async (deletedMainCategory) => {
    return deletedMainCategory.subCategories.forEach(async element => {
        await subCategoryRepo.deleteSubCategoryById(element);
    });
}

const updateMainCategoryById = async (id, mainCategory) => {
    const updatedMainCategory = await MainCategory.findByIdAndUpdate(
        id, mainCategory,
        { new: true }
    ).exec();

    let subCategories = await buildSubCategories(updatedMainCategory);
    return {
        _id: updatedMainCategory._id,
        title: updatedMainCategory.title,
        subCategories: subCategories,
        requiredFields: updatedMainCategory.requiredFields
    };
}

const patchMainCategoryById = async (id, mainCatFromReq) => {

    let mainCatInDb = await getMainCategoryById(id);

    let subCatToInsert = mainCatFromReq.subCategories ? Array.from(...new Set(
        [mainCatFromReq.subCategories]
    )) : mainCatInDb.subCategories;

    const patchedMainCat = await MainCategory.findByIdAndUpdate(
        id, {
        title: mainCatFromReq.title ?? mainCatInDb.title,
        subCategories: subCatToInsert,
        requiredFields: mainCatFromReq.requiredFields ?? mainCatInDb.requiredFields
    },
        { new: true }
    ).exec();

    let subCategories = await buildSubCategories(patchedMainCat);
    return {
        _id: patchedMainCat._id,
        title: patchedMainCat.title,
        subCategories: subCategories,
        requiredFields: patchedMainCat.requiredFields
    };
}

const createMainCategory = async (mainCategory) => {
    let subCategories = await buildSubCategories(mainCategory);
    const mainCategoryToCreate = new MainCategory({
        ...mainCategory,
        subCategories: [...new Set(mainCategory.subCategories)]
    });
    const response = await mainCategoryToCreate.save();
    return {
        _id: response._id,
        title: response.title,
        subCategories: subCategories,
        requiredFields: response.requiredFields
    };
}

module.exports = {
    getAllMainCategories,
    getMainCategoryById,
    deleteMainCategoryById,
    updateMainCategoryById,
    patchMainCategoryById,
    createMainCategory
}
