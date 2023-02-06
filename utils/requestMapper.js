const createdAtTime = require('../utils/dateTimeUtil');

const mapRequestToUser = (requestBody) => {
    let user = {
        fullName: requestBody.fullName,
        email: requestBody.email ?? "",
        phoneNumber: requestBody.phoneNumber,
    }
    if (requestBody.password)
        user["password"] = requestBody.password;
    return user;
};

const mapRequestToMainCategory = (requestBody) => {
    let mainCategory = {
        title: requestBody.title,
        subCategories: requestBody.subCategories,
        requiredFields: requestBody.requiredFields,
    };
    return mainCategory;
}

const mapRequestToAdmin = (requestBody) => {
    let admin = {
        userName: requestBody.userName
    };
    if (requestBody.password)
        admin["password"] = requestBody.password
    return admin;
}

const mapRequestToSubCategory = (requestBody) => {
    let subCategory = {
        title: requestBody.title
    };
    return subCategory;
}


const mapRequestToProduct = (requestBody, createdBy) => {
    let product = {
        title: requestBody.title,
        description: requestBody.description,
        price: requestBody.price,
        mainCategory: requestBody.mainCategory,
        subCategory: requestBody.subCategory,
        city: requestBody.city,
        contactPhone: requestBody.contactPhone,
        contactName: requestBody.contactName,
        productImages: requestBody.productImages,
        createdAt: createdAtTime(),
        refreshedAt: createdAtTime(),
        createdBy: createdBy,
        productDetail: requestBody.productDetail ===
            undefined ? undefined : { ...requestBody.productDetail },
    };
    return product;
}


module.exports = {
    mapRequestToUser,
    mapRequestToMainCategory,
    mapRequestToAdmin,
    mapRequestToSubCategory,
    mapRequestToProduct
};