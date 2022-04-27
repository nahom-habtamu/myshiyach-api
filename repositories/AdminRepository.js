const { Admin } = require('../models/Admin');

const getAllAdmins = async () => {
    let allAdmins = await Admin.find({});
    return allAdmins;
}

const getAdminById = async (id) => {
    let admin = await Admin.findById(id).exec();
    if (!admin) {
        throw new Error("Admin Not Found");
    }
    return admin;
}

const deleteAdminById = async (id) => {
    let adminToDelete =
        await Admin.findByIdAndRemove(id).exec();
    if (!adminToDelete) {
        throw new Error("Admin Not Found")
    }
    return adminToDelete;
}

const updateAdminById = async (id, admin) => {
    const updatedAdmin = await Admin.findByIdAndUpdate(
        id, admin,
        { new: true }
    ).exec();
    return updatedAdmin;
}

const patchAdminById = async (id, admin) => {
    let adminInDb = await getAdminById(id);
    const patchedAdmin = await Admin.findByIdAndUpdate(
        id, {
        userName: admin.userName ?? adminInDb.userName,
        password: admin.password ?? adminInDb.password,
    },
        { new: true }
    ).exec();
    return patchedAdmin;
}

const createAdmin = async (admin) => {
    const adminToCreate = new Admin({
        ...admin
    });

    const response = await adminToCreate.save();
    return response;
}

module.exports = {
    getAllAdmins,
    getAdminById,
    deleteAdminById,
    updateAdminById,
    patchAdminById,
    createAdmin
}