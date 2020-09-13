const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const table_identitas = 'User_identitas';

const User_identitas = sequelize.define('user_identitas', {
  iduser: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  identitas:{
    type:Sequelize.STRING,
  },
  update_at:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }

}, {  table_identitas, timestamps:false, freezeTableName:true });


module.exports = User_identitas;
