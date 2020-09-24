const moment = require('moment');
moment.locale('Indonesian')
const DateMin = moment().add({days:10}).format('YYYY/MM/DD');
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

    // trip schedule
    add_detail_trip:Joi.object().keys({
        kode:Joi.string().required(),
        tgl_berangkat: Joi.date().min(DateMin).required(),
        tgl_pulang:Joi.date().greater(Joi.ref('tgl_berangkat')).required(),
        close_order:Joi.date().less(Joi.ref('tgl_berangkat')).required(),
        kuota:Joi.number().required(),
        price:Joi.number().required(),
        start_point:Joi.string().required(),
        point_lat:Joi.number().required(),
        point_long:Joi.number().required(),
        terms_conditions:Joi.string().required(),
        location:Joi.object().required().keys({
            provinsi:Joi.string().required(),
            kabupaten:Joi.string().required(),
            kecamatan:Joi.string().required(),
            kelurahan:Joi.string().required(),
            kodepos:Joi.number().required(),
        }),
    }),

    add_Rundowns_trip:Joi.object().keys({
        code_detail:Joi.number().required(),
        judul_acara:Joi.string().required(),
        tgl_mulai:Joi.date().required(),
        tgl_akhir:Joi.date().greater(Joi.ref('tgl_mulai')).required(),
        keterangan:Joi.string().required(),
    }),

    edit_Rundowns_trip:Joi.object().keys({
        id:Joi.number().required(),
        judul_acara:Joi.string().required(),
        tgl_mulai:Joi.date().required(),
        tgl_akhir:Joi.date().greater(Joi.ref('tgl_mulai')).required(),
        keterangan:Joi.string().required(),
    }),
}

module.exports = schemas