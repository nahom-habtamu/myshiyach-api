const mapRequestToUser = (requestBody) => {
    let user = {
        fullName: requestBody.fullName,
        email: requestBody.email,
        password: requestBody.password,
        phoneNumber: requestBody.phoneNumber,
        profilePicture: requestBody.profilePicture
    }
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
        userName: requestBody.userName,
        password: requestBody.password,
    };
    return admin;
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
    mapRequestToProduct
};