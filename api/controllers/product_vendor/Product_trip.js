/**
 * @author lepek13
 * controller for added product trip, update trip etc
 */
const helper = require('../../helper');
const productTrip = require('../../models/Product_trip_vendor');
const relasiKategoriProd = require('../../models/Relasi_kategori_product');
const moment = require('moment');
const validate = require('../../middleware/app_val');
const sequlz = require('../../../config/database')

const Product_trip = () => {

    /* POST api/trip/createTrip (ADD product with kategori) */
    const store = async(req, res) => {
        try {
            let transaction = await sequlz.transaction();
            const {body, users} = req
            const {idkategori,name_piknik} = body
            /* validasi kategories choose */
            let dataKate = await validate.valKategori(idkategori)
            
            if (dataKate.status == false) {
                return res.status(403).json(
                    helper.globalRes(403, dataKate.msg)
                )
            }

            let datapostProduct = {
                kode:helper.genCode(2)+moment(),
                name_piknik:body.name_piknik,
                keterangan:body.keterangan,
                iduser:users.iduser
            }

            /* insert product trip vendor */
            let insertProduct = await productTrip.create(datapostProduct, {transaction});

            /* insert kategori of product trip vendor */
            let MapPostKate = idkategori.map(el => {return {id_product:insertProduct.id_product, id_kategori:el}})

            await relasiKategoriProd.bulkCreate(MapPostKate, {transaction})

            await transaction.commit();  
            res.status(201).json(
                helper.globalRes(200, {msg:'Trip has been created', kode_product:datapostProduct.kode,name_piknik, kategories:dataKate.data})
            )
        } catch (error) {
            return res.status(500).json(
                helper.globalRes(500, error.message)
            )
        }
    }

    /* PUT api/trip/updateTrip (UPDATE trip product) */
    const updateProduct = async(req, res) => {
        try {
            const {body, users} = req
            const {iduser} = users
            const {name_piknik, keterangan, kode} = body

            /* cek product trip vendor */
            let prdTrip = await productTrip.findOne({where:{kode, iduser}})
            
            if (!prdTrip) {
                return res.status(404).json(
                    helper.globalRes(404, "Trip not found")
                )
            }
            
            /* update product trip vendor */
            await prdTrip.update({
                name_piknik,
                keterangan,
                update_at:moment().format('YYYY-MM-DD hh:mm:ss')
            }, {where:{kode, iduser}})
            
            
            res.json(
                helper.globalRes(200, {msg:'Trip has been updated', kode, })
            )
        } catch (error) {
            return res.status(500).json(
                helper.globalRes(500, error.message)
            )
        }
    }

    /* POST api/trip/addKategoriTrip (Add kategori) */
    const storeKategori = async(req, res) => {
        try {
            const {body, users} = req
            const {iduser} = users
            const {idkategori, kode} = body

            /* get and cek product trip vendor */
            let prdTrip = await productTrip.findOne({where:{kode, iduser}})
            
            if (!prdTrip) {
                return res.status(404).json(
                    helper.globalRes(404, "Trip not found")
                )
            }

            /* get all kategories product trip vendor on has choosen */
            let dataKateTrip = await relasiKategoriProd.findAll({
                where:{id_product:prdTrip.id_product,id_kategori: idkategori}
            });

            if (dataKateTrip.length > 0) {
                return res.status(403).json(
                    helper.globalRes(403, "You have been insert a data, please choose others")
                )
            }

            /* validasi kategories */
            let dataKate = await validate.valKategori(idkategori)

            if (dataKate.status == false) {
                return res.status(403).json(
                    helper.globalRes(403, dataKate.msg)
                )
            }

            /* mapping data and multiple insert kategories trip vendor */
            let MapPostKate = idkategori.map(el => {return {id_product:prdTrip.id_product, id_kategori:el}})

            await relasiKategoriProd.bulkCreate(MapPostKate)

            res.status(201).json(
                helper.globalRes(201, {msg:'Categories has been added', kategories:dataKate.data})
            )
        } catch (error) {
            return res.status(500).json(
                helper.globalRes(500, error.message)
            )
        }   
    }

    return {
        store,
        updateProduct,
        storeKategori,
    }
}

module.exports = Product_trip