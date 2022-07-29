const Joi = require("joi");

const addSchema = Joi.object().keys({
  nickname: Joi.string()
    .min(3)
    .required()
    .error(
      new Error("nickname is required and must have minimum 3 characters.")
    ),
  real_name: Joi.string()
    .required()
    .min(2)
    .error(
      new Error("real_name is required and must have minimum 2 characters.")
    ),
  origin_description: Joi.string()
    .required()
    .min(10)
    .max(120)
    .error(
      new Error(
        "origin_description is required and must have minimum 10 characters and maximum 120."
      )
    ),
  superpowers: Joi.string()
    .required()
    .min(5)
    .error(
      new Error(
        "superpowers is required and must have minimum 5 characters."
      )
    ),
  catch_phrase: Joi.string()
    .required()
    .min(3)
    .error(
      new Error(
        "catch_phrase is required and must have minimum 3 characters."
      )
    ),
  images: Joi.array().max(6),
});

const updateSchema = Joi.object().keys({
  nickname: Joi.string()
    .min(3)
    .required()
    .error(
      new Error("nickname field is required and must have at least 3 characters.")
    ),
  real_name: Joi.string()
    .required()
    .min(2)
    .error(
      new Error("real_name field is required and must have at least 2 characters.")
    ),
  origin_description: Joi.string()
    .required()
    .min(10)
    .max(120)
    .error(
      new Error(
        "origin_description field is required and must have at least 10 characters."
      )
    ),
  superpowers: Joi.string()
    .required()
    .min(5)
    .error(
      new Error(
        "superpowers field is required and must have at least 5 characters."
      )
    ),
  catch_phrase: Joi.string()
    .required()
    .min(3)
    .error(
      new Error(
        "catch_phrase phrase is required and must have at least 3 characters."
      )
    ),
  images: Joi.array().max(6),
});

module.exports = {
  addSchema,
  updateSchema,
};
