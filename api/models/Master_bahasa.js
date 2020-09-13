const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'master_bahasa';

const master_bahasa = sequelize.define('master_bahasa', {
  id_bahasa: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  bahasa:{
    type:Sequelize.STRING,
  },
  update_at:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }

}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = master_bahasa;
