const avatar = require('../../models/UserImgAvatar');
const identitas = require('../../models/UserImgIdentitas');
const legalitas = require('../../models/vendorImglegalitas');
const sertifikat = require('../../models/vendorImgsertifikat');

const userAvatar = async(iduser) => {
    let avatars = await avatar.findOne({
        where:{iduser}
    });
    return !avatars ? {status:true}:{status:false, msg:"Avatar is exist"}
}

const userIdentitas = async(iduser) => {
    let Identitas = await identitas.findOne({
        where:{iduser}
    });
    return !Identitas ? {status:true}:{status:false, msg:"Identity is exist"}
}

const vendorLegalitas = async(iduser) => {
    let Legalistas = await legalitas.findOne({
        where:{iduser}
    });
    return !Legalistas ? {status:true}:{status:false, msg:"Legality is exist"}
}

const vendorSertifikat = async(iduser) => {
    let Sertifikat = await sertifikat.findAll({
        where:{iduser}
    });
    let mapSerfkat = Sertifikat.map((el) => el.iduser);
    return mapSerfkat.length < 3 ? {status:true}:{status:false, msg:'You have reached the file limit, max 3 files'}
}

const validateImageType = async(type, id) => {
    switch (type) {
        case 'avatar':
            return await userAvatar(id)
        case 'identitas':
            return await userIdentitas(id)
        case 'legalitas':
            return await vendorLegalitas(id)
        default:

            return {status:false, msg:'args are (type, id)'}
    }
}

module.exports = validateImageType