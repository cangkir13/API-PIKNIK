/**
 * @author
 * upload files sertifikat
 * POST /api/service/UploadVendorSertifikat (UPLOAD)
 * GET /api/service/VendorSertifikat/:image (open file with params)
 */
const helper = require('../../helper');
const modelSertifikat = require('../../models/vendorImgsertifikat')
const serviceUpload = require('../../services/ServiceUpload');
const validateImage = require('../../middleware/app_val/validateImgSertifikat');
const path = require('path');
const fs = require('fs');

// delete file array
const delImg = (arrayImg) => {
    return arrayImg.map(el => fs.unlinkSync(el.destination+el.filename))    
}

const VendorSertifikat = () => {

    const get = async(req, res) => {
        let image = req.params.img
        let imageShow = path.join(__dirname, "../../../upload/sertifikat/"+image)
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

            let dataUploads = serviceUpload('./upload/sertifikat/').array('sertifikat');
            
            dataUploads(req, res, async(err) => {
                if (err) {
                    return res.status(403).json(
                        helper.globalRes(403, err)
                    )
                } else {
                    console.log(req.files);
                    if (req.files.length < 1 || req.files.length > 3 ) {
                        delImg(req.files)  
                        res.status(403).json(
                            helper.globalRes(403, "Please insert file min 1 and max 3")
                        )
                    }else{
                        let dataImge = await validateImage(users.iduser, req.files.length)
                        if (dataImge.status == false) {                
                            delImg(req.files)  
                            return res.status(400).json(
                                helper.globalRes(400, dataImge.msg)
                            )
                        }
                        // console.log(req.files);
                        let dataFilter = req.files.map(el => {return {iduser:users.iduser, sertifikat:el.filename}})
                        let dataIMG = req.files.map(el => {return { sertifikat:'http://localhost:8011/sertifikat/'+el.filename}})
                        
                        await modelSertifikat.bulkCreate(dataFilter)
                        res.status(201).json(
                            helper.globalRes(201,  dataIMG)
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