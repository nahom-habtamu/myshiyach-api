const Joi = require('joi');

const createMainCategoryRequestValidationSchema = Joi.object({
    title: Joi.string().required().min(3).max(50),
    subCategories: Joi.array().required().items(Joi.string()).min(1),
    requiredFields: Joi.array()
});

const putMainCategoryRequestValidationSchema = Joi.object({
    title: Joi.string().required().min(3).max(50),
    subCategories: Joi.array().required().items().min(1),
    requiredFields: Joi.array()
});

const patchMainCategoryRequestValidationSchema = Joi.object({
    title: Joi.string().min(3).max(50),
    subCategories: Joi.array().items().min(1),
    requiredFields: Joi.array()
});


module.exports = {
    createMainCategoryRequestValidationSchema,
    patchMainCategoryRequestValidationSchema,
    putMainCategoryRequestValidationSchema
};