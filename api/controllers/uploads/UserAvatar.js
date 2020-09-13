/**
 * @author lepek13
 * controller for read, upload, edit and delete file avatar
 * modules ara model avatar, helper reponse, 
 * middleware avata, path dir and fs for rendering file
 */

const helper = require('../../helper');
const modelAvatar = require('../../models/UserImgAvatar')
const serviceUpload = require('../../services/ServiceUpload');
const validateImage = require('../../middleware/app_val/validateImage');
const path = require('path');
const fs = require('fs');

const UserAvatar = () => {

    const get = async(req, res) => {
        try {
            let {users} = req
            let dataImg = await modelAvatar.findOne({
                where:{iduser:users.iduser}
            })

            if (!dataImg) {
                res.status(404).json(
                    helper.globalRes(404, "Oops, sory file not found, please upload first")
                )    
            }
        

            let image = dataImg.avatar
            let imageShow = path.join(__dirname, "../../../upload/avatar/"+image)
            
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

    const store = async(req, res) => {
        try {
            let {users} = req
            let dataImge = await validateImage('avatar', users.iduser)
            if (dataImge.status == false) {
                return res.status(400).json(
                    helper.globalRes(400, dataImge.msg)
                )
            }

            let dataUploads = serviceUpload('./upload/avatar/').single('avatar');
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
                        
                        await modelAvatar.create({
                            iduser:users.iduser,
                            avatar:req.file.filename
                        })
                        res.status(201).json(
                            helper.globalRes(201, {avatar:req.file.filename})
                        )
                    }
                }
            })
        } catch (error) {
            res.status(400).json(
                helper.globalRes(400, err.message)
            )
        }
    }

    const put = async (req, res) => {
        try {
            let {users} = req
            let Today = Date.now()
            let dataImg = await modelAvatar.findOne({
                where:{iduser:users.iduser}
            })

            if (!dataImg) {
                return res.status(404).json(
                    helper.globalRes(404, "Oops, sory file not found, please upload first")
                )    
            }
            let image = dataImg.avatar
            let dataUploads = serviceUpload('./upload/avatar/').single('avatar');
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
                        
                        fs.unlinkSync(path.join(__dirname, "../../../upload/avatar/"+image))
                        await modelAvatar.update({
                            avatar:req.file.filename,
                            update_at:Today
                        }, {where:{iduser:users.iduser,}})
                        res.status(202).json(
                            helper.globalRes(202, {avatar:req.file.filename, msg:"file has been updated"})
                        )
                    }
                }
            })
        } catch (error) {
            res.status(400).json(
                helper.globalRes(400, err.message)
            )
        }
    }

    const destroy = async(req, res) => {
        try {
            let {users} = req
            let dataImg = await modelAvatar.findOne({
                where:{iduser:users.iduser}
            })
            
            if (!dataImg) {
                return res.status(404).json(
                    helper.globalRes(404, "Oops, sory file not found")
                )    
            }
            let image = dataImg.avatar
            fs.unlinkSync(path.join(__dirname, "../../../upload/avatar/"+image))
            await modelAvatar.destroy({
                where:{iduser:users.iduser}
            })
            res.status(202).json(
                helper.globalRes(202, {msg:"file has been Deleted"})
            )
        } catch (error) {
            res.status(400).json(
                helper.globalRes(400, err.message)
            )
        }
    }

    return {
        get,
        store,
        put,
        destroy,
    }
}

module.exports = UserAvatar