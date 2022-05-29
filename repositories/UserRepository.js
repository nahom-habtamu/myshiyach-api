const { User } = require('../models/User');

const getAllUsers = async () => {
    let users = await User.find({});
    return users;
}

const getUserByUsernameAndPassword = async ({ userName, password }) => {
    let user = await User.findOne({
        phoneNumber: userName, password: password
    });
    return user;
}

const getUserById = async (id) => {
    let user = await User.findById(id).exec();
    if (!user) {
        throw new Error("User Not Found")
    }
    return user;
}

const deleteUserById = async (id) => {
    let deletedUser = await User.findByIdAndRemove(id).exec();
    if (!deletedUser) {
        throw new Error("User Not Found")
    }
    return deletedUser;
}

const updateUserById = async (id, user) => {
    const updatedUser = await User.findByIdAndUpdate(
        id, user,
        { new: true }
    ).exec();
    return updatedUser;
}

const patchUserById = async (id, user) => {
    let userInDb = await getUserById(id);
    const patchedUser = await User.findByIdAndUpdate(
        id, {
        fullName: user.fullName ?? userInDb.fullName,
        email: user.email ?? userInDb.email,
        password: user.password ?? userInDb.password,
        phoneNumber: user.phoneNumber ?? userInDb.phoneNumber,
        profilePicture: user.profilePicture ?? userInDb.profilePicture,
    },
        { new: true }
    ).exec();
    return patchedUser;
}

const createUser = async (user) => {
    const userToCreate = new User({
        ...user
    });

    const response = await userToCreate.save();
    return response;
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUserById,
    updateUserById,
    patchUserById,
    getUserByUsernameAndPassword
}