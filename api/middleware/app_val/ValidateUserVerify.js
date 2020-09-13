const VendorProfile = require('../../models/User_profile');

const ValidateUserVerify = async( id) => {
    let data = await VendorProfile.findOne({
        where:{id}
    });
    return !data ? {status:true}:{status:false, msg:"Account has been exist"}
}

module.exports = ValidateUserVerify