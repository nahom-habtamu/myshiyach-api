const express = require('express');
const router = express.Router();

const mainCategoryRepo = require('../repositories/MainCategoryRepository');
const { mapRequestToMainCategory } = require('../utils/requestMapper');

const {
    createMainCategoryRequestValidationSchema,
    putMainCategoryRequestValidationSchema,
    patchMainCategoryRequestValidationSchema
} = require('../validation-schemas/MainCategoryRequestValidationSchema');

const auth = require('../middlewares/auth');
const { admin } = require('../middlewares/role');

router.get('/', [auth, admin], async (req, res) => {
    try {
        let mainCategories =
            await mainCategoryRepo.getAllMainCategories();
        res.status(200).send(mainCategories);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.get('/:id', [auth, admin], async (req, res) => {
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

router.post('/', [auth, admin], async (req, res) => {
    try {
        let mainCategory = mapRequestToMainCategory(req.body);
        const { error } =
            createMainCategoryRequestValidationSchema.validate(mainCategory);
        if (error)
            throw error;
        let createdSubCategory =
            await mainCategoryRepo.createMainCategory(mainCategory);
        res.status(201).send(createdSubCategory);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        let mainCategoryId = req.params.id;
        await mainCategoryRepo.deleteMainCategoryById(mainCategoryId);
        res.status(202).send({ mainCategoryId });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.put('/:id', [auth, admin], async (req, res) => {
    try {
        let mainCategoryId = req.params.id;
        let mainCategory = mapRequestToMainCategory(req.body);
        const { error } = putMainCategoryRequestValidationSchema
            .validate(mainCategory);
        if (error)
            throw error;
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

router.patch('/:id', [auth, admin], async (req, res) => {
    try {
        let mainCategoryId = req.params.id;
        let mainCategory = mapRequestToMainCategory(req.body);
        const { error } = patchMainCategoryRequestValidationSchema
            .validate(mainCategory);
        if (error)
            throw error;
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