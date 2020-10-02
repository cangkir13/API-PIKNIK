const moment = require('moment');
moment.locale('Indonesian')
const DateMin = moment().add({days:1}).format('YYYY-MM-DD');
const Joi = require('@hapi/joi')

const schemas = { 
    wisataSearch:Joi.object().keys({
        d:Joi.string().allow(''),
        date:Joi.date().min(DateMin).allow(''),
    }),
    
    

}

module.exports = schemas