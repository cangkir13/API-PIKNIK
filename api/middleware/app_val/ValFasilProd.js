const Mfasilitas = require('../../models/Master_fasilitas_trip');

const validate = async(id_fasilitas) => {
    let dataFasil = await Mfasilitas.findAll({
        where:{id_fasilitas:id_fasilitas}
    });
    let mapFasil = dataFasil.map((el) => el.id_fasilitas)
    
    let filtermap = id_fasilitas.filter(el => !mapFasil.includes(el)) 
    // return filtermap

    if (filtermap.length> 0) {
        console.log('ada');
        return {status:false, msg:"No fasility found: "+JSON.stringify(filtermap)}
    } else {
        console.log('kosong');
        return {status:true, data:id_fasilitas}
    }

}

module.exports = validate