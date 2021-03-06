const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'relasi_itinerary_product';

const relasi_itinerary_product = sequelize.define('relasi_itinerary_product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_detail: {
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
    iduser:{
        type: Sequelize.INTEGER,
    },
  
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = relasi_itinerary_product;
