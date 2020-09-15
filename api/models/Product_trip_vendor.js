const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'product_trip_vendor';

const product_trip_vendor = sequelize.define('product_trip_vendor', {
  id_piknik: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  kode:{
    type:Sequelize.STRING,
  },
  name_piknik:{
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
  },
  iduser: {
    type: Sequelize.INTEGER,
  },

}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = product_trip_vendor;
