const express = require('express');
const router = express.Router();

const userRepo = require('../repositories/UserRepository');
const { mapRequestToUser } = require('../utils/requestMapper');

const {
    createUserRequestValidationSchema,
    putUserRequestValidationSchema,
    patchUserRequestValidationSchema
} = require('../validation-schemas/UserRequestValidationSchema');

const auth = require('../middlewares/auth');
const { admin } = require('../middlewares/role');

router.get('/', [auth, admin], async (req, res) => {
    try {
        let users = await userRepo.getAllUsers();
        res.status(200).send(users);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.get('/me', [auth], async (req, res) => {
    try {
        let userId = req.currentUser.sub;
        let user = await userRepo.getUserById(userId);
        res.status(200).send(user);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.post('/', async (req, res) => {
    try {
        let user = mapRequestToUser(req.body);
        const { error } =
            createUserRequestValidationSchema.validate(user);

        if (error)
            throw error;
        let userCreated = await userRepo.createUser(user);
        res.status(201).send(userCreated);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
});

router.delete('/', [auth, admin], async (req, res) => {
    try {
        let userId = req.query.id;
        await userRepo.deleteUserById(userId);
        res.status(202).send({ userId });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete('/me', [auth], async (req, res) => {
    try {
        let userId = req.currentUser.sub;
        await userRepo.deleteUserById(userId);
        res.status(202).send({ userId });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.put('/me', [auth], async (req, res) => {
    try {
        let userId = req.currentUser.sub;
        let user = mapRequestToUser(req.body);
        const { error } = putUserRequestValidationSchema.validate(user);
        if (error)
            throw error;
        let updatedUser = await userRepo.updateUserById(userId, user);
        res.status(202).send(updatedUser);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.patch('/me', [auth], async (req, res) => {
    try {
        let userId = req.currentUser.sub;
        let user = mapRequestToUser(req.body);

        const { error } = patchUserRequestValidationSchema.validate(user);
        if (error)
            throw error;

        let patchedUser = await userRepo.patchUserById(userId, user);
        res.status(202).send(patchedUser);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;