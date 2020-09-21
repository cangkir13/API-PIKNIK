const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'relasi_detail_product';

const relasi_detail_product = sequelize.define('relasi_detail_product', {
  code_detail:{
    type:Sequelize.STRING,
    primaryKey: true,
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
    type:Sequelize.FLOAT,
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

}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = relasi_detail_product;
