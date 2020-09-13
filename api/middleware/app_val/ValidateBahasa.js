const masterbahasa = require('../../models/Master_bahasa');

const bahasaData = async(idbahasa) => {
    return await masterbahasa.findAll({
        where:{id_bahasa:idbahasa}
    })
}

const ValidateBahasa = async(idbahas, iduser) => {
    let databhs = await bahasaData(idbahas)
    let dataTbl = databhs.map((el) => {return el.id_bahasa})
    let filtermap = idbahas.filter(el => !dataTbl.includes(el)) 
    // console.log(filtermap);
    if (filtermap.length > 0) {
        return {status:false, msg:'Data are not found = '+ JSON.stringify(filtermap)}
    } else {
        let dataFiil = idbahas.map(el => {return {id_vendor:iduser, id_bahasa:el}})
        return {status:true, data:dataFiil}
    }
}

module.exports = ValidateBahasa    