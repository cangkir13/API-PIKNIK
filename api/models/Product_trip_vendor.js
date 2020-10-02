const MrelasiKategori = require('./Relasi_kategori_product');
const MrelasiFasil = require('./Relasi_fasilitas_product');
const MrelasiDetail = require('./Relasi_detail_product');
const ImgProd = require('./vendorImgProduct');

const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'product_trip_vendor';

const product_trip_vendor = sequelize.define('product_trip_vendor', {
  id_product: {
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

// product_trip_vendor.hasMany(MrelasiDetail, {foreignKey:"idlocation", otherKey:'idlocation'})
// product_trip_vendor.hasMany(MrelasiDetail, {foreignKey:'id_product'});
// MrelasiDetail.belongsTo(product_trip_vendor, {foreignKey:'id_product',  as: 'ProductDetail', constraints: false })
product_trip_vendor.hasMany(ImgProd, {foreignKey:"id_product", as:'ProductImg',})
ImgProd.belongsTo(product_trip_vendor, {foreignKey:"id_product", constraints: false })

product_trip_vendor.hasMany(MrelasiKategori, {foreignKey:"id_product"})
product_trip_vendor.hasMany(MrelasiFasil, {foreignKey:"id_product"})

// Profile.hasMany(product_trip_vendor, {foreignKey:"iduser"})

// ImgProd.belongsTo(product_trip_vendor, {foreignKey:"id_product",  constraints: false })

module.exports = product_trip_vendor;
