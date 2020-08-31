const Joi = require('@hapi/joi');
const helper = require('../../helper/')
const validateMiddleware = (schema, property) => { 
  return (req, res, next) => { 
  const { error } = Joi.validate(req.body, schema); 
  const valid = error == null; 

  if (valid) { 
    next(); 
  } else { 
    const { details } = error; 
    const message = details.map(i => i.message).join(',');

    res.status(422).json( helper.globalRes(422, message) ) } 
  } 
} 
module.exports = validateMiddleware;