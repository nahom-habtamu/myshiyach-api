const express = require('express');
const router = express.Router();

const usersInteractor = require('../interactors/UsersInteractor');
const mapRequestBodyToUserObject = require('../utils/mapRequestBodyToUserObject');


router.get('/', async (req, res) => {
    try {
        let users = await usersInteractor.getAllUsers();
        res.status(200).send(users);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.get('/:id', async (req, res) => {
    try {
        let userId = req.params.id;
        let user = await usersInteractor.getUserById(userId);
        res.status(200).send(user);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.post('/', async (req, res) => {
    try {
        let user = mapRequestBodyToUserObject(req.body);
        let userCreated = await usersInteractor.createUser(user);
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
        await usersInteractor.deleteUserById(userId);
        res.status(202).send({ userId });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        let userId = req.params.id;
        let user = mapRequestBodyToUserObject(req.body);
        let updatedUser = await usersInteractor.updateUserById(userId, user);
        res.status(202).send(updatedUser);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        let userId = req.params.id;
        let user = mapRequestBodyToUserObject(req.body);
        let patchedUser = await usersInteractor.patchUserById(userId, user);
        res.status(202).send(patchedUser);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;