const validate = require('../../api/middleware/validation/validateMiddleware')
const schemas = require('../../api/middleware/validation/validateSchemaProduct')

const ImgRoute = {
  // router for image show
  'GET /ImgProduct/:img' :'ProductImg.get',
  'GET /avatar/:img' :'UserAvatar.getAvatar',
  'GET /indentitas/:img' :'UserIdentitas.getidentitas',
  'GET /legalitas/:img' :'VendorLegalitas.getlegalitas',
  'GET /sertifikat/:img' :'VendorSertifikat.get',

}  

module.exports = ImgRoute