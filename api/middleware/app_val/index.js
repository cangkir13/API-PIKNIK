const valEmail = require('./validateEmail');
const valProfile = require('./validateProfile');
const valAccount = require('./ValidateUserVerify');
const valAccountVendor = require('./ValidateVendorVerify');
const valBhsVendor = require('./ValidateBahasa');
const valKategori = require('./ValidateKategori')

const Validation = {
    valEmail,
    valProfile,
    valAccount,
    valAccountVendor,
    valBhsVendor,
    valKategori,
}

module.exports = Validation