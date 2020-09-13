const multer = require('multer');
const path = require('path');
const fs = require('fs');

module.exports = Serviceupload = (disc) => {
    return multer({
        storage:multer.diskStorage({
            destination:disc,
            filename:function(req, file, cb){
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
            }
        }),
        limits:{
            fileSize: 1024 * 1024 * 50 // 1MB
        },
        fileFilter:function (req, file, cb) {
            let fileType = /jpeg|jpg|png/
            let mimetype = fileType.test(file.mimetype);
            let extname = fileType.test(path.extname(file.originalname).toLowerCase())
            if (mimetype && extname) {
                return cb(null, Date.now() + '_'+file.originalname);
            }
            return cb("Error: File upload only supports the following filetypes - " + fileType);
        }
    })
}