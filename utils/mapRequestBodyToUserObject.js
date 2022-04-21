const mapRequestBodyToUserObject = (requestBody) => {
    var user = {
        fullName: requestBody.fullName,
        email: requestBody.email,
        password: requestBody.password,
        phoneNumber: requestBody.phoneNumber,
        profilePicture: requestBody.profilePicture
    }

    return user;
};

module.exports = mapRequestBodyToUserObject;