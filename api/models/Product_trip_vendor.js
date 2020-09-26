const MrelasiKategori = require('./Relasi_kategori_product');
const MrelasiFasil = require('./Relasi_fasilitas_product');
const MrelasiDetail = require('./Relasi_detail_product');
const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'product_trip_vendor';

const product_trip_vendor = sequelize.define('product_trip_vendor', {
  id_piknik: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  kode:{
    type:Sequelize.STRING,
  },
  name_piknik:{
    type:Sequelize.STRING,
  },
  keterangan:{
    type:Sequelize.STRING,
  },
  create_at:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  update_at:{
    type: Sequelize.DATE,
  },
  iduser: {
    type: Sequelize.INTEGER,
  },

}, {  tbl, timestamps:false, freezeTableName:true });

product_trip_vendor.hasMany(MrelasiKategori, {foreignKey:"id_product"});
product_trip_vendor.hasMany(MrelasiFasil, {foreignKey:"id_product"});
product_trip_vendor.hasMany(MrelasiDetail, {foreignKey:"id_product"});

// product_trip_vendor.belongsToMany(MrelasiKategori, {foreignKey:"id_product", through: Mkategori })
// product_trip_vendor.belongsToMany(MrelasiFasil, {foreignKey:"id_product", through: product_trip_vendor })
// MrelasiKategori.hasOne(Mkategori, {as:"id_kategori"})
// product_trip_vendor.belongsToMany(MrelasiKategori, { through: 'master_kategori_wisata' })


module.exports = product_trip_vendor;
