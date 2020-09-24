const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'relasi_detail_product';

const relasi_detail_product = sequelize.define('relasi_detail_product', {
  id_detail:{
    type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  iduser:{
    type:Sequelize.INTEGER
  },
  id_product: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  idlocation: {
    type: Sequelize.INTEGER,
  },
  start_point:{
    type:Sequelize.STRING,
  },
  kuota:{
    type:Sequelize.INTEGER,
  },
  price:{
    type:Sequelize.INTEGER,
  },
  terms_conditions:{
    type:Sequelize.STRING,
  },
  tgl_berangkat:{
    type: Sequelize.DATE,
  },
  tgl_pulang:{
    type: Sequelize.DATE,
  },
  create_at:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  update_at:{
    type: Sequelize.DATE,
    // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  close_order:{
    type: Sequelize.DATE,
  },
  point_lat:{
    type: Sequelize.DOUBLE
  },
  point_long:{
    type: Sequelize.DOUBLE
  },

}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = relasi_detail_product;
