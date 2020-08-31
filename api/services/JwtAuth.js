const userAuth = require('../models/User_privilage');
const helper = require('../helper');
const JWTservise = require('./JwtService');
// const moment = require('moment');

module.exports = async(req, res, next) => {
    let client_code = req.header('Client_code');
    let Authorization = req.header('Authorization');
    console.log(client_code);
    
    // token payload
    let tokenVerify;
    // load client code as user
    let userclient;

    if (client_code && Authorization) {
        let parts = Authorization.split(' ');
        userclient = await userAuth.findOne({
            where:{
                client_code
            }
        })

        // cek Authorization header
        if (parts.length === 2) {
            const schema = parts[0]
            const creadentials = parts[1];
            if (/^Bearer$/.test(schema)) {
                tokenVerify = creadentials;
                // cek user data
                if (!userclient) {
                    return res.status(401).json(helper.globalRes(401, 'client code not Found'));
                }

                if (userclient.status < 1) 
                    return res.status(403).json(helper.globalRes(401, 'Your account is not active'));

            } else {
                return res.status(401).json(helper.globalRes(401, 'Format for Authorization: Bearer [token]'));
            }   

        } else {
            return res.status(401).json(helper.globalRes(401, 'Header Client_code and Authorization must be enter'));    
        }

    }else{
        return res.status(401).json(helper.globalRes(401, 'Header Client_code and Authorization must be enter'));
    }

    return JWTservise().verify(tokenVerify, client_code, (err, thisToken) => {
        if (err) {
            return res.status(401).json(helper.globalRes(401, err.message))
        } 

        req.users = {
            client_code,
            iduser:userclient.id,
            users:thisToken
        }
        return next()
    })
    
}
