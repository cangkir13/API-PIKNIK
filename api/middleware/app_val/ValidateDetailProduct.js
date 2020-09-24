const masterLoc = require('../../models/Area');
const moment = require('moment');
const todayDate = moment(Date.now()).format('YYYY/MM/DD');

const validateTGLForm = (body) => {
    
    // console.log(!body.close_order );
    if (body.close_order) {
        // console.log("ada", true );
        let formtClose = moment(body.close_order, 'YYYY/MM/DD HH:mm', true);
        if (formtClose.isValid() === false) {
            return {status: false, msg: "the format of close_order must be YYYY/MM/DD HH:mm"}
        }
    }

    let formtTglBrkt = moment(body.tgl_berangkat, 'YYYY/MM/DD HH:mm', true);
    let formtTglPlg = moment(body.tgl_pulang, 'YYYY/MM/DD HH:mm', true);
    
    if (formtTglBrkt.isValid() === false || formtTglPlg.isValid() === false) {
        return {status: false, msg: "the format of tgl_berangkat / tgl_pulang must be YYYY/MM/DD HH:mm"}
    }

    /* cek tgl_berangakat > tgl_pulang */
    let isAfterPlg = moment(body.tgl_pulang, 'YYYY/MM/DD HH:mm').isAfter(moment(body.tgl_berangkat, 'YYYY/MM/DD HH:mm' ))

    if (!isAfterPlg ) {
        return {status:false, msg:"the date of tgl_pulang must be greater than tgl_berangkat"}
    }

    return {status:true}
}

const validate_area = async(location) => {
    // return location
    return await masterLoc.findOne({
        where:location
    })
}

const validate = async(body) => {

    if (body.tgl_berangkat || body.tgl_pulang) {
        let formatDate = validateTGLForm(body)
        if (formatDate.status === false) {
            return formatDate
        }
    }
    
    if (body.kuota > 20) {
        return {status:false, msg:"Kuota mush be <= 20"}
    }

    if (body.location) {
        let dataArea = await validate_area(body.location)
        if(!dataArea){
            return {status:false, msg:'Location not found'}
        }
        return {status:true, data:dataArea}
    }

    // return {status:true, data:'data bersih'}
    // return {
    //     todayDate,
    //     tglBrkt:tglSplitBrgkt[0],
    //     tglPlg:tglSplitPlg[0],
    // }
    // if(body.tgl_berangkat < todays){
    //     return {status:false, msg:"the date of departure is at least 10 days ahead and must not be below today's date"}
    // }

    // if (body.tgl_berangkat > body.tgl_pulang) {
    //     return {status:false, msg:"tgl berangakat must be grather than tgl pulang"}
    // } 

    
}

module.exports = validate