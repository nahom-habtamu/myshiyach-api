const express = require('express');
const router = express.Router();

const userRepo = require('../repositories/UserRepository');
const { mapRequestToUser } = require('../utils/requestMapper');

const {
    createUserRequestValidationSchema,
    putUserRequestValidationSchema,
    patchUserRequestValidationSchema,
    changePasswordRequestValidationSchema
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

router.get('/:id', [auth], async (req, res) => {
    try {
        let userId = req.params.id;
        let user = await userRepo.getUserById(userId);
        res.status(200).send(user);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.post('/changePassword', async (req, res) => {
    try {
        const { error } =
            changePasswordRequestValidationSchema.validate(req.body);
        if (error)
            throw error;
        await userRepo.changeUserPassword(req.body);
        res.status(201).send();
    }
    catch (error) {
        res.status(400).send({ error: error.message });
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
        res.status(400).send({ error: error.message });
    }
});

router.delete('/:id', [auth], async (req, res) => {
    try {
        let userId = req.params.id;
        await userRepo.deleteUserById(userId);
        res.status(202).send({ userId });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.put('/:id', [auth], async (req, res) => {
    try {
        let userId = req.params.id;
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

router.patch('/:id', [auth], async (req, res) => {
    try {
        let userId = req.params.id;
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