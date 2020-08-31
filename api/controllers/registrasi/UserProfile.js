const helper = require('../../helper');
const Validate = require('../../middleware/app_val');
const Profileuser = require('../../models/User_profile');
const moment = require('moment')

const UserProfile = () => {
    const index = async(req, res) => {
        try {
            const {body} = req
            const {iduser} = req.users
            
            let validationUser = await Validate.valProfile(body)
                        
            if ( validationUser.status == false ) {
                return res.status(422).json(helper.globalRes(
                    422, validationUser
                ))
            }else{
                await Profileuser.create({
                    avatar:body.avatar,
                    fullname:body.fullname,
                    tgl_lahir:body.tgl_lahir,
                    idlocation:validationUser.data.idlocation,
                    alamat:body.alamat,
                    no_telp:body.no_telp,
                    nik:body.nik,
                    foto_ktp:body.foto_ktp,
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