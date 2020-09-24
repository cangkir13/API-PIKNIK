/**
 * @augments lepek13
 * Controller for create data rundowns
 */

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
             * @augments id_detail
             */
            const KodeDetFind = await MdetailTrip.findOne({
                where:{id_detail:code_detail, iduser:users.iduser}
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
            let val = validate.valRundowns(body, 'add')

            /* check middleware rundowns */
            if (val.status == false) 
                return res.status(403).json(
                    helper.globalRes(403, val.msg)
                )

            /* insert data if true */    
            await Mrundowns.create({
                id_detail:code_detail,
                judul_acara,
                keterangan,
                tgl_mulai:moment(tgl_mulai, 'YYYY/MM/DD HH:mm'),
                tgl_akhir:moment(tgl_akhir, 'YYYY/MM/DD HH:mm'),
                iduser:users.iduser,
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

    /* api/trip/editRundowns */
    const updateRundowns = async(req, res) => {
        const {body, users} = req
        const {id, judul_acara, keterangan, tgl_mulai, tgl_akhir} = body
        /* get && chek list rundowns */
        let DataRndws = await Mrundowns.findOne({
            where:{
                id:body.id,
                iduser:users.iduser
            }
        })

        if (!DataRndws) 
            return res.status(404).json(
                helper.globalRes(404, 'Data Itinerary not found')
            )
                
        /* Get data tgl berangkat at detail product/trip */    
        let GetDetail = await MdetailTrip.findOne({
            where: { iduser:users.iduser, id_detail:DataRndws.id_detail}
        })   

        body.tgl_berangkat = GetDetail.tgl_berangkat;
        body.tgl_pulang = GetDetail.tgl_pulang;

        let val = validate.valRundowns(body, 'edit')

        /* check middleware rundowns */
        if (val.status == false) 
            return res.status(403).json(
                helper.globalRes(403, val.msg)
            )
        await Mrundowns.update({
            judul_acara,
            keterangan,
            tgl_mulai:moment(tgl_mulai, 'YYYY/MM/DD HH:mm'),
            tgl_akhir:moment(tgl_akhir, 'YYYY/MM/DD HH:mm'),
            iduser:users.iduser,
        },{where: {id, iduser:users.iduser}}) 
        
        return res.json(
            helper.globalRes(
                200, {msg:'List itinerary/rundowns has been updated', data:body}
            )
        )
    }

    return {
        createRundowns,
        updateRundowns
    }
}

module.exports = Product_itinerary