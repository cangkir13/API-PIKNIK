const validate = require('../../api/middleware/validation/validateMiddleware')
const schemas = require('../../api/middleware/validation/validateSchema')

const usersRs = {

  'GET /getuser':  'users/Profile.index',
  'POST /ProfileRegis' : {
    path:'registrasi/UserProfile.index',
    middlewares:[validate(schemas.ProfileRegister)]
  }
	
};

module.exports = usersRs;
