// validation file image of avatar OTW
// validation file content size avatar OTW

const UserProfile = require('../../models/User_profile');
const Maps = require('../../models/Area');
const birthDay = require('is-valid-birthdate')


const valAvatar = async(avatar) => {
    let Split = tgl_lahir.split('/');
    if (Split > 0 ) {
        let data = await UserProfile.findOne({
            where:{ avatar }
        });
        if (data) { 
            return {status:false, msg:"No Tlpn Data already axist"}
        }else{
            return {status:true}
        }    
    }else{
        return {status:false, msg:"Please enter true path/location/file.png"}
    }
    
}

const validateNotlp = async(no_telp) => {
    let lgthNO = no_telp.length
    
    if (lgthNO >= 9 && lgthNO <= 16 ) {
        let data = await UserProfile.findOne({
            where:{ no_telp }
        });
        if (data) { 
            return {status:false, msg:"No Tlpn Data already axist"}
        }else{
            return {status:true, data:"no data tlpn"}
        }
    }else{
        return {status:false, msg:"no tlp min lenght 9 and max lenght 16"}
        
    }
}

const validateNik = async(nik) => {
    let lgthNIK = nik.toString().length
    
    if (lgthNIK == 16) {
        let data = await UserProfile.findOne({
            where:{ nik }
        });
        
        if (!data) {
            return {status:true, data:"no data Nik"}
        }else{
            return {status:false, msg:"Nik Data already axist"}
        }
    }else{
        return {status:false, data:"Nik mush be 16 number"}
    }
    
}

const valLocation = async(DataArea) => {
    let data = await Maps.findOne({
        where:DataArea
    })
    if (!data) {
        return {status:false, msg:"data location not found"}
    }else{
        return {status:true, data}
    }
}

const valBirthDay = (tgl_lahir) => {
    let Split = tgl_lahir.split('/');
    
    if(Split.length < 2){
        return {status:false, msg:"format tgl_lahir mush be 'YYYY/mm/dd' with number"}
    }else{
        if (birthDay(tgl_lahir)) {
            return {status:true}
        } else {
            return {status:false, msg:"format tgl_lahir mush be 'YYYY/mm/dd' with number"}
        }
    }
}

const ValidateProfile = async(body) => {
    
    let data = []
    if(body.no_telp){
        data = await validateNotlp(body.no_telp);
        if (data.status == false) {
            return data
        } 
    }

    if (body.nik) {
        data = await validateNik(body.nik);
        if (data.status == false) {
            return data
        } 
    }

    if (body.tgl_lahir) {
        data = valBirthDay(body.tgl_lahir);
        
        if (data.status == false) {
            return data
        }
    }

    if (body.location ) {
        data = await valLocation(body.location);
        if (data.status == false) {
            return data
        }else{
            return data
        } 
    }
    

}


module.exports = ValidateProfile