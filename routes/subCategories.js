const express = require('express');
const router = express.Router();

const subCategoryRepo = require('../repositories/SubCategoryRepository');
const mainCategoryRepo = require('../repositories/MainCategoryRepository');
const { mapRequestToSubCategory } = require('../utils/requestMapper');

const {
    createSubCategoryRequestValidationSchema,
    putSubCategoryRequestValidationSchema,
    patchSubCategoryRequestValidationSchema
} = require('../validation-schemas/SubCategoryRequestValidationSchema');

const auth = require('../middlewares/auth');
const { admin } = require('../middlewares/role');

router.get('/', [auth, admin], async (req, res) => {
    try {
        let subCategories = await subCategoryRepo.getAllSubCategories();
        res.status(200).send(subCategories);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.get('/:id', [auth, admin], async (req, res) => {
    try {
        let subCategoryId = req.params.id;
        let subCategory =
            await subCategoryRepo.getSubCategoryById(subCategoryId);
        res.status(200).send(subCategory);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.get('/', [auth, admin], async (req, res) => {
    try {
        let mainCategoryId = req.query.mainCategoryId;
        let mainCategory = await mainCategoryRepo.getMainCategoryById(mainCategoryId);

        let subCategoriesByMainCategories = [];

        mainCategory.subCategories.forEach(async s => {
            let subCategory = await subCategoryRepo.getSubCategoryById(s);
            subCategoriesByMainCategories.push(subCategory);
        });

        res.status(200).send(subCategoriesByMainCategories);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});


router.post('/', [auth, admin], async (req, res) => {
    try {
        let subCategory = mapRequestToSubCategory(req.body);
        const { error } =
            createSubCategoryRequestValidationSchema.validate(subCategory);
        if (error)
            throw error;
        let subCategoryCreated =
            await subCategoryRepo.createSubCategory(subCategory);
        res.status(201).send(subCategoryCreated);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        let subCategoryId = req.params.id;
        await subCategoryRepo.deleteSubCategoryById(subCategoryId);
        res.status(202).send({ subCategoryId });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.put('/:id', [auth, admin], async (req, res) => {
    try {
        let subCategoryId = req.params.id;
        let subCategory = mapRequestToSubCategory(req.body);

        const { error } =
            putSubCategoryRequestValidationSchema.validate(subCategory);
        if (error)
            throw error;
        let updatedSubCategory = await subCategoryRepo.updateSubCategoryById(
            subCategoryId, subCategory
        );
        res.status(202).send(updatedSubCategory);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.patch('/:id', [auth, admin], async (req, res) => {
    try {
        let subCategoryId = req.params.id;
        let subCategory = mapRequestToSubCategory(req.body);
        const { error } =
            patchSubCategoryRequestValidationSchema.validate(subCategory);
        if (error)
            throw error;
        let patchedSubCategory = await subCategoryRepo.patchSubCategoryById(
            subCategoryId, subCategory
        );
        res.status(202).send(patchedSubCategory);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;