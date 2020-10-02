
const helper = require('../../helper');
const MTrip = require('../../models/Product_trip_vendor');
const Mdetail = require('../../models/Relasi_detail_product');
const Marea = require('../../models/Area');
const imgProd = require('../../models/vendorImgProduct');

const relasiKategori = require('../../models/Relasi_kategori_product');
const Mkategori = require('../../models/Master_kategori_wisata');

const relasiFasil = require('../../models/Relasi_fasilitas_product');
const Mfasil = require('../../models/Master_fasilitas_trip');

const Mrundowns = require('../../models/Relasi_itinerary_product')

const { Op } = require('sequelize')
const moment = require('moment');

const product_trip = () => {

    // const getContent = async(req, res) => {
        
    //     const {limit, offset} = req.query
        
    //     let limits = limit?  parseInt(limit) :10
    //     let offsets = offset? parseInt(offset): 0
        
    //     let Trip = await MTrip.findAll({
    //         attributes: [['id_product','id_product'], 'kode', 'name_piknik', 'keterangan', 'iduser'],
    //         include:[
    //             {
    //                 model:Mdetail,
    //                 attributes:['id_detail', 'idlocation', 'start_point', 'kuota', 'price', 'terms_conditions', 'tgl_berangkat', 'tgl_pulang', 'close_order', 'point_lat', 'point_long'],
    //                 where:{
    //                     tgl_berangkat:{
    //                         [Op.gte]: moment().toDate()
    //                     }
    //                 },
    //                 // separate: true,
                    
    //                 include:[Marea],                   
    //             },
    //             {
    //                 model:relasiKategori,
    //                 attributes:['id_kategori'],
    //                 include:[{
    //                     model:Mkategori,
    //                     attributes:['name'],
    //                 }]
    //             },
    //             {
    //                 model:relasiFasil,
    //                 attributes:['id_fasilitas'],
    //                 include:[{
    //                     model:Mfasil,
    //                     attributes:['fasilitas_name'],
    //                 }]
    //             },
    //         ],
    //         offset:offsets,
    //         limit:limits,
    //     });

    //     let pages = {
    //         limit:limits,
    //         offset:offsets,
    //     }
    //     return res.json(
    //         helper.globalRes(200, {pages, data:Trip})
    //     )
        
    // }

    /**
     * @method GET 
     * @url /pruduct?search=name_area&limit=10&offset=0
     * @param {*} req query for search, limit, and offset
     * @param {*} res data
     */
    const TripByDest = async(req, res) => {
        try {
            const {limit, offset, search} = req.query
            let limits = limit?  parseInt(limit) :10
            let offsets = offset? parseInt(offset): 0
            let searchs = search?"%"+search+"%":"%%"
                      
                        
            let data = await Mdetail.findAll({
                where:{
                    tgl_berangkat:{
                        [Op.gte]: moment().toDate()
                    }
                },
                include:[
                    {
                        model:MTrip,
                        as:"Product",
                        include:[
                            {
                                model:imgProd, 
                                as:"ProductImg",
                                attributes:['gambar']
                            },
                            {
                                model:relasiKategori,
                                // attributes:['id_kategori'],
                                include:[{
                                    model:Mkategori,
                                    attributes:['name'],
                                    as:"KategoriProduct"
                                }]
                            },
                            {
                                model:relasiFasil,
                                // attributes:['id_fasilitas'],
                                include:[{
                                    model:Mfasil,
                                    // attributes:['fasilitas_name'],
                                    as:"FasilitasProduct"
                                }]
                            }
                        ],
                        // where:{
                        //     [Op.or]:[
                        //         {
                        //             name_piknik:{
                        //                 [Op.like]:searchs
                        //             }
                        //         }
                        //     ]
                        // },
                    },
                    {
                        model:Marea,
                        as:'DetailLocation',
                        where:{
                            [Op.or]:[
                                {
                                    provinsi:{
                                        [Op.substring]:search
                                    }
                                },
                                {
                                    kabupaten:{
                                        [Op.substring]:search
                                    }   
                                },
                                {
                                    kecamatan:{
                                        [Op.substring]:search
                                    }
                                },
                                {
                                    kelurahan:{
                                        [Op.substring]:search
                                    }   
                                },
                            ]
                            
                        }
                    },
                    {
                        model:Mrundowns,
                        as:"DetailRundowns"
                    }
                    
                ],
                limit:limits,
                offset:offsets
            })

            // console.log(data.length);
            if (data.length < 1) {
                return res.status(404).json(
                    helper.globalRes(404, "Content Not found")
                )
            }
            return res.json(
                helper.globalRes(200, {
                    pages:{
                        limit:limits,
                        offest:offsets
                    },
                    data
                })
            )

        } catch (error) {
            
            return res.status(500).json(
                helper.globalRes(500, error.message)
            )
        }
        
    }

    const TripWisata = async(req, res) => {
        try {
            const {limit, offset, d, date} = req.query
            let limits = limit?  parseInt(limit) :10
            let offsets = offset? parseInt(offset): 0                      
                console.log(moment(date, 'YYYY-MM-DD'));
                
            let data = await Mdetail.findAll({
                where:{
                    tgl_berangkat:{
                        [Op.gte]: date?moment(date, 'YYYY-MM-DD') :moment().toDate()
                    }
                },
                include:[
                    {
                        model:MTrip,
                        as:"Product",
                        include:[
                            {
                                model:imgProd, 
                                as:"ProductImg",
                                attributes:['gambar']
                            },
                            {
                                model:relasiKategori,
                                // attributes:['id_kategori'],
                                include:[{
                                    model:Mkategori,
                                    attributes:['name'],
                                    as:"KategoriProduct"
                                }]
                            },
                            {
                                model:relasiFasil,
                                // attributes:['id_fasilitas'],
                                include:[{
                                    model:Mfasil,
                                    // attributes:['fasilitas_name'],
                                    as:"FasilitasProduct"
                                }]
                            }
                        ],
                        where:{
                            [Op.or]:[
                                {
                                    name_piknik:{
                                        [Op.substring]:d
                                    }
                                },
                                {
                                    keterangan:{
                                        [Op.substring]:d
                                    }
                                }
                            ]
                        },
                    },
                    {
                        model:Marea,
                        as:'DetailLocation',
                    },
                    {
                        model:Mrundowns,
                        as:"DetailRundowns"
                    }
                    
                ],
                limit:limits,
                offset:offsets
            })

            if (data.length < 1) {
                return res.status(404).json(
                    helper.globalRes(404, "Content Not found")
                )
            }
            return res.json(
                helper.globalRes(200, {
                    pages:{
                        limit:limits,
                        offest:offsets
                    },
                    data
                })
            )

        } catch (error) {
            
            return res.status(500).json(
                helper.globalRes(500, error.message)
            )
        }
        
    }

    return {
        // getContent,
        TripByDest,
        TripWisata,
    }
}

module.exports = product_trip