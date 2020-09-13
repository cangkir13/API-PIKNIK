const avatar = require('../../models/UserImgAvatar');
const identitas = require('../../models/UserImgIdentitas');

const userAvatar = async(iduser) => {
    let avatars = await avatar.findOne({
        where:{iduser}
    });
    return !avatars ? {status:true}:{status:false, msg:"Avatar is axist"}
}

const userIdentitas = async(iduser) => {
    let Identitas = await identitas.findOne({
        where:{iduser}
    });
    return !Identitas ? {status:true}:{status:false, msg:"Avatar is axist"}
}

const validateImageType = async(type, id) => {
    switch (type) {
        case 'avatar':
            return await userAvatar(id)
        case 'identitas':
            return await userIdentitas(id)    
            
        default:

            return {status:false, msg:'args are (type, id)'}
    }
}

module.exports = validateImageType