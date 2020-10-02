/**
 * @author lepek13
 * controller for read, upload, edit and delete file Identitas
 * modules ara model Identitas, helper reponse, 
 * middleware avata, path dir and fs for rendering file
 */

const helper = require('../../helper');
const MTrip = require('../../models/Product_trip_vendor');
const MimgProd = require('../../models/vendorImgProduct');
const serviceUpload = require('../../services/ServiceUpload');
const validateImage = require('../../middleware/app_val/');
const path = require('path');
const fs = require('fs');

const delImg = (arrayImg) => {
    return arrayImg.map(el => fs.unlinkSync(el.destination+el.filename))    
}

const ProductImg = () => {

    const get = async(req, res) => {
        try {
            let image = req.params.img
            let imageShow = path.join(__dirname, "../../../upload/imgTrip/"+image)
            
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
            
            let dataUploads = serviceUpload('./upload/imgTrip/').array('gambar', 5)
            dataUploads(req, res, async(err) => {
    
                /* file is error handle */
                if (err) {
                    return res.status(403).json(
                        helper.globalRes(403, err)
                    )
                }

                /* handle files data are not found */
                if (req.files.length < 1) {
                    return res.status(403).json(
                        helper.globalRes(403, 'field gambar are required')
                    )
                }
                
                if (!req.body.id_product) {
                    delImg(req.files)   
                    return res.status(403).json(
                        helper.globalRes(403, 'id_product is requiered')
                    )
                }
                
                /* validation of product image */
                let cekImgProd = await validateImage.valImgProd(users.iduser, req.body.id_product, req.files.length)

                if (cekImgProd.status == false) {
                    delImg(req.files)   
                    return res.status(403).json(
                        helper.globalRes(403, cekImgProd.msg)
                    )
                }

                let post = req.files.map(el => {
                    return {
                        gambar:el.filename,
                        judul:el.filename,
                        id_product:req.body.id_product,
                        iduser:users.iduser
                    }
                })

                await MimgProd.bulkCreate(post)

                let gambars = req.files.map(el => 
                    { 
                        return {link:"http://localhost:8011/imgProduct/"+el.filename}
                    })
                
                return res.status(201).json(
                    helper.globalRes(201, gambars)
                )
            })
        } catch (err) {
            res.status(400).json(
                helper.globalRes(400, err.message)
            )
        }
    }

    // const put = async (req, res) => {
    //     try {
    //         let {users} = req
    //         let Today = Date.now()
    //         let dataImg = await modelIdentitas.findOne({
    //             where:{iduser:users.iduser}
    //         })

    //         if (!dataImg) {
    //             return res.status(404).json(
    //                 helper.globalRes(404, "Oops, sory file not found, please upload first")
    //             )    
    //         }
    //         let image = dataImg.identitas
    //         let dataUploads = serviceUpload('./upload/identitas/').single('identitas');
    //         dataUploads(req, res, async(err) => {
    //             if (err) {
    //                 return res.status(403).json(
    //                     helper.globalRes(403, err)
    //                 )
    //             } else {
    //                 if (!req.file) {
    //                     res.status(403).json(
    //                         helper.globalRes(403, "Please insert file data")
    //                     )
    //                 }else{
                        
    //                     fs.unlinkSync(path.join(__dirname, "../../../upload/identitas/"+image))
    //                     await modelIdentitas.update({
    //                         identitas:req.file.filename,
    //                         update_at:Today
    //                     }, {where:{iduser:users.iduser,}})
    //                     res.status(202).json(
    //                         helper.globalRes(202, {identitas:req.file.filename, msg:"file has been updated"})
    //                     )
    //                 }
    //             }
    //         })
    //     } catch (err) {
    //         res.status(400).json(
    //             helper.globalRes(400, err.message)
    //         )
    //     }
    // }

    // const destroy = async(req, res) => {
    //     try {
    //         let {users} = req
    //         let dataImg = await modelIdentitas.findOne({
    //             where:{iduser:users.iduser}
    //         })
            
    //         if (!dataImg) {
    //             return res.status(404).json(
    //                 helper.globalRes(404, "Oops, sory file not found")
    //             )    
    //         }
    //         let image = dataImg.identitas
    //         fs.unlinkSync(path.join(__dirname, "../../../upload/identitas/"+image))
    //         await modelIdentitas.destroy({
    //             where:{iduser:users.iduser}
    //         })
    //         res.status(202).json(
    //             helper.globalRes(202, {msg:"file has been Deleted"})
    //         )
    //     } catch (err) {
    //         res.status(400).json(
    //             helper.globalRes(400, err.message)
    //         )
    //     }
    // }

    return {
        get,
        store,
        // put,
        // destroy,
    }
}

module.exports = ProductImg