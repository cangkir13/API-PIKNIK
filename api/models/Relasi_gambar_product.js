const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'relasi_gambar_product';

const relasi_gambar_product = sequelize.define('relasi_gambar_product', {
    id_gambar: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_product: {
        type: Sequelize.INTEGER,
    },
    gambar:{
        type:Sequelize.STRING,
    },
    judul:{
        type:Sequelize.STRING,
    },
    keterangan:{
        type:Sequelize.STRING,
    },
    create_at:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    update_at:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = relasi_gambar_product;
