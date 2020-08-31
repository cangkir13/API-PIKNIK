const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'master_area';
const MasterArea = sequelize.define('master_area', {
    idlocation: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    provinsi:{
        type: Sequelize.STRING,
    },
    kabupaten: {
        type: Sequelize.STRING,
    },
    kecamatan: {
        type: Sequelize.STRING,
    },
    kelurahan: {
        type: Sequelize.STRING,
    },
    kodepos: {
        type: Sequelize.INTEGER,
    },
    latitude: {
        type: Sequelize.FLOAT,
    },
    longitude: {
        type: Sequelize.FLOAT,
    },
 
}, { tbl, timestamps:false, freezeTableName:true });


module.exports = MasterArea;