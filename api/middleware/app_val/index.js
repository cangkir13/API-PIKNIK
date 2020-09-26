const valEmail = require('./validateEmail');
const valProfile = require('./validateProfile');
const valAccount = require('./ValidateUserVerify');
const valAccountVendor = require('./ValidateVendorVerify');
const valBhsVendor = require('./ValidateBahasa');
const valKategori = require('./ValidateKategori');
const valFasilProd = require('./ValFasilProd');
const valDetailProd = require('./ValidateDetailProduct');
const valRundowns = require('./ValidateRundowns');
const valImgProd = require('./validateImgProd')

const Validation = {
    valEmail,
    valProfile,
    valAccount,
    valAccountVendor,
    valBhsVendor,
    valKategori,
    valFasilProd,
    valDetailProd,
    valRundowns,
    valImgProd,
}

module.exports = Validation