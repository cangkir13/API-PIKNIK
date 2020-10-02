const Mfasil = require('./Master_fasilitas_trip');
const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'relasi_fasilitas_product';

const relasi_fasilitas_product = sequelize.define('relasi_fasilitas_product', {
    id_product: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    id_fasilitas: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
  
}, {  tbl, timestamps:false, freezeTableName:true });

relasi_fasilitas_product.belongsTo(Mfasil, {foreignKey:'id_fasilitas', as:'FasilitasProduct'})

module.exports = relasi_fasilitas_product;
