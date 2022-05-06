const mapRequestToUser = (requestBody) => {
    let user = {
        fullName: requestBody.fullName,
        email: requestBody.email,
        phoneNumber: requestBody.phoneNumber,
        profilePicture: requestBody.profilePicture
    }
    if(requestBody.password)
        user["password"] = requestBody.password;
    return user;
};

const mapRequestToMainCategory = (requestBody) => {
    let mainCategory = {
        title: requestBody.title,
        subCategories: requestBody.subCategories
    };
    return mainCategory;
}

const mapRequestToAdmin = (requestBody) => {
    let admin = {
        userName: requestBody.userName
    };
    if(requestBody.password)
        admin["password"] = requestBody.password
    return admin;
}

const mapRequestToSubCategory = (requestBody) => {
    let subCategory = {
        title: requestBody.title,
        additionalData: requestBody.additionalData
    };
    return subCategory;
}


const mapRequestToProduct = (requestBody) => {
    let product = {
        title : requestBody.title,
        description : requestBody.description,
        price : requestBody.price,
        mainCategory : requestBody.mainCategory,
        subCategory : requestBody.subCategory,
        brand : requestBody.brand,
        other : requestBody.other === 
            undefined ? undefined : { ...requestBody.other },
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