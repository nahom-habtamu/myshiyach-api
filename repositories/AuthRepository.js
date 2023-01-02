const bcrypt = require('bcrypt');

const { getAdminByUsernameAndPassword } = require('./AdminRepository');
const { getUserByUsername } = require('./UserRepository');

const findUserAndGenerateToken = async (authRequest) => {
    const user = await getUserByUsername(authRequest.phoneNumber);
    const admin = await getAdminByUsernameAndPassword(authRequest);
    if (admin == null && user != null) {
        const checkedPassword = await bcrypt.compare(
            authRequest.password, user.password
        );
        if (!checkedPassword) {
            throw new Error('Incorrect Password');
        }
        return user.generateAuthToken();
    }

    else if (admin != null && user == null) {
        return admin.generateAuthToken();
    }

    else {
        throw new Error('User Not Found');
    }
}

module.exports = {
    findUserAndGenerateToken
};