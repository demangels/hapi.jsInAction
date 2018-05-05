const Joi = require('joi');
const product = {
  id: 5489,
  name: 'Trouser press',
  price: {
    value: 34.88,
    currency: 'GBP'
  }
};
const schema = {
  id: Joi.number().max(4000),
  name: Joi.string(),
  price: {
    value: Joi.number(),
    currency: Joi.string().valid(['USD', 'EUR'])
  }
};
Joi.validate(product, schema, {abortEarly: false}, (err, date) => {
  console.log(JSON.stringify(err.details, null, 2));
});