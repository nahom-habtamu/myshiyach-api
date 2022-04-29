const express = require('express');
const router = express.Router();

const mainCategoryRepo = require('../repositories/MainCategoryRepository');
const { mapRequestToMainCategory } = require('../utils/requestMapper');

router.get('/', async (req, res) => {
    try {
        let mainCategories =
            await mainCategoryRepo.getAllMainCategories();
        res.status(200).send(mainCategories);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.get('/:id', async (req, res) => {
    try {
        let mainCategoryId = req.params.id;
        let mainCategory =
            await mainCategoryRepo.getMainCategoryById(mainCategoryId);
        res.status(200).send(mainCategory);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.post('/', async (req, res) => {
    try {
        let mainCategory = mapRequestToMainCategory(req.body);
        let createdSubCategory =
            await mainCategoryRepo.createMainCategory(mainCategory);
        res.status(201).send(createdSubCategory);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let mainCategoryId = req.params.id;
        await mainCategoryRepo.deleteMainCategoryById(mainCategoryId);
        res.status(202).send({ mainCategoryId });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        let mainCategoryId = req.params.id;
        let mainCategory = mapRequestToMainCategory(req.body);
        let updatedMainCategory =
            await mainCategoryRepo.updateMainCategoryById(
                mainCategoryId, mainCategory
            );
        res.status(202).send(updatedMainCategory);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        let mainCategoryId = req.params.id;
        let mainCategory = mapRequestToMainCategory(req.body);
        let patchedMainCategory =
            await mainCategoryRepo.patchMainCategoryById(
                mainCategoryId, mainCategory
            );
        res.status(202).send(patchedMainCategory);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;