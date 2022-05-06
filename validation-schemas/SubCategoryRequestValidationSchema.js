const Joi = require('joi');

const createSubCategoryRequestValidationSchema = Joi.object({
    title: Joi.string().required(),
    additionalData: Joi.array().items(Joi.string()).min(1).required()
});

const putSubCategoryRequestValidationSchema = Joi.object({
    title: Joi.string().required(),
    additionalData: Joi.array().items(Joi.string()).min(1).required()
});

const patchSubCategoryRequestValidationSchema = Joi.object({
    title: Joi.string(),
    additionalData: Joi.array().items(Joi.string()).min(1)
})

module.exports = {
    createSubCategoryRequestValidationSchema,
    patchSubCategoryRequestValidationSchema,
    putSubCategoryRequestValidationSchema
}