const express = require('express');
const router = express.Router();

const userRepo = require('../repositories/UsersRepository');
const { mapRequestToUser } = require('../utils/requestMapper');

const { 
    createUserRequestValidationSchema,
    putUserRequestValidationSchema,
    patchUserRequestValidationSchema
} = require('../validation-schemas/UserRequestValidationSchema');

router.get('/', async (req, res) => {
    try {
        let users = await userRepo.getAllUsers();
        res.status(200).send(users);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.get('/:id', async (req, res) => {
    try {
        let userId = req.params.id;
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

        if(error) 
            throw error;
        let userCreated = await userRepo.createUser(user);
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
        await userRepo.deleteUserById(userId);
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
        const { error } = putUserRequestValidationSchema.validate(user);
        if(error)
            throw error;            
        let updatedUser = await userRepo.updateUserById(userId, user);
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

        const { error } = patchUserRequestValidationSchema.validate(user);
        if(error)
            throw error;

        let patchedUser = await userRepo.patchUserById(userId, user);
        res.status(202).send(patchedUser);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;