const validate = require('../../api/middleware/validation/validateMiddleware')
const schemas = require('../../api/middleware/validation/validateSchema')

const userRoutes = {

//   'POST /register':  {
// 					    path: 'UserController.register',
// 					    middlewares: [validate(schemas.createUser)],
// 					 },
	'POST /login':{
		path: 'Login.index',
		middlewares:[validate(schemas.login)]
	},
	'POST /register':{
		path: 'registrasi/UserRegis.index',
		middlewares:[validate(schemas.registrasi)]
	},

	'GET /getProvinsi': 'location/LocationCnt.GetProvinsi',

	'GET /getKabupaten': {
		path: 'location/LocationCnt.GetKab',
		middlewares:[validate(schemas.GetKabupaten)]
	},
	
	'GET /getKecamatan': {
		path:'location/LocationCnt.GetKec',
		middlewares:[validate(schemas.GetKecamatan)]
	},
	'GET /getKelurahan':{
		path:'location/LocationCnt.GetKel',
		middlewares:[validate(schemas.GetKelurahan)]
	},
	'GET /getKodepos':{
		path:'location/LocationCnt.GetPos',
		middlewares:[validate(schemas.GetKodepos)]
	},

	'POST /uploadFile' : 'UploadCnt.doUpload',
	'GET /open/:image':'UploadCnt.openFile',

	'POST /DEVuploadAvatar' : 'UploadCnt.uploadAvatar',

	
};

module.exports = userRoutes;
