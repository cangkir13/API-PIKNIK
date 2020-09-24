const moment = require('moment');
const Joi = require('@hapi/joi');
const schemas = require('../validation/validateSchemaProduct');

const valDateAcaraAdd = (body) => {
/**
     * cek datetime of acara
     * @argument object
     * @argument {body.tgl_berangkat, body.tgl_pulang}
     * @argument {body.tgl_mulai, body.tgl_akhir}
     */

    let formtTglMulaiAcara = moment(body.tgl_mulai, 'YYYY/MM/DD HH:mm', true);
    let formtTglAkhirAcara = moment(body.tgl_akhir, 'YYYY/MM/DD HH:mm', true);
    
    if (formtTglMulaiAcara.isValid() === false || formtTglAkhirAcara.isValid() === false) {
        return {status: false, msg: "the format of tgl_berangkat / tgl_pulang must be YYYY/MM/DD HH:mm"}
    }

    // validate with Joi schemas data 
    const schema = Joi.object().keys({
        tgl_berangkat:Joi.date(),
        tgl_pulang:Joi.date(),
        tgl_mulai:Joi.date().greater(Joi.ref('tgl_berangkat')), // must grather than berangkat
        tgl_akhir:Joi.date().less(Joi.ref('tgl_pulang')), // must less than pulang

        judul_acara:Joi.allow(''), // just added
        keterangan:Joi.allow(''), // just added
        code_detail:Joi.allow(''), // just added
    })

    let {error} = Joi.validate(body, schema)
    let valid = error === null;
    /* cek any data arror */
    if(!valid){
        let {details} = error
        let message = details.map(i => i.message).join(',')
        return {
            status:false,
            msg:message,
        }
    }

    return {status:true}
}

const valDateAcaraEdit = (body) => {

    /**
     * cek datetime of acara
     * @argument object
     * @argument {body.tgl_berangkat, body.tgl_pulang}
     * @argument {body.tgl_mulai, body.tgl_akhir}
     */

    let formtTglMulaiAcara = moment(body.tgl_mulai, 'YYYY/MM/DD HH:mm', true);
    let formtTglAkhirAcara = moment(body.tgl_akhir, 'YYYY/MM/DD HH:mm', true);
    
    if (formtTglMulaiAcara.isValid() === false || formtTglAkhirAcara.isValid() === false) {
        return {status: false, msg: "the format of tgl_berangkat / tgl_pulang must be YYYY/MM/DD HH:mm"}
    }

    // validate with Joi data 
    const schema = Joi.object().keys({
        tgl_berangkat:Joi.date(),
        tgl_pulang:Joi.date(),
        tgl_mulai:Joi.date().greater(Joi.ref('tgl_berangkat')),
        tgl_akhir:Joi.date().less(Joi.ref('tgl_pulang')),
        
        id:Joi.allow(''), // just added
        keterangan:Joi.allow(''), // just added
        judul_acara:Joi.allow(''), // just added
        
    })

    let {error} = Joi.validate(body, schema)
    let valid = error === null;
    
    if(!valid){
        let {details} = error
        let message = details.map(i => i.message).join(',')
        return {
            status:false,
            msg:message,
        }
    }

    return {status:true}
}
// module.exports = validate

module.exports = (body, action) => {
    switch (action) {
        case 'add':
            let formatDateBegin =  valDateAcaraAdd(body)
            if (formatDateBegin.status == false) 
                return formatDateBegin

            return {status:true}        
        case 'edit':
            let formatDate =  valDateAcaraEdit(body)
            if (formatDate.status == false) 
                return formatDate
                
            return {status:true}        

        default:
            return {status:false, msg:"NOt found flag"}    
    }
    
}
    