const validate = require('../../api/middleware/validation/validateMiddleware')
const schemas = require('../../api/middleware/validation/validateSchemaProduct')

const ContentRoute = {
  // router for image show
  'GET /product/' :'product_trip.getContent',

}  

module.exports = ContentRoute