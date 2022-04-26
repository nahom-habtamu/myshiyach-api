const express = require('express');
const router = express.Router();

const usersRepo = require('../repositories/UsersRepository');
const { mapRequestToUser } = require('../utils/requestMapper');

router.get('/', async (req, res) => {
    try {
        let users = await usersRepo.getAllUsers();
        res.status(200).send(users);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.get('/:id', async (req, res) => {
    try {
        let userId = req.params.id;
        let user = await usersRepo.getUserById(userId);
        res.status(200).send(user);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.post('/', async (req, res) => {
    try {
        let user = mapRequestToUser(req.body);
        let userCreated = await usersRepo.createUser(user);
        res.status(201).send(userCreated);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let userId = req.params.id;
        await usersRepo.deleteUserById(userId);
        res.status(202).send({ userId });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        let userId = req.params.id;
        let user = mapRequestToUser(req.body);
        let updatedUser = await usersRepo.updateUserById(userId, user);
        res.status(202).send(updatedUser);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        let userId = req.params.id;
        let user = mapRequestToUser(req.body);
        let patchedUser = await usersRepo.patchUserById(userId, user);
        res.status(202).send(patchedUser);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;