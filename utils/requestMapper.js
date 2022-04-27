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


module.exports = {
    mapRequestToUser,
    mapRequestToMainCategory,
    mapRequestToAdmin
};