const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'vendor_profile';

const Vendor_profile = sequelize.define('vendor_profile', {
  id_vendor: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama_usaha:{
    type:Sequelize.STRING,
  },
  alamat_usaha:{
    type:Sequelize.STRING,
  },
  agree_term:{
    type:Sequelize.INTEGER,
  },
  create_at:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  update_at:{
    type:Sequelize.DATE,
  },
  iduser:{
    type:Sequelize.INTEGER,
  }

}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = Vendor_profile;
