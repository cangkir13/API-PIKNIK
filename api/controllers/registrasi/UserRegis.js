const helper = require('../../helper/');
const validate = require('../../middleware/app_val')
const userPre = require('../../models/User_privilage');
const moment = require('moment')

const UserRegis = () => {
    const index = async(req, res) => {
        try {
            const {email, password, password2} = req.body
            if (password2 === password ) {
                let client_code = helper.genCode(10);
                if (!await validate.valEmail(email) ) 
                    return res.status(403).json(
                        helper.globalRes(403, 'email already exist')
                    )
                
                await userPre.create({
                    email, password, client_code, update_at:moment()
                })
                let response = helper.globalRes(200, {email, msg:'data has been added'})
                return res.json(response);    
            }else{
                return res.status(400).json(helper.globalRes(400, "Password not match"));
            }
        } catch (error) {
            return res.status(500).json(helper.globalRes(500, error.message));
        }
        
    }

    return {
        index
    }
}

module.exports = UserRegis