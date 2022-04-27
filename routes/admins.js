const express = require('express');
const router = express.Router();

const adminRepo = require('../repositories/AdminRepository');
const { mapRequestToAdmin } = require('../utils/requestMapper');

router.get('/', async (req, res) => {
    try {
        let admins = await adminRepo.getAllAdmins();
        res.status(200).send(admins);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.get('/:id', async (req, res) => {
    try {
        let adminId = req.params.id;
        let admin = await adminRepo.getAdminById(adminId);
        res.status(200).send(admin);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.post('/', async (req, res) => {
    try {
        let admin = mapRequestToAdmin(req.body);
        let adminCreated = await adminRepo.createAdmin(admin);
        res.status(201).send(adminCreated);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let adminId = req.params.id;
        await adminRepo.deleteAdminById(adminId);
        res.status(202).send({ adminId });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        let adminId = req.params.id;
        let admin = mapRequestToAdmin(req.body);
        let updatedAdmin = await adminRepo.updateAdminById(adminId, admin);
        res.status(202).send(updatedAdmin);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        let adminId = req.params.id;
        let admin = mapRequestToAdmin(req.body);
        let patchedAdmin = await adminRepo.patchAdminById(adminId, admin);
        res.status(202).send(patchedAdmin);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;