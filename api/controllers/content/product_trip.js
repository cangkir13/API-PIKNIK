
const helper = require('../../helper');
const MTrip = require('../../models/Product_trip_vendor');
const relasiKategori = require('../../models/Relasi_kategori_product');
const Mkategori = require('../../models/Master_kategori_wisata');

const relasiFasil = require('../../models/Relasi_fasilitas_product');
const Mfasil = require('../../models/Master_fasilitas_trip');

const Mdetail = require('../../models/Relasi_detail_product');
const Marea = require('../../models/Area');

const { Op } = require('sequelize')
const moment = require('moment')

const product_trip = () => {
    const getContent = async(req, res) => {
        console.log(moment().toDate());
        
        let Trip = await MTrip.findAll({
            // where:{id_piknik:3},
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
                    include:[Marea]
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
                }
            ],
        });

        return res.json(
            helper.globalRes(200, Trip)
        )
        
    }

    return {
        getContent
    }
}

module.exports = product_trip