/**
 * @author lepek13
 * register detail profile users
 * router POST /api/service/ProfileRegis
 */

const helper = require('../../helper');
const Validate = require('../../middleware/app_val');
const Profileuser = require('../../models/User_profile');
const moment = require('moment');

const UserProfile = () => {
    const index = async(req, res) => {
        try {
            const {body} = req
            const {iduser} = req.users
            
            let validationUser = await Validate.valProfile(body)
            // console.log(validationUser);
            
            if ( validationUser.status == false ) {
                return res.status(422).json(helper.globalRes(
                    422, validationUser
                ))
            } 
            let validateAccount = await Validate.valAccount(iduser, 'user')
            if (validateAccount.status !== true) {
                return res.status(403).json(helper.globalRes(
                    403, validateAccount
                ))
            }  else{
                let indo = (!validationUser.data)?null:validationUser.data.idlocation;
                // console.log(indo);
                
                await Profileuser.create({
                    fullname:body.fullname,
                    tgl_lahir:body.tgl_lahir,
                    idlocation:indo,
                    country:(!body.country)?null:body.country,
                    state:(!body.state)?null:body.state,
                    alamat:body.alamat,
                    no_telp:body.no_telp,
                    nik:body.nik,
                    update_at:moment(),
                    id:iduser,
                });

                return res.json(
                    helper.globalRes(201, {msg:"Data has been added"})
                )
            }

        } catch (error) {
            return res.status(500).json(helper.globalRes(500, error.message));
        }
    }

    return {
        index
    }
}

module.exports = UserProfile