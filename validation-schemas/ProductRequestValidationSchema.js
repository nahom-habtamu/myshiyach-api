const Joi = require('joi');

const createProductRequestValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    mainCategory: Joi.string().required().length(24),
    subCategory: Joi.string().required().length(24),
    city: Joi.string().required(),
    contactPhone: Joi.string().required(),
    createdBy: Joi.string().required(),
    createdAt: Joi.date().required(),
    refreshedAt: Joi.date().required(),
    productImages: Joi.array().min(1).required(),
    productDetail: Joi.object(),
});

const putProductRequestValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    mainCategory: Joi.string().required().length(24),
    subCategory: Joi.string().required().length(24),
    city: Joi.string().required(),
    contactPhone: Joi.string().required(),
    createdBy: Joi.string().allow(""),
    createdAt: Joi.date(),
    refreshedAt: Joi.date(),
    productImages: Joi.array().min(1).required(),
    productDetail: Joi.object(),
});

const patchProductRequestValidationSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    mainCategory: Joi.string().length(24),
    subCategory: Joi.string().length(24),
    city: Joi.string(),
    contactPhone: Joi.string(),
    createdBy: Joi.string().allow(""),
    createdAt: Joi.date(),
    refreshedAt: Joi.date(),
    productImages: Joi.array().min(1),
    productDetail: Joi.object(),
});

module.exports = {
    createProductRequestValidationSchema,
    patchProductRequestValidationSchema,
    putProductRequestValidationSchema
};