const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const table_identitas = 'User_img_identitas';

const User_img_identitas = sequelize.define('user_img_identitas', {
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


module.exports = User_img_identitas;
