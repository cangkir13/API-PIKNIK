/**
 * @author lepek13
 * api for create detail of trip 
 */

const helper = require('../../helper');
const productTrip = require('../../models/Product_trip_vendor');
const productDetail = require('../../models/Relasi_detail_product');
const validate = require('../../middleware/app_val');

const Product_detail = () => {

    /* POST /api/trip/addDetailTrip */
    const StDetailProd = async(req, res) => {
        const {body, users} = req
        const {kode, kuota, start_point, price,
            tgl_berangkat, tgl_pulang} = body
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
            kuota,
            price,
            start_point,
            tgl_berangkat, 
            tgl_pulang
        }

        await productDetail.create(detailPost)
        res.json(
            helper.globalRes(200, {detailPost, location:val.data})
        )
    }

    return {
        StDetailProd,
    }
}

module.exports = Product_detail