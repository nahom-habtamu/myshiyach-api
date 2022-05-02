const Joi = require('joi');

const createProductRequestValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    mainCategory: Joi.string().required().length(24),
    subCategory: Joi.string().required().length(24),
    brand: Joi.string().required(),
    other: Joi.object(),
});

const putProductRequestValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    mainCategory: Joi.string().required().length(24),
    subCategory: Joi.string().required().length(24),
    brand: Joi.string().required(),
    other: Joi.object(),
});

const patchProductRequestValidationSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    mainCategory: Joi.string().length(24),
    subCategory: Joi.string().length(24),
    brand: Joi.string(),
    other: Joi.object(),
});

module.exports = {
    createProductRequestValidationSchema,
    patchProductRequestValidationSchema,
    putProductRequestValidationSchema
};