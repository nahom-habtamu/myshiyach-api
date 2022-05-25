const { MainCategory } = require('../models/MainCategory');
const subCategoryRepo = require('../repositories/SubCategoryRepository');

const getAllMainCategories = async () => {
    let mainCategories = await MainCategory.find({});    
    // let mainCategoriesWithSubCategoriesAdded = 
    //     await BuildSubCategoriesForEveryMainCategory(mainCategories);
    // return mainCategoriesWithSubCategoriesAdded;
    return mainCategories;
}

async function BuildSubCategoriesForEveryMainCategory(mainCategories) {
    let mainCategoriesWithSubCategoriesAdded = [];
    for (let i = 0; i < mainCategories.length; i++) {
        let subCategories = await buildSubCategories(mainCategories[i]);
        mainCategoriesWithSubCategoriesAdded = [
            ...mainCategoriesWithSubCategoriesAdded,
            {
                _id: mainCategories[i]._id,
                title: mainCategories[i].title,
                subCategories: subCategories
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
        _id : mainCategory._id, 
        title : mainCategory.title, 
        subCategories : subCategories
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
        _id : updatedMainCategory._id, 
        title : updatedMainCategory.title, 
        subCategories : subCategories
    };
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

    let subCategories = await buildSubCategories(patchedMainCategory);
    return {
        _id : patchedMainCategory._id, 
        title : patchedMainCategory.title, 
        subCategories : subCategories
    };
}

const createMainCategory = async (mainCategory) => {
    let subCategories = await buildSubCategories(mainCategory);
    const mainCategoryToCreate = new MainCategory({
        ...mainCategory
    });
    const response = await mainCategoryToCreate.save();
    return {
        _id : response._id, 
        title : response.title, 
        subCategories : subCategories
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
