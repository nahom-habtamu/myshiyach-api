const Joi = require('joi');

const createUserRequestValidationSchema = Joi.object({
    fullName : Joi.string().required().max(50).min(5),
    email : Joi.string().required().max(50).min(5),
    password : Joi.string().required().max(255).min(6),
    phoneNumber : Joi.string().required().max(13).min(10),
    profilePicture : Joi.string().required(),
});

const putUserRequestValidationSchema = Joi.object({
    fullName : Joi.string().required().max(50).min(5),
    email : Joi.string().required().max(50).min(5),
    phoneNumber : Joi.string().required().max(13).min(10),
    profilePicture : Joi.string().required(),
});

const patchUserRequestValidationSchema = Joi.object({
    fullName : Joi.string().max(50).min(5),
    email : Joi.string().max(50).min(5),
    phoneNumber : Joi.string().max(13).min(10),
    profilePicture : Joi.string(),
});


module.exports = {
    createUserRequestValidationSchema,
    putUserRequestValidationSchema,
    patchUserRequestValidationSchema
};