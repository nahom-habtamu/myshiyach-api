const express = require('express');
const router = express.Router();

const productRepo = require('../repositories/ProductRepository');
const { mapRequestToProduct } = require('../utils/requestMapper');

router.get('/', async (req, res) => {
    try {
        let products = await productRepo.getAllProducts();
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

router.post('/', async (req, res) => {
    try {
        let product = mapRequestToProduct(req.body);
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
        let product = mapRequestToProduct(req.body);
        let patchedProduct = await productRepo.patchProductById(
            productId, product
        );
        res.status(202).send(patchedProduct);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;