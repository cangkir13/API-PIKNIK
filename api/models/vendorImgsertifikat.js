const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'vendor_img_sertifikat';

const vendor_img_sertifikat = sequelize.define('vendor_img_sertifikat', {
  iduser: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  sertifikat:{
    type:Sequelize.STRING,
  },
  update_at:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }

}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = vendor_img_sertifikat;
