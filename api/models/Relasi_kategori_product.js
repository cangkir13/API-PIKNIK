const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'relasi_kategori_product';

const relasi_kategori_product = sequelize.define('relasi_kategori_product', {
    id_product: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    id_kategori: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
  
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = relasi_kategori_product;
