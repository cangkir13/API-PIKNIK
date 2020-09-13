const valEmail = require('./validateEmail');
const valProfile = require('./validateProfile')
const valAccount = require('./ValidateUserVerify');

const Validation = {
    valEmail,
    valProfile,
    valAccount,
}

module.exports = Validation