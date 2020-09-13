const helper = require('../../helper');
const userPre = require('../../models/User_privilage');
const moment = require('moment');

const Profile = () => {
    const index = async(req, res) => {
        try {
            
            // var form = new formdata()
            // console.log(req.body);
            let foo = await validate.valAccount(req.users.iduser )
            if(foo.status === false)
                return res.status(403).json(
                    helper.globalRes(403, foo)
                )
            return res.json(
                helper.globalRes(200, {foo, users:req.users})
            )
        } catch (error) {
            return res.status(500).json(
                helper.globalRes(500, error.message)
            )
        }
    }

    return {
        index
    }
}

module.exports = Profile