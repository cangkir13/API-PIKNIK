const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'vendor_img_product';

const vendor_img_product = sequelize.define('vendor_img_product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  id_product:{
    type:Sequelize.INTEGER,
  },
  iduser:{
    type:Sequelize.INTEGER,
  },
  gambar:{
    type:Sequelize.STRING,
  },
  judul:{
    type:Sequelize.STRING,
  },
  update_at:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }

}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = vendor_img_product;
