/**
 * @author
 * upload files sertifikat
 * POST /api/service/UploadVendorSertifikat (UPLOAD)
 * GET /api/service/VendorSertifikat/:image (open file with params)
 */
const helper = require('../../helper');
const modelSertifikat = require('../../models/vendorImgsertifikat')
const serviceUpload = require('../../services/ServiceUpload');
const validateImage = require('../../middleware/app_val/validateImage');
const path = require('path');
const fs = require('fs');

const VendorSertifikat = () => {

    const get = async(req, res) => {
        let image = req.params.image
        let imageShow = path.join(__dirname, "../../../upload/sertifikat/"+image)
        console.log(imageShow);
        // check file is axists
        if (fs.existsSync(imageShow)) {
            res.sendFile(imageShow);    
        } else {
            res.status(404).json(
                helper.globalRes(404, "Oops, sory file not found")
            )
        }
    }

    const store = async(req, res) => {
        try {
            let {users} = req
            let dataImge = await validateImage('sertifikat', users.iduser)
            if (dataImge.status == false) {
                return res.status(400).json(
                    helper.globalRes(400, dataImge.msg)
                )
            }

            let dataUploads = serviceUpload('./upload/sertifikat/').array('sertifikat');
            
            dataUploads(req, res, async(err) => {
                if (err) {
                    return res.status(403).json(
                        helper.globalRes(403, err)
                    )
                } else {
                    if (req.files.length < 1 || req.files.length > 3 ) {
                        res.status(403).json(
                            helper.globalRes(403, "Please insert file min 1 and max 3")
                        )
                    }else{
                        console.log(req.files);
                        let dataFilter = req.files.map(el => {return {iduser:users.iduser, sertifikat:el.filename}})
                        let dataIMG = req.files.map(el => {return { sertifikat:'http://localhost:8011/api/service/VendorSertifikat/'+el.filename}})
                        
                        await modelSertifikat.bulkCreate(dataFilter)
                        res.status(201).json(
                            helper.globalRes(201, {data: dataIMG})
                        )
                    }
                }
            })
        } catch (error) {
            res.status(400).json(
                helper.globalRes(400, error.message)
            )
        }
    }

    
    return {
        get,
        store,
    }
}

module.exports = VendorSertifikat