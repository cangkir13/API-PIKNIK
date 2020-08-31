const Uspriv = require('../../models/User_privilage');

const checkEmail = async(email) => {
    let data = await Uspriv.findOne({
        where:{email}
    });
    
    
    if (!data) {
        return true
    }else{
        return false
    }
}

module.exports = checkEmail