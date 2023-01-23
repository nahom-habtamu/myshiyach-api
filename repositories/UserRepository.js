const bcrypt = require('bcrypt');
const { User } = require('../models/User');

const getAllUsers = async () => {
    let users = await User.find({});
    return users;
}

const getUserByUsername = async (userName) => {
    let user = await User.findOne({
        phoneNumber: userName
    });
    return user;
}

const changeUserPassword = async ({ phoneNumber, password }) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user = await User.findOne({
        phoneNumber: phoneNumber
    });
    user.password = hashedPassword;
    updateUserById(user._id, user);
}

const getUserById = async (id) => {
    let user = await User.findById(id)
        .select("_id phoneNumber email fullName isReported favoriteProducts")
        .exec();
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
        id, { ...user },
        { new: true }
    ).select("_id phoneNumber email fullName isReported favoriteProducts").exec();
    return updatedUser;
}

const patchUserById = async (id, user) => {
    let userInDb = await getUserById(id);
    const patchedUser = await User.findByIdAndUpdate(
        id, {
        fullName: user.fullName ?? userInDb.fullName,
        email: user.email ?? userInDb.email,
        password: userInDb.password,
        phoneNumber: user.phoneNumber ?? userInDb.phoneNumber,
    },
        { new: true }
    ).select("_id phoneNumber email fullName isReported favoriteProducts").exec();
    return patchedUser;
}

const reportUser = async (id) => {
    let userInDb = await getUserById(id);
    const reportedUser = await User.findByIdAndUpdate(
        id, { ...userInDb._doc, isReported: true }, { new: true }
    ).select("_id phoneNumber email fullName isReported favoriteProducts").exec();
    return reportedUser;
}

const unReportUser = async (id) => {
    let userInDb = await getUserById(id);
    const reportedUser = await User.findByIdAndUpdate(
        id, { ...userInDb._doc, isReported: false }, { new: true }
    ).select("_id phoneNumber email fullName isReported favoriteProducts").exec();
    return reportedUser;
}

const createUser = async (user) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const userToCreate = new User({
        ...user,
        password: hashedPassword
    });
    const response = await userToCreate.save();
    const hiddenPassword = await User.findById(response._id).select("_id phoneNumber email fullName favoriteProducts");
    return hiddenPassword;
}

const updateFavoriteProducts = async (id, favoriteProducts) => {
    let userInDb = await getUserById(id);
    const updated = await User.findByIdAndUpdate(
        id, { ...userInDb._doc, favoriteProducts: favoriteProducts }, { new: true }
    ).select("_id phoneNumber email fullName isReported favoriteProducts").exec();
    return updated;
}

module.exports = {
    getAllUsers,
    getUserById,
    reportUser,
    unReportUser,
    createUser,
    deleteUserById,
    updateUserById,
    patchUserById,
    getUserByUsername,
    changeUserPassword,
    updateFavoriteProducts
}