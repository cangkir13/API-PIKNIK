const valEmail = require('./validateEmail');
const valProfile = require('./validateProfile');
const valAccount = require('./ValidateUserVerify');
const valAccountVendor = require('./ValidateVendorVerify');
const valBhsVendor = require('./ValidateBahasa');
const valKategori = require('./ValidateKategori');
const valFasilProd = require('./ValFasilProd');
const valDetailProd = require('./ValidateDetailProduct');

const Validation = {
    valEmail,
    valProfile,
    valAccount,
    valAccountVendor,
    valBhsVendor,
    valKategori,
    valFasilProd,
    valDetailProd
}

module.exports = Validation