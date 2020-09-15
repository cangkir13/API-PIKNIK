const masterKategori = require('../../models/Master_kategori_wisata');

const bahasaData = async(id) => {
    return await masterKategori.findAll({
        where:{id}
    })
}

const Validatekategori = async(idkate) => {
    let dataKate = await bahasaData(idkate)
    let dataTbl = dataKate.map((el) => {return el.id})
    let filtermap = idkate.filter(el => !dataTbl.includes(el)) 
        
    if (filtermap.length > 0) {
        return {status:false, msg:'Data are not found = '+ JSON.stringify(filtermap)}
    } else {
        let dataFiil = dataKate.map(el => {return el.name})
        return {status:true, data:dataFiil}
    }
}

module.exports = Validatekategori    