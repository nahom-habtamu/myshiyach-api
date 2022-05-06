const Joi = require('joi');

const createAdminRequestValidationSchema = Joi.object({
    userName : Joi.string().required().max(50),
    password : Joi.string().required().max(50),
});

const putAdminRequestValidationSchema = Joi.object({
    userName : Joi.string().required().max(50),
});

const patchAdminRequestValidationSchema = Joi.object({
    userName : Joi.string().max(50),
});

module.exports = {
    createAdminRequestValidationSchema,
    patchAdminRequestValidationSchema,
    putAdminRequestValidationSchema
};