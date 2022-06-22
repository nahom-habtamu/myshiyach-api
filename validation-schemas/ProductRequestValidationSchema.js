const Joi = require('joi');

const createProductRequestValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    mainCategory: Joi.string().required().length(24),
    subCategory: Joi.string().required().length(24),
    brand: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    createdBy: Joi.string().required(),
    createdAt: Joi.string().required(),
    productImages: Joi.array().min(1).required(),
    other: Joi.object(),
});

const putProductRequestValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    mainCategory: Joi.string().required().length(24),
    subCategory: Joi.string().required().length(24),
    brand: Joi.string().required(),
    other: Joi.object(), brand: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    createdBy: Joi.string().required(),
    createdAt: Joi.string().required(),
    productImages: Joi.array().min(1).required(),
    other: Joi.object(),
});

const patchProductRequestValidationSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    mainCategory: Joi.string().length(24),
    subCategory: Joi.string().length(24),
    brand: Joi.string(),
    state: Joi.string(),
    city: Joi.string(),
    createdBy: Joi.string().allow(""),
    createdAt: Joi.string().allow(""),
    productImages: Joi.array().min(1),
    other: Joi.object(),
});

module.exports = {
    createProductRequestValidationSchema,
    patchProductRequestValidationSchema,
    putProductRequestValidationSchema
};