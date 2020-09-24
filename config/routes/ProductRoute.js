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

  /* add list of fasility */
  'POST /addFasility': {
    path:'product_vendor/Product_facility.StoreFasilitas',
    middlewares:[validate(schemas.add_fasilitas)]
  },

  /* add fasilitas of product/trip */
  'POST /addFasilityTrip': {
    path:'product_vendor/Product_facility.StoreFasilitasProduct',
    middlewares:[validate(schemas.add_fasilitas_trip)]
  },

  'POST /addDetailTrip': {
    path:'product_vendor/Product_detail.StDetailProd',
    middlewares:[validate(schemas.add_detail_trip)]
  },

  'POST /addRundowns' : {
    path:'product_vendor/Product_itinerary.createRundowns',
    middlewares:[validate(schemas.add_Rundowns_trip)]
  },

  'PUT /editRundowns' : {
    path:'product_vendor/Product_itinerary.updateRundowns',
    middlewares:[validate(schemas.edit_Rundowns_trip)]
  },

  'GET /DataTrip': {
    path:'product_vendor/Product_detail.GetDetailProd'
  },

	
};

module.exports = ProductRoute;
