const validate = require('../../api/middleware/validation/validateMiddlewareQuery')
const schemas = require('../../api/middleware/validation/validateSchemaQueryTrip')

const ContentRoute = {
  // router for image show
  // 'GET /product/' :'product_trip.getContent',
  'GET /destination/' :'product_trip.TripByDest',
  'GET /wisata/search' : {
    path:'product_trip.TripWisata',
    middlewares:[validate(schemas.wisataSearch)]
  }

}  

module.exports = ContentRoute