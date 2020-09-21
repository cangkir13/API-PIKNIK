/**
 * @author lepek13
 * api for create detail of trip 
 */

const helper = require('../../helper');
const productTrip = require('../../models/Product_trip_vendor');
const productDetail = require('../../models/Relasi_detail_product');
const validate = require('../../middleware/app_val');
const moment = require('moment')

const Product_detail = () => {

    /* POST /api/trip/addDetailTrip */
    const StDetailProd = async(req, res) => {
        try {
            const {body, users} = req
            const {kode, kuota, start_point, price,
                tgl_berangkat, tgl_pulang, terms_conditions} = body
            const {iduser} = users

            /* find and check product trip */
            let findKode = await productTrip.findOne({
                where:{kode, iduser}
            });

            if (!findKode) {
                return res.status(404).json(
                    helper.globalRes(404, {msg:"Trip not found"})
                )
            }

            /* validation tgl, kuota and data location */
            let val = await validate.valDetailProd(body)

            if(val.status == false)
                return res.status(403).json(
                    helper.globalRes(403, val.msg)
                )
            
            let detailPost = {
                id_product : findKode.id_piknik,
                idlocation : val.data.idlocation,
                code_detail: helper.genCode(30),
                kuota,
                price,
                start_point,
                tgl_berangkat:moment(tgl_berangkat, 'YYYY/MM/DD HH:mm'), 
                tgl_pulang:moment(tgl_pulang, 'YYYY/MM/DD HH:mm'),
                terms_conditions
            }

            await productDetail.create(detailPost)
            res.json(
                helper.globalRes(200, {detailPost, location:val.data})
            )
        } catch (error) {
            
        }
    }
    
    /* PUT /api/trip/UpdateDetailTrip */
    const PutDetailProd = async(req, res) => {
        // try {
        //     const {body, users} = req
        //     const {kode, kuota, start_point, price,
        //         tgl_berangkat, tgl_pulang} = body
        //     const {iduser} = users

        //     /* find and check product trip */
        //     let findKode = await productTrip.findOne({
        //         where:{kode, iduser}
        //     });

        //     if (!findKode) {
        //         return res.status(404).json(
        //             helper.globalRes(404, {msg:"Trip not found"})
        //         )
        //     }
        // } catch (error) {
            
        // }
    }

    const GetDetailProd = async(req, res) => {
        let sequel = require('../../../config/database')
        let query = "SELECT * FROM product_trip_vendor a JOIN relasi_detail_product b ON a.id_piknik = b.id_product";
    
        sequel.query(query, {
            type:sequel.QueryTypes.SELECT
        }).then((result) => {
           return res.json({status:true, data:result}) 
        }).catch((err) => {
            return res.json({status:false, data:error.message}) 
        });
        // return res.json(data)
    }

    return {
        StDetailProd,
        PutDetailProd,
        GetDetailProd,
    }
}

module.exports = Product_detail