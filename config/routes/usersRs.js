const validate = require('../../api/middleware/validation/validateMiddleware')
const schemas = require('../../api/middleware/validation/validateSchema')

const usersRs = {

  // for users
  'GET /getuser':  'users/Profile.index',
  'POST /ProfileRegis' : {
    path:'registrasi/UserProfile.index',
    middlewares:[validate(schemas.ProfileRegister)]
  },

  // vendor
  'POST /VendorUserRegis':{
    path:'registrasi/VendorRegis.userVendorRegis',
    middlewares:[validate(schemas.RegiterUserVendor)]
  },

  // fitur CURD AVATAR
  'GET /GetuserAvatar': 'uploads/UserAvatar.get',
  'POST /UploaduserAvatar' : 'uploads/UserAvatar.store',
  'PUT /UpdateuserAvatar' : 'uploads/UserAvatar.put',
  'DELETE /DeleteuserAvatar' : 'uploads/UserAvatar.destroy',

  // fitur CURD Identitas
  'GET /GetuserIdentitas': 'uploads/UserIdentitas.get',
  'POST /UploaduserIdentitas' : 'uploads/UserIdentitas.store',
  'PUT /UpdateuserIdentitas' : 'uploads/UserIdentitas.put',
  'DELETE /DeleteuserIdentitas' : 'uploads/UserIdentitas.destroy',

  // fitur CRUD LEGALITAS
  'GET /GetVendorLegalitas': 'uploads/VendorLegalitas.get',
  'POST /UploadVendorLegalitas' : 'uploads/VendorLegalitas.store',
  'PUT /UpdateVendorLegalitas' : 'uploads/VendorLegalitas.put',
  // 'DELETE /DeleteVendorLegalitas' : 'uploads/VendorLegalitas.destroy',

  // fitur CRUD SERTIFIKAT VENDOR
  'GET /VendorSertifikat/:image': 'uploads/VendorSertifikat.get',
  'POST /UploadVendorSertifikat' : 'uploads/VendorSertifikat.store',
	
};

module.exports = usersRs;
