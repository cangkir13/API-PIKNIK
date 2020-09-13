const UserProfile = require('../../models/User_profile');

const userValidate = async(id) => {
    let data = await UserProfile.findOne({
        where:{id}
    });
    return !data ? {status:true}:{status:false, msg:"Account has been axist"}
}

const ValidateUserVerify = async( id, type) => {
    switch (type) {
        case 'user':
                return await userValidate(id)
            break;
    
        default:
            break;
    }
}

module.exports = ValidateUserVerify