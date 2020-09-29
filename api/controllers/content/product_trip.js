
const helper = require('../../helper');
const MTrip = require('../../models/Product_trip_vendor');
const relasiKategori = require('../../models/Relasi_kategori_product');
const Mkategori = require('../../models/Master_kategori_wisata');

const relasiFasil = require('../../models/Relasi_fasilitas_product');
const Mfasil = require('../../models/Master_fasilitas_trip');

const Mdetail = require('../../models/Relasi_detail_product');
const Marea = require('../../models/Area');

const { Op } = require('sequelize')
const moment = require('moment');
const { of } = require('core-js/fn/array');

const product_trip = () => {
    const getContent = async(req, res) => {
        
        const {limit, offset} = req.query
        
        let limits = limit?  parseInt(limit) :10
        let offsets = offset? parseInt(offset): 0
        
        let Trip = await MTrip.findAll({
            attributes: [['id_piknik','id_product'], 'kode', 'name_piknik', 'keterangan', 'iduser'],
            include:[
                {
                    model:Mdetail,
                    attributes:['id_detail', 'idlocation', 'start_point', 'kuota', 'price', 'terms_conditions', 'tgl_berangkat', 'tgl_pulang', 'close_order', 'point_lat', 'point_long'],
                    where:{
                        tgl_berangkat:{
                            [Op.gte]: moment().toDate()
                        }
                    },
                    // separate: true,
                    
                    include:[Marea],                   
                },
                {
                    model:relasiKategori,
                    attributes:['id_kategori'],
                    include:[{
                        model:Mkategori,
                        attributes:['name'],
                    }]
                },
                {
                    model:relasiFasil,
                    attributes:['id_fasilitas'],
                    include:[{
                        model:Mfasil,
                        attributes:['fasilitas_name'],
                    }]
                },
            ],
            offset:offsets,
            limit:limits,
        });

        let pages = {
            limit:limits,
            offset:offsets,
        }
        return res.json(
            helper.globalRes(200, {pages, data:Trip})
        )
        
    }

    return {
        getContent
    }
}

module.exports = product_trip