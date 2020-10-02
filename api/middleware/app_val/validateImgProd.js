const MTrip = require('../../models/Product_trip_vendor');
const MimgProd = require('../../models/vendorImgProduct');

const validateImgProd = async(iduser, id_product, imgLgth) => {
    
    let data = await MTrip.findOne({
        where:{iduser, id_product:id_product}
    });

    if(!data) return {status:false, msg:"Product not found"}

    let dataImg = await MimgProd.findAll ({
        where:{iduser:iduser, 
            id_product:id_product
        }
    });
    
    if (dataImg.length == 5) {
        return {status:false, msg:"the product image is full "}
    }
    
    let Count = dataImg.length + imgLgth;
    if (Count > 5) {
        return {status:false, msg:`image of your product ${dataImg.length}, maximum image 5, you can only add ${5-dataImg.length}`}
    }
     
    return {status:true}
}

module.exports = validateImgProd