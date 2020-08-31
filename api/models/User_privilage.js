const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const helper = require('../helper/');

const hooks = {
    beforeCreate(User_privilage) {
      User_privilage.password = helper.bcrypt().password(User_privilage); 
    }
  }

const tbl = 'user_privilage';
const User_privilage = sequelize.define('user_privilage', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email:{
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    client_code: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.INTEGER,
    },
    create_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    update_at: {
        type: Sequelize.DATE,
    },
 
}, { hooks, tbl, timestamps:false, freezeTableName:true });


module.exports = User_privilage;
