import Joi from 'joi';

const orderSchema = Joi.object({
  products: Joi.array().items(Joi.number().strict()).min(1)
    .required()
    .messages({
      'array.base': '422|Products must be an array of numbers',
      'any.required': '400|Products is required',
      'array.min': '422|Products can\'t be empty',
    }),
});

export default orderSchema;