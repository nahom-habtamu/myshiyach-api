const Joi = require('joi');

const changePasswordRequestValidationSchema = Joi.object({
    phoneNumber: Joi.string().required(),
    password: Joi.string().required().max(255).min(6),
});

const createUserRequestValidationSchema = Joi.object({
    fullName: Joi.string().required().max(50).min(5),
    password: Joi.string().required().max(255).min(6),
    phoneNumber: Joi.string().required(),
    email: Joi.string().min(0),
});

const putUserRequestValidationSchema = Joi.object({
    fullName: Joi.string().required().max(50).min(5),
    email: Joi.string(),
    phoneNumber: Joi.string().required(),
});

const patchUserRequestValidationSchema = Joi.object({
    fullName: Joi.string().max(50).min(5),
    email: Joi.string().max(50).min(5),
    phoneNumber: Joi.string(),
});


module.exports = {
    createUserRequestValidationSchema,
    putUserRequestValidationSchema,
    patchUserRequestValidationSchema,
    changePasswordRequestValidationSchema
};