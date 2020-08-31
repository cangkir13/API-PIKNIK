const Joi = require('@hapi/joi');
const { join } = require('core-js/fn/array');

const schemas = { 
  
  login:Joi.object().keys({
    email :Joi.string() .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().required(),
  }),

  registrasi:Joi.object().keys({
    email :Joi.string() .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().required(),
    password2:Joi.string().required()
  }),

  GetKabupaten:Joi.object().keys({
    provinsi:Joi.string().required()
  }),

  GetKecamatan:Joi.object().keys({
    provinsi:Joi.string().required(),
    kabupaten:Joi.string().required(),
  }),

  GetKelurahan:Joi.object().keys({
    provinsi:Joi.string().required(),
    kabupaten:Joi.string().required(),
    kecamatan:Joi.string().required(),
  }),

  GetKodepos:Joi.object().keys({
    provinsi:Joi.string().required(),
    kabupaten:Joi.string().required(),
    kecamatan:Joi.string().required(),
    kelurahan:Joi.string().required(),
  }),

  ProfileRegister:Joi.object().keys({
    avatar:Joi.string().required(),
    fullname:Joi.string().required(),
    tgl_lahir:Joi.string().required(),
    alamat:Joi.string().required(),
    no_telp:Joi.number().required(),
    nik:Joi.number().required(),
    foto_ktp:Joi.string().required(),
    location:Joi.object().required().keys({
      provinsi:Joi.string().required(),
      kabupaten:Joi.string().required(),
      kecamatan:Joi.string().required(),
      kelurahan:Joi.string().required(),
      kodepos:Joi.number().required(),
    })
  })

  
  // define all the other schemas below 
}; 
module.exports = schemas;