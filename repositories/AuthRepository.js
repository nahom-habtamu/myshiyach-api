const { getAdminByUsernameAndPassword } = require('./AdminRepository');
const { getUserByUsernameAndPassword } = require('./UserRepository');

const findUserAndGenerateToken = async (authRequest) => {
    const user = await getUserByUsernameAndPassword(authRequest);
    const admin = await getAdminByUsernameAndPassword(authRequest);

    if (!user && !admin) {
        throw new Error('User Not Found');
    }
    else if (user != null) {
        return "I AM USER";
    }
    else {
        return "I AM ADMIN";
    }
}

module.exports = {
    findUserAndGenerateToken
};