const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'relasi_itenerary_product';

const relasi_itenerary_product = sequelize.define('relasi_itenerary_product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_product: {
        type: Sequelize.INTEGER,
    },
    judul_acara:{
        type:Sequelize.STRING,
    },
    keterangan:{
        type:Sequelize.STRING,
    },
    tgl_mulai:{
        type: Sequelize.DATE,
    },
    tgl_akhir:{
        type: Sequelize.DATE,
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


module.exports = relasi_itenerary_product;
