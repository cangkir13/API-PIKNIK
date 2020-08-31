const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const table_users = 'User_profile';

const User_profile = sequelize.define('user_profile', {
  id_profile: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  avatar:{
    type:Sequelize.STRING,
  },
  fullname:{
    type:Sequelize.STRING,
  },
  tgl_lahir:{
    type:Sequelize.DATE,
  },
  idlocation:{
    type:Sequelize.INTEGER,
  },
  alamat:{
    type:Sequelize.STRING,
  },
  no_telp:{
    type:Sequelize.STRING,
  },
  nik:{
    type:Sequelize.STRING,
  },
  foto_ktp:{
    type:Sequelize.STRING,
  },
  update_at:{
    type:Sequelize.DATE,
  },
  id:{
    type:Sequelize.INTEGER,
  }

}, {  table_users, timestamps:false, freezeTableName:true });


module.exports = User_profile;
