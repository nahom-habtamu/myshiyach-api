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
        title : requestBody.title,
        subCategories : requestBody.subCategories
    };

    return mainCategory;
}

module.exports = {
    mapRequestToUser,
    mapRequestToMainCategory
};