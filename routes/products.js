const express = require('express');
const router = express.Router();

const productRepo = require('../repositories/ProductRepository');
const { mapRequestToProduct } = require('../utils/requestMapper');

const {
    createProductRequestValidationSchema,
    patchProductRequestValidationSchema,
    putProductRequestValidationSchema
} = require('../validation-schemas/ProductRequestValidationSchema');

const auth = require('../middlewares/auth');
const { user } = require('../middlewares/role');

router.get('/', async (req, res) => {
    try {

        let createdBy = req.query.createdBy;
        let products = await productRepo.getAllProducts();
        if (createdBy != null) {
            products = products.filter(p => p.createdBy === createdBy);
        }
        res.status(200).send(products);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.get('/:id', async (req, res) => {
    try {
        let productId = req.params.id;
        let product = await productRepo.getProductById(productId);
        res.status(200).send(product);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.post('/', [auth, user], async (req, res) => {
    try {
        let userId = req.currentUser.sub;
        let createdAt = buildCreatedAtTime();

        let product = mapRequestToProduct(req.body, createdAt, userId);
        const { error } = createProductRequestValidationSchema
            .validate(product)
        if (error)
            throw error;
        let productCreated = await productRepo.createProduct(product);
        res.status(201).send(productCreated);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let productId = req.params.id;
        await productRepo.deleteProductById(productId);
        res.status(202).send({ productId });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        let productId = req.params.id;
        let product = mapRequestToProduct(req.body);

        const { error } = putProductRequestValidationSchema
            .validate(product);
        if (error)
            throw error;

        let updatedProduct = await productRepo.updateProductById(
            productId, product
        );
        res.status(202).send(updatedProduct);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        let productId = req.params.id;
        let product = mapRequestToProduct(req.body, "", "");
        const { error } = patchProductRequestValidationSchema
            .validate(product);
        if (error)
            throw error;

        let patchedProduct = await productRepo.patchProductById(
            productId, product
        );
        res.status(202).send(patchedProduct);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.patch('/refresh/:id', async (req, res) => {
    try {
        let productId = req.params.id;
        let patchedProduct = await productRepo.refreshProduct(
            productId
        );
        res.status(202).send(patchedProduct);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;