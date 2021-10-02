const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBob = {
  body: Joi.object().keys({
    name: Joi.string().required()
  }),
};

const getBobs = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBob = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateBob = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
    })
    .min(1),
};

const deleteBob = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createBob,
  getBobs,
  getBob,
  updateBob,
  deleteBob,
};
