const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'master_kategori_wisata';

const master_kategori_wisata = sequelize.define('master_kategori_wisata', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name:{
    type:Sequelize.STRING,
  },
  create_at:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  update_at:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }

}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = master_kategori_wisata;
