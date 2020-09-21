const helper = require('../../helper');
const Mrundowns = require("../../models/Relasi_itinerary_product");
const MdetailTrip = require("../../models/Relasi_detail_product");
const validate = require('../../middleware/app_val');
const moment = require('moment')

const Product_itinerary = () => {
    /* api/trip/addRundowns */
    const createRundowns = async(req, res) => {
        try {
            const {body, users} = req
            const {code_detail, judul_acara, keterangan, tgl_mulai, tgl_akhir} = body

            /**
             * find kode detail trip 
             * @augments code_detail
             */
            const KodeDetFind = await MdetailTrip.findOne({
                where:{code_detail}
            })

            /**
             * check if exist
             */
            if (!KodeDetFind)
                return res.status(404).json(
                    helper.globalRes(404, "Product detail not found")
                ) 

            /* passing data of detail product to object body to validate tgl mulai */    
            body.tgl_berangkat = KodeDetFind.tgl_berangkat;
            body.tgl_pulang = KodeDetFind.tgl_pulang;
            
            /* validation of datetime rundowns */
            let val = await validate.valRundowns(body)

            /* check middleware rundowns */
            if (val.status == false) 
                return res.status(403).json(
                    helper.globalRes(403, val.msg)
                )

            /* insert data if true */    
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
        } catch (error) {
            return res.status(500).json(
                helper.globalRes(500, error.message)
            )
        }
    }

    return {
        createRundowns
    }
}

module.exports = Product_itinerary