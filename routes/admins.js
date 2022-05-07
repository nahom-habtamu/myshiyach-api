const express = require('express');
const router = express.Router();

const adminRepo = require('../repositories/AdminRepository');
const { mapRequestToAdmin } = require('../utils/requestMapper');
const {
    createAdminRequestValidationSchema,
    patchAdminRequestValidationSchema,
    putAdminRequestValidationSchema
} = require('../validation-schemas/AdminRequestValidationSchema');

const auth = require('../middlewares/auth');
const { admin } = require('../middlewares/role');

router.get('/', [auth, admin], async (req, res) => {
    try {
        let admins = await adminRepo.getAllAdmins();
        res.status(200).send(admins);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.get('/me', [auth, admin], async (req, res) => {
    try {
        let adminId = req.currentUser.sub;
        let admin = await adminRepo.getAdminById(adminId);
        res.status(200).send(admin);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.post('/', [auth, admin], async (req, res) => {
    try {
        let admin = mapRequestToAdmin(req.body);
        let { error } = createAdminRequestValidationSchema.validate(admin);
        if (error)
            throw error;
        let adminCreated = await adminRepo.createAdmin(admin);
        res.status(201).send(adminCreated);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete('/me', [auth, admin], async (req, res) => {
    try {
        let adminId = req.currentUser.sub;
        await adminRepo.deleteAdminById(adminId);
        res.status(202).send({ adminId });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.put('/me', [auth, admin], async (req, res) => {
    try {
        let adminId = req.currentUser.sub;
        let admin = mapRequestToAdmin(req.body);
        let { error } = putAdminRequestValidationSchema.validate(admin);
        if (error)
            throw error;
        let updatedAdmin = await adminRepo.updateAdminById(adminId, admin);
        res.status(202).send(updatedAdmin);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.patch('/me', [auth, admin], async (req, res) => {
    try {
        let adminId = req.currentUser.sub;
        let admin = mapRequestToAdmin(req.body);
        let { error } = patchAdminRequestValidationSchema.validate(admin);
        if (error)
            throw error;
        let patchedAdmin = await adminRepo.patchAdminById(adminId, admin);
        res.status(202).send(patchedAdmin);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;