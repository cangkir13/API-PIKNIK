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

relasi_fasilitas_product.hasMany(Mfasil, {foreignKey:"id_fasilitas", otherKey:"id_fasilitas"})

module.exports = relasi_fasilitas_product;
