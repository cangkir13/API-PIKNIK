/**
 * USER LOGIN
 */

const helper = require('../helper');
const JwtLogin = require('../services/JwtService');
const UserPr = require('../models/User_privilage');

const Login = () => {
    const index = async(req, res) => {
        try {
            const {email, password} = req.body
            let dataUser = await UserPr.findOne({
                where:{
                    email
                }
            })

            if (!dataUser) 
                return res.status(404).json(helper.globalRes(404, 'User not found'))
            
            if (dataUser.status < 1) 
                return res.status(403).json(helper.globalRes(403, 'Your account non active'))    

            let decript = helper.bcrypt().comparePassword(password, dataUser.password);
            if (decript) {
                let token = JwtLogin().issue({email}, dataUser.client_code);
                let expert = JwtLogin().verify(token, dataUser.client_code);

                return res.json(
                    helper.globalRes(200, {
                        type:"Bearer",
                        token,
                        expired:expert.exp,
                    })
                )
            } else {
                return res.status(401).json(
                    helper.globalRes(401, "Ops sory your account denide")
                )
            }

        } catch (error) {
            return res.status(500).json(helper.globalRes(500, error.message))
        }
    }

    return {
        index
    }
}

module.exports = Login