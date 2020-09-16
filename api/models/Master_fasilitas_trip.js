const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'master_fasilitas_trip';

const master_fasilitas_trip = sequelize.define('master_fasilitas_trip', {
  id_fasilitas: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fasilitas_name:{
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


module.exports = master_fasilitas_trip;
