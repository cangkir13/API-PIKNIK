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

    add_detail_trip:Joi.object().keys({
        kode:Joi.string().required(),
        tgl_berangkat:Joi.string().required(),
        tgl_pulang:Joi.string().required(),
        kuota:Joi.number().required(),
        price:Joi.number().required(),
        start_point:Joi.string().required(),
        location:Joi.object().required().keys({
            provinsi:Joi.string().required(),
            kabupaten:Joi.string().required(),
            kecamatan:Joi.string().required(),
            kelurahan:Joi.string().required(),
            kodepos:Joi.number().required(),
        }),
    }),
}

module.exports = schemas