const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'vendor_img_legalitas';

const vendor_img_legalitas = sequelize.define('vendor_img_legalitas', {
  iduser: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  legalitas:{
    type:Sequelize.STRING,
  },
  update_at:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }

}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = vendor_img_legalitas;
