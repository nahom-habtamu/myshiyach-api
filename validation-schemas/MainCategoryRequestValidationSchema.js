const Joi = require('joi');

const createMainCategoryRequestValidationSchema = Joi.object({
    title: Joi.string().required().min(3).max(50),
    subCategories: Joi.array().required().items(Joi.string()).min(1)
});

const putMainCategoryRequestValidationSchema = Joi.object({
    title: Joi.string().required().min(3).max(50),
    subCategories: Joi.array().required().items().min(1)
});

const patchMainCategoryRequestValidationSchema = Joi.object({
    title: Joi.string().min(3).max(50),
    subCategories: Joi.array().items().min(1)
});


module.exports = {
    createMainCategoryRequestValidationSchema,
    patchMainCategoryRequestValidationSchema,
    putMainCategoryRequestValidationSchema
};