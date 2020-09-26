/**
 * @author lepek13
 * controller for read, upload, edit and delete file Identitas
 * modules ara model Identitas, helper reponse, 
 * middleware avata, path dir and fs for rendering file
 * @routers
 * POST api/service/UploaduserIdentitas (UPLOAD)
 * GET /api/service/GetuserIdentitas (GET FILE)
 * PUT /api/service/UpdateuserIdentitas (UPDATE FILE)
 * DELETE /api/service/DeleteuserIdentitas (DELETE FILE)
 */

const helper = require('../../helper');
const modelIdentitas = require('../../models/UserImgIdentitas')
const serviceUpload = require('../../services/ServiceUpload');
const validateImage = require('../../middleware/app_val/validateImage');
const path = require('path');
const fs = require('fs');

const UserIdentitas = () => {

    const getidentitas = async(req, res) => {
        try {
            let image = req.params.img
            let imageShow = path.join(__dirname, "../../../upload/identitas/"+image)
            
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
            let dataImg = await modelIdentitas.findOne({
                where:{iduser:users.iduser}
            })

            if (!dataImg) {
                res.status(404).json(
                    helper.globalRes(404, "Oops, sory file not found, please upload first")
                )    
            }
        
            let image = dataImg.identitas
            let imageShow = path.join(__dirname, "../../../upload/identitas/"+image)
            
            if (fs.existsSync(imageShow)) {
                res.sendFile(imageShow);    
            } else {
                res.status(404).json(
                    helper.globalRes(404, "Oops, sory file not found")
                )
            }
        } catch (err) {
            res.status(400).json(
                helper.globalRes(400, err.message)
            )  
        }
    }

    const store = async(req, res) => {
        try {
            let {users} = req
            let dataImge = await validateImage('identitas', users.iduser)
            if (dataImge.status == false) {
                return res.status(400).json(
                    helper.globalRes(400, dataImge.msg)
                )
            }

            let dataUploads = serviceUpload('./upload/identitas/').single('identitas');
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
                        
                        await modelIdentitas.create({
                            iduser:users.iduser,
                            identitas:req.file.filename
                        })
                        res.status(201).json(
                            helper.globalRes(201, {identitas:"http://localhost:8011/indentitas/"+req.file.filename})
                        )
                    }
                }
            })
        } catch (err) {
            res.status(400).json(
                helper.globalRes(400, err.message)
            )
        }
    }

    const put = async (req, res) => {
        try {
            let {users} = req
            let Today = Date.now()
            let dataImg = await modelIdentitas.findOne({
                where:{iduser:users.iduser}
            })

            if (!dataImg) {
                return res.status(404).json(
                    helper.globalRes(404, "Oops, sory file not found, please upload first")
                )    
            }
            let image = dataImg.identitas
            let dataUploads = serviceUpload('./upload/identitas/').single('identitas');
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
                        
                        fs.unlinkSync(path.join(__dirname, "../../../upload/identitas/"+image))
                        await modelIdentitas.update({
                            identitas:req.file.filename,
                            update_at:Today
                        }, {where:{iduser:users.iduser,}})
                        res.status(202).json(
                            helper.globalRes(202, {identitas:req.file.filename, msg:"file has been updated"})
                        )
                    }
                }
            })
        } catch (err) {
            res.status(400).json(
                helper.globalRes(400, err.message)
            )
        }
    }

    const destroy = async(req, res) => {
        try {
            let {users} = req
            let dataImg = await modelIdentitas.findOne({
                where:{iduser:users.iduser}
            })
            
            if (!dataImg) {
                return res.status(404).json(
                    helper.globalRes(404, "Oops, sory file not found")
                )    
            }
            let image = dataImg.identitas
            fs.unlinkSync(path.join(__dirname, "../../../upload/identitas/"+image))
            await modelIdentitas.destroy({
                where:{iduser:users.iduser}
            })
            res.status(202).json(
                helper.globalRes(202, {msg:"file has been Deleted"})
            )
        } catch (err) {
            res.status(400).json(
                helper.globalRes(400, err.message)
            )
        }
    }

    return {
        getidentitas,
        get,
        store,
        put,
        destroy,
    }
}

module.exports = UserIdentitas