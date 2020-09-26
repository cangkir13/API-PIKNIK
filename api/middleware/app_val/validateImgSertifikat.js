const MSertifikat = require('../../models/vendorImgsertifikat');

const validateImgSertifikat = async(iduser, imgLgth) => {

    let dataImg = await MSertifikat.findAll ({
        where:{iduser}
    });
    
    if (dataImg.length == 3) {
        return {status:false, msg:"You have reached the file limit, max 3 files"}
    }
    
    let Count = dataImg.length + imgLgth;
    if (Count > 3) {
        return {status:false, msg:`image of your sertifikat ${dataImg.length}, maximum image 3, you can only add ${3-dataImg.length}`}
    }
     
    return {status:true}
}

module.exports = validateImgSertifikat