const Mdetail = require('../../models/Relasi_detail_product');
const moment = require('moment')

const valDateAcara = async(body) => {
    /**
     * cek datetime of acara
     * @argument object
     * @argument {body.tgl_berangkat, body.tgl_pulang}
     * @argument {body.tgl_mulai, body.tgl_akhir}
     */
    let TglBrkt = moment(body.tgl_berangkat, 'YYYY/MM/DD HH:mm', true);
    let TglPlg = moment(body.tgl_pulang, 'YYYY/MM/DD HH:mm', true);
    let formtTglMulaiAcara = moment(body.tgl_mulai, 'YYYY/MM/DD HH:mm', true);
    let formtTglAkhirAcara = moment(body.tgl_akhir, 'YYYY/MM/DD HH:mm', true);
    
    if (formtTglMulaiAcara.isValid() === false || formtTglAkhirAcara.isValid() === false) {
        return {status: false, msg: "the format of tgl_berangkat / tgl_pulang must be YYYY/MM/DD HH:mm"}
    }

    /* cek datetime acara grather than datetime berangkat */
    let isAfter = moment(formtTglMulaiAcara).isAfter(TglBrkt, true)
    let isSameBrktMulai = moment(formtTglMulaiAcara).isSame(TglBrkt); 
    // console.log({formtTglMulaiAcara, TglPlg, isAfter, isSameBrktMulai});
    
    if (!isAfter && !isSameBrktMulai ) {
        return {status:false, msg:"the date of tgl_mulai must be grather or equel than tgl_mulai "}
    }

    return {status:true}
}
// module.exports = validate

module.exports = async(body) => {
    // if (body.tgl_berangkat || body.tgl_pulang) {
        let formatDate = valDateAcara(body)
        // if (formatDate.status === false) {
            return formatDate
        // }
    // }
}
    