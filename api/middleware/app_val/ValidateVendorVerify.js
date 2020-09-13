const UserProfile = require('../../models/Vendor_profile');

const ValidateVendorVerify = async( iduser) => {
    let data = await UserProfile.findOne({
        where:{iduser}
    });
    return !data ? {status:true}:{status:false, msg:"Account has been exist"}
}

module.exports = ValidateVendorVerify