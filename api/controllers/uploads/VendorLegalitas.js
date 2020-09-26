/**
 * @author lepek13
 * controller for read, upload, edit and delete file legalitas
 * modules ara model legalitas, helper reponse, 
 * middleware avata, path dir and fs for rendering file
 * @routers
 * POST api/service/UploadVendorlegalitas (UPLOAD)
 * GET /api/service/GetVendorlegalitas (GET FILE)
 * PUT /api/service/UpdateVendorlegalitas (UPDATE FILE)
 * DELETE /api/service/DeleteVendorlegalitas (DELETE FILE)
 */

const helper = require('../../helper');
const modelLegalitas = require('../../models/vendorImglegalitas')
const serviceUpload = require('../../services/ServiceUpload');
const validateImage = require('../../middleware/app_val/validateImage');
const path = require('path');
const fs = require('fs');

const VendorLegalitas = () => {

    const getlegalitas = async(req, res) => {
        try {
            let image = req.params.img
            let imageShow = path.join(__dirname, "../../../upload/legalitas/"+image)
            
            if (fs.existsSync(imageShow)) {
                res.sendFile(imageShow);    
            } else {
                res.status(404).json(
                    helper.globalRes(404, "Oops, sory file not found")
                )
            }
        } catch (error) {
            res.status(400).json(
                helper.globalRes(400, err.message)
            )  
        }
    }

    const get = async(req, res) => {
        try {
            let {users} = req
            let dataImg = await modelLegalitas.findOne({
                where:{iduser:users.iduser}
            })

            if (!dataImg) {
                res.status(404).json(
                    helper.globalRes(404, "Oops, sory file not found, please upload first")
                )    
            }
        

            let image = dataImg.legalitas
            let imageShow = path.join(__dirname, "../../../upload/legalitas/"+image)
            
            if (fs.existsSync(imageShow)) {
                res.sendFile(imageShow);    
            } else {
                res.status(404).json(
                    helper.globalRes(404, "Oops, sory file not found")
                )
            }
        } catch (error) {
            res.status(400).json(
                helper.globalRes(400, error.message)
            )  
        }
    }

    const store = async(req, res) => {
        try {
            let {users} = req
            let dataImge = await validateImage('legalitas', users.iduser)
            if (dataImge.status == false) {
                return res.status(400).json(
                    helper.globalRes(400, dataImge.msg)
                )
            }

            let dataUploads = serviceUpload('./upload/legalitas/').single('legalitas');
            
            dataUploads(req, res, async(err) => {
                if (err) {
                    return res.status(403).json(
                        helper.globalRes(403, err)
                    )
                } else {
                    if (!req.file) {
                        res.status(403).json(
                            helper.globalRes(403, "Please insert file data")
                        )
                    }else{
                        
                        await modelLegalitas.create({
                            iduser:users.iduser,
                            legalitas:req.file.filename
                        })
                        res.status(201).json(
                            helper.globalRes(201, {legalitas:'http://localhost:8011/legalitas/'+req.file.filename})
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

    const put = async (req, res) => {
        try {
            let {users} = req
            let Today = Date.now()
            let dataImg = await modelLegalitas.findOne({
                where:{iduser:users.iduser}
            })

            if (!dataImg) {
                return res.status(404).json(
                    helper.globalRes(404, "Oops, sory file not found, please upload first")
                )    
            }
            let image = dataImg.legalitas
            let dataUploads = serviceUpload('./upload/legalitas/').single('legalitas');
            dataUploads(req, res, async(err) => {
                if (err) {
                    return res.status(403).json(
                        helper.globalRes(403, err)
                    )
                } else {
                    if (!req.file) {
                        res.status(403).json(
                            helper.globalRes(403, "Please insert file data")
                        )
                    }else{
                        
                        // fs.unlinkSync(path.join(__dirname, "../../../upload/legalitas/"+image))
                        await modelLegalitas.update({
                            legalitas:req.file.filename,
                            update_at:Today
                        }, {where:{iduser:users.iduser,}})
                        res.status(202).json(
                            helper.globalRes(202, {legalitas:req.file.filename, msg:"file has been updated"})
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

    // const destroy = async(req, res) => {
    //     try {
    //         let {users} = req
    //         let dataImg = await modelLegalitas.findOne({
    //             where:{iduser:users.iduser}
    //         })
            
    //         if (!dataImg) {
    //             return res.status(404).json(
    //                 helper.globalRes(404, "Oops, sory file not found")
    //             )    
    //         }
    //         // let image = dataImg.legalitas
    //         // fs.unlinkSync(path.join(__dirname, "../../../upload/legalitas/"+image))
    //         await modelLegalitas.destroy({
    //             where:{iduser:users.iduser}
    //         })
    //         res.status(202).json(
    //             helper.globalRes(202, {msg:"file has been Deleted"})
    //         )
    //     } catch (error) {
    //         res.status(400).json(
    //             helper.globalRes(400, err.message)
    //         )
    //     }
    // }

    return {
        getlegalitas,
        get,
        store,
        put,
        // destroy,
    }
}

module.exports = VendorLegalitas