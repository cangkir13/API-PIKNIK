/**
 * @author lepek13
 * API get list fasilitas
 * API adding data list fasilitas
 * API adding fasilitas of product (trip vendor)
 */

const helper = require('../../helper');
const validate = require('../../middleware/app_val')
const productFasility = require('../../models/Relasi_fasilitas_product');
const productTrip = require('../../models/Product_trip_vendor');
const MproductFasility = require('../../models/Master_fasilitas_trip');

const Product_facility = () => {

    /* api/trip/GetFasility */
    const getFaslitas = async(req, res) => {
        try {
            // model get all data fasilitas
            let fasilitas = await MproductFasility.findAll({
                attributes:['id_fasilitas', 'fasilitas_name']
            });
            
            return res.json(
                helper.globalRes(200, {fasilitas})
            )
        } catch (error) {
            return res.status(500).json(
                helper.globalRes(500, error.message)
            )
        }
    }

    /* api/trip/addFasility */
    const StoreFasilitas = async(req, res) => {
        try {
            const {body, users} = req
            const {fasilitas} = body
            /* maping data array insert */
            let bulkPost = fasilitas.map((el) => {
                return {fasilitas_name:el}
            })

            /* insert data array  */
            let Mfasilitas = await MproductFasility.bulkCreate(bulkPost)
            res.json(
                helper.globalRes(200, Mfasilitas)
            )
        } catch (error) {
            return res.status(500).json(
                helper.globalRes(500, error.message)
            )
        }
    }

    /* api/trip/addFasilityTrip */
    const StoreFasilitasProduct = async(req, res) => {
        try {
            const {body, users} = req
            const {fasilitas, kode} = body
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

            /* compare and check fasilitas id */
            let valFasil = await validate.valFasilProd(fasilitas);

            if (valFasil.status == false) {
                return res.status(403).json(
                    helper.globalRes(403, valFasil.msg)
                )
            }

            /* map array insert */
            let productFsilPost = fasilitas.map((el) => {
                return {id_product:findKode.id_piknik, id_fasilitas:el}
            })

            /* insert fasility of trip */
            await productFasility.bulkCreate(productFsilPost)

            return res.json(
                helper.globalRes(200, {findKode, productFsilPost})
            )
        } catch (error) {
            return res.status(500).json(
                helper.globalRes(500, error.message)
            )
        }
    }

    return {
        getFaslitas,
        StoreFasilitas,
        StoreFasilitasProduct
    }
}

module.exports = Product_facility