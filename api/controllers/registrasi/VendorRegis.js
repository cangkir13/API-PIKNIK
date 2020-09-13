/**
 * @author lepek13
 * register Vendor
 * router POST /api/service/VendorUserRegis
 * insert model bahasa vendor and profile vendor
 */
const helper = require('../../helper');
const modelUserpre = require('../../models/User_privilage');
const modelUserprof = require('../../models/User_profile');
const modelVendor = require('../../models/Vendor_profile');
const modelVendorBahasa = require('../../models/vendor_bahasa');
const valAccountVen = require('../../middleware/app_val');
const sequlz = require('../../../config/database');
const moment = require('moment');

const VendorRegis = () => {
    /* Register for user are exist */
    const userVendorRegis = async(req, res) => {
        try {
            let transaction = await sequlz.transaction();
            const {users, body} = req
            if (body.agree_term !== 1) {
                return res.status(403).json(
                    helper.globalRes(403, "Please select agree_term = yes / 1 for approval")
                )
            }

            let AccountVen = await valAccountVen.valAccountVendor(users.iduser)
            if (AccountVen.status == false) {
                return res.status(403).json(
                    helper.globalRes(403, AccountVen.msg)
                )
            }

            let selectBhs = await valAccountVen.valBhsVendor(body.bahasa, users.iduser)
            if (selectBhs.status == false) {
                return res.status(403).json(
                    helper.globalRes(403, selectBhs.msg)
                )
            }
            
            await modelVendorBahasa.bulkCreate(selectBhs.data, 
                {transaction}).then((result) => {
                    console.log("ok");
                }).catch((err) => {
                    console.log(typeof err.message);
                });
            // let selectBhs = body.bahasa
            await modelVendor.create({
                nama_usaha:body.nama_usaha,
                alamat_usaha:body.alamat_usaha,
                aggree_term:1,
                update_at:moment(),
                iduser:users.iduser
            }, {transaction})

            await transaction.commit();  
            return res.status(201).json(
                helper.globalRes(201, "Account vendor has been created")
            )
        } catch (error) {
            await transaction.rollback();
            return res.status(500).json(
                helper.globalRes(500, "Sory any trouble "+error.message)
            )
        }
    }

    return {
        userVendorRegis,
    }
}

module.exports = VendorRegis