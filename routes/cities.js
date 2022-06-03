const express = require('express');

const cityRepo = require('../repositories/CityRepository');

const router = express.Router();

router.get('/', async (_, res) => {
    try {
        let cities = cityRepo.getAllRegisteredCities();
        res.status(200).send(cities);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});


module.exports = router;