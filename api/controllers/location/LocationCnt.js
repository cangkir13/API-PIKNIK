/**
 * @author lepek13
 * Get master area Indonesia
 * @method GET
 * /api/getProvinsi (GET PROVINSI)
 * /api/getKabupaten (GET KABUPATEN)
 * /api/getKecamatan (GET KECAMATAN)
 * /api/getKelurahan (GET KELURAHAN)
 * /api/getKodepos (GET KODEPOS AND LAT LONG)
 */

const helper = require('../../helper/');
const Area = require('../../models/Area');

const LocationCnt = () => {
    const GetProvinsi = async(req, res) => {
        try {
            let data = await Area.findAll({
                attributes:['provinsi'],
                group:['provinsi']
            });
            
            return res.json(
                helper.globalRes(200, data)
            )

        } catch (error) {
            return res.status(500).json(
                helper.globalRes(500, error.message)
            )
        }
    }

    const GetKab = async(req, res) => {
        try {
            let data = await Area.findAll({
                where:{
                    provinsi:req.body.provinsi
                },
                attributes:['kabupaten'],
                group:['kabupaten']
            });
            console.log(data.length);
            
            if (data.length < 1)
                return res.status(404).json(
                    helper.globalRes(404, 'Provinsi not found')
                ) 
            
            return res.json(
                helper.globalRes(200, data)
            )

        } catch (error) {
            return res.status(500).json(
                helper.globalRes(500, error.message)
            )
        }
    }

    const GetKec = async(req, res) => {
        try {
            let data = await Area.findAll({
                where:{
                    provinsi:req.body.provinsi,
                    kabupaten:req.body.kabupaten
                },
                attributes:['kecamatan'],
                group:['kecamatan']
            });

            if (data.length < 1)
                return res.status(404).json(
                    helper.globalRes(404, 'provinisi or kabupaten not found')
                ) 
            
            return res.json(
                helper.globalRes(200, data)
            )

        } catch (error) {
            return res.status(500).json(
                helper.globalRes(500, error.message)
            )
        }
    }

    const GetKel = async(req, res) => {
        try {
            let data = await Area.findAll({
                where:{
                    provinsi:req.body.provinsi,
                    kabupaten:req.body.kabupaten,
                    kecamatan:req.body.kecamatan,
                },
                attributes:['kelurahan'],
                group:['kelurahan']
            });

            if (data.length < 1)
                return res.status(404).json(
                    helper.globalRes(404, 'provinisi or kabupaten or kecamatan not found')
                ) 
            
            return res.json(
                helper.globalRes(200, data)
            )

        } catch (error) {
            return res.status(500).json(
                helper.globalRes(500, error.message)
            )
        }
    }

    const GetPos = async(req, res) => {
        try {
            let data = await Area.findAll({
                where:{
                    provinsi:req.body.provinsi,
                    kabupaten:req.body.kabupaten,
                    kecamatan:req.body.kecamatan,
                    kelurahan:req.body.kelurahan,
                },
                attributes:['kodepos',  'latitude', 'longitude'],
            });

            if (data.length < 1)
                return res.status(404).json(
                    helper.globalRes(404, 'provinisi or kabupaten or kecamatan or kelurahan not found')
                ) 
            
            return res.json(
                helper.globalRes(200, data)
            )

        } catch (error) {
            return res.status(500).json(
                helper.globalRes(500, error.message)
            )
        }
    }

    return {
        GetProvinsi,
        GetKab,
        GetKec,
        GetKel,
        GetPos,
    }
}

module.exports = LocationCnt