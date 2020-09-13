const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'vendor_bahasa';

const vendor_bahasa = sequelize.define('vendor_bahasa', {
  id_vendor: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  id_bahasa:{
    type: Sequelize.INTEGER,
    primaryKey: true,
  },

}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = vendor_bahasa;
