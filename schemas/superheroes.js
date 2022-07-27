const Joi = require("joi");

const addSchema = Joi.object().keys({
  nickname: Joi.string()
    .min(3)
    .required()
    .error(
      new Error("Nickname is required and must have min length 3 characters.")
    ),
  real_name: Joi.string()
    .required()
    .min(2)
    .error(
      new Error("Real name is required and must have min length 2 characters.")
    ),
  origin_description: Joi.string()
    .required()
    .min(10)
    .error(
      new Error(
        "Description is required and must have min length 10 characters."
      )
    ),
  superpowers: Joi.string()
    .required()
    .min(5)
    .error(
      new Error(
        "Superpowers is required and must have min length 5 characters."
      )
    ),
  catch_phrase: Joi.string()
    .required()
    .min(3)
    .error(
      new Error(
        "Catch phrase is required and must have min length 3 characters."
      )
    ),
  images: Joi.array().max(9),
});

const updateSchema = Joi.object().keys({
  nickname: Joi.string()
    .min(3)
    .required()
    .error(
      new Error("Nickname is required and must have min length 3 characters.")
    ),
  real_name: Joi.string()
    .required()
    .min(2)
    .error(
      new Error("Real name is required and must have min length 2 characters.")
    ),
  origin_description: Joi.string()
    .required()
    .min(10)
    .error(
      new Error(
        "Description is required and must have min length 10 characters."
      )
    ),
  superpowers: Joi.string()
    .required()
    .min(5)
    .error(
      new Error(
        "Superpowers is required and must have min length 5 characters."
      )
    ),
  catch_phrase: Joi.string()
    .required()
    .min(3)
    .error(
      new Error(
        "Catch phrase is required and must have min length 3 characters."
      )
    ),
  images: Joi.array().max(6),
});

module.exports = {
  addSchema,
  updateSchema,
};
