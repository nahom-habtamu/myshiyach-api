const Joi = require('joi');

const createSubCategoryRequestValidationSchema = Joi.object({
    title: Joi.string().required(),
});

const putSubCategoryRequestValidationSchema = Joi.object({
    title: Joi.string().required(),
});

const patchSubCategoryRequestValidationSchema = Joi.object({
    title: Joi.string(),
})

module.exports = {
    createSubCategoryRequestValidationSchema,
    patchSubCategoryRequestValidationSchema,
    putSubCategoryRequestValidationSchema
}