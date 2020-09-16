const Joi = require('@hapi/joi')

const schemas = { 
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

    add_fasilitas:Joi.object().keys({
        fasilitas:Joi.array().required()
    }),

    add_fasilitas_trip:Joi.object().keys({
        kode:Joi.string().required(),
        fasilitas:Joi.array().required()
    }),
}

module.exports = schemas