const express = require('express');
const router = express.Router();

const authRepo = require('../repositories/AuthRepository');

router.post('/', async (req, res) => {
    try {
        let authRequest = {
            userName: req.body.userName,
            password: req.body.password,
        }
        const token = await authRepo.findUserAndGenerateToken(authRequest);
        res.status(200).send({ token });

    } catch (error) {
        res.status(400).send({ error: error.message })
    }
});

module.exports = router;