const Joi = require('@hapi/joi')

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
    fullname:Joi.string().required(),
    tgl_lahir:Joi.string().required(),
    alamat:Joi.string().required(),
    no_telp:Joi.number().required(),
    nik:Joi.string().required(),
    idnegara:Joi.number().required(),
    country:Joi.string().allow(''),
    state:Joi.string().allow(''),
    location:Joi.object().allow('').keys({
      provinsi:Joi.string().allow(''),
      kabupaten:Joi.string().allow(''),
      kecamatan:Joi.string().allow(''),
      kelurahan:Joi.string().allow(''),
      kodepos:Joi.number().allow(''),
    })
  }),

  RegiterUserVendor:Joi.object().keys({
    nama_usaha:Joi.string().required(),
    alamat_usaha:Joi.string().required(),
    agree_term:Joi.number().max(1).required(),
    bahasa:Joi.array().required()
  }),

  create_product_vendor:Joi.object().keys({
    name_piknik:Joi.string().required(),
    keterangan:Joi.string().required(),
    idkategori:Joi.array().required(),
  }),

  update_product_vendor:Joi.object().keys({
    kode:Joi.string().required(),
    name_piknik:Joi.string().required(),
    keterangan:Joi.string().required(),
  }),

  add_kategori_trip:Joi.object().keys({
    kode:Joi.string().required(),
    idkategori:Joi.array().required(),
  }),

  
  // define all the other schemas below 
}; 
module.exports = schemas;