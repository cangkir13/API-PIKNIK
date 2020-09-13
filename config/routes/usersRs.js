const validate = require('../../api/middleware/validation/validateMiddleware')
const schemas = require('../../api/middleware/validation/validateSchema')

const usersRs = {

  'GET /getuser':  'users/Profile.index',
  'POST /ProfileRegis' : {
    path:'registrasi/UserProfile.index',
    middlewares:[validate(schemas.ProfileRegister)]
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
	
};

module.exports = usersRs;
