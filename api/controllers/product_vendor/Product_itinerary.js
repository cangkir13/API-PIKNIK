const helper = require('../../helper');
const Mrundowns = require("../../models/Relasi_itinerary_product");
const MdetailTrip = require("../../models/Relasi_detail_product");
const validate = require('../../middleware/app_val');
const moment = require('moment')

const Product_itinerary = () => {
    const createRundowns = async(req, res) => {
        const {body, users} = req
        const {code_detail, judul_acara, keterangan, tgl_mulai, tgl_akhir} = body

        const KodeDetFind = await MdetailTrip.findOne({
            where:{code_detail}
        })

        if (!KodeDetFind)
            return res.status(404).json(
                helper.globalRes(404, "Product detail not found")
            ) 
        body.tgl_berangkat = KodeDetFind.tgl_berangkat;
        body.tgl_pulang = KodeDetFind.tgl_pulang;
        
        let val = await validate.valRundowns(body)

        if (val.status == false) 
            return res.status(403).json(
                helper.globalRes(403, val.msg)
            )

        await Mrundowns.create({
            code_detail,
            judul_acara,
            keterangan,
            tgl_mulai:moment(tgl_mulai, 'YYYY/MM/DD HH:mm'),
            tgl_akhir:moment(tgl_akhir, 'YYYY/MM/DD HH:mm'),
        })    

        return res.status(201).json(
            helper.globalRes(201, {msg:"Data has been Created", data:body})
        )   
    }

    return {
        createRundowns
    }
}

module.exports = Product_itinerary