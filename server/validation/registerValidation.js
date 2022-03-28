const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(255).required(),
  lastName: Joi.string().min(2).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  phoneNumber: Joi.number().min(8).required(),
  password: Joi.string().min(6).max(255).required(),
});

module.exports = registerSchema;
