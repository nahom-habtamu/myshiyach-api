const Joi = require('joi');

const createSubCategoryRequestValidationSchema = Joi.object({
    title: Joi.string().required(),
    additionalData: Joi.array().items(Joi.string())
});

const putSubCategoryRequestValidationSchema = Joi.object({
    title: Joi.string().required(),
    additionalData: Joi.array().items(Joi.string())
});

const patchSubCategoryRequestValidationSchema = Joi.object({
    title: Joi.string(),
    additionalData: Joi.array().items(Joi.string())
})

module.exports = {
    createSubCategoryRequestValidationSchema,
    patchSubCategoryRequestValidationSchema,
    putSubCategoryRequestValidationSchema
}