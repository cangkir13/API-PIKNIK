const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const table_avatar = 'User_img_avatar';

const User_img_avatar = sequelize.define('user_img_avatar', {
  iduser: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  avatar:{
    type:Sequelize.STRING,
  },
  update_at:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }

}, {  table_avatar, timestamps:false, freezeTableName:true });


module.exports = User_img_avatar;
