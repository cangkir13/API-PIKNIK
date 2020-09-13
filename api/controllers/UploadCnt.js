const helper = require('../helper/');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Upload = require('../services/ServiceUpload')

'use strict';

const storage = multer.diskStorage({
    destination:'./upload/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const ModuleUpload = multer({
    storage:storage,
    limits: {
        fileSize: 1024 * 1024 *50  // 1MB
    },
    fileFilter:function (req, file, cb) {
        let fileType = /jpeg|jpg|png/;
        let mimetype = fileType.test(file.mimetype)
        let extname = fileType.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, Date.now()+'_'+file.originalname);
        }
        return cb("Error: File upload only support the following filetype - "+ fileType)
    }
}).single('file')

const UploadCnt = () => {
    const doUpload = async(req, res) => {
        ModuleUpload(req, res, (err) => {
            if(err){
                console.log(err);
                
                res.status(400).json(
                    helper.globalRes(400, err)
                )
            }else{
                console.log(req.body);
                res.json(
                    helper.globalRes(200, {fileLocation:req.file, avatar:req.body.avatar})
                )
            }
        })
    }

    const openFile = async(req, res) => {
        
        let image = req.params.image
        let imageShow = path.join(__dirname, "../../upload/"+image)
        // check file is axists
        if (fs.existsSync(imageShow)) {
            res.sendFile(imageShow);    
        } else {
            res.status(404).json(
                helper.globalRes(404, "Oops, sory file not found")
            )
        }
    }

    const uploadAvatar = (req, res) => {
        // console.log(req.file);
        
        let dataUpload = Upload('./upload/avatar/').single('avatar')
        dataUpload(req, res, (err) => {
            if (err) {
                // console.log(err);
                
                res.status(400).json(
                    helper.globalRes(400, err)
                )
            } else {
                // console.log({avatar: req.files.avatar, identitas:req.files.identitas});
                
                console.log(typeof req.file);
                if (!req.file) {
                    console.log('kosong');
                    res.status(403).json(
                        helper.globalRes(403, "Please insert file data")
                    )
                    //
                }else{
                    console.log('ada');
                    res.json(
                        helper.globalRes(200, {avatar:req.file.filename})
                    )
                }
                // if (avatar.length < 2) {
                //     console.log('kosong');
                //     res.status(400).json(
                //         helper.globalRes(400, "Entry true value")
                //     )
                // } else {
                //     let data = {avatar: req.files.avatar[0].filename, identitas:req.files.identitas[0].filename}
                //     res.json(
                //         helper.globalRes(200, {fileLocation:data, avatar:req.body.file})
                //     )
                // }
                 console.log(typeof avatar);
                
                
            }
        })
    }

    return {
        doUpload,
        openFile,
        uploadAvatar
    }
}

module.exports = UploadCnt