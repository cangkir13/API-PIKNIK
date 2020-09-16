const validate = require('../../api/middleware/validation/validateMiddleware')
const schemas = require('../../api/middleware/validation/validateSchemaProduct')

const ProductRoute = {

  // for users
  'POST /createTrip' : {
    path:'product_vendor/Product_trip.store',
    middlewares:[validate(schemas.create_product_vendor)]
  },

  'PUT /updateTrip' : {
    path:'product_vendor/Product_trip.updateProduct',
    middlewares:[validate(schemas.update_product_vendor)]
  },

  'POST /addKategoriTrip': {
    path:'product_vendor/Product_trip.storeKategori',
    middlewares:[validate(schemas.add_kategori_trip)]
  },

  /* middle facility */
  'GET /GetFasility': {
    path:'product_vendor/Product_facility.getFaslitas'
  },

  'POST /addFasility': {
    path:'product_vendor/Product_facility.StoreFasilitas',
    middlewares:[validate(schemas.add_fasilitas)]
  },

  'POST /addFasilityTrip': {
    path:'product_vendor/Product_facility.StoreFasilitasProduct',
    middlewares:[validate(schemas.add_fasilitas_trip)]
  },

	
};

module.exports = ProductRoute;
