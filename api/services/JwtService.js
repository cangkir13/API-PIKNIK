const JWT = require('jsonwebtoken');

const JwtService = () => {
    const issue = (payload, secret) => {
        return JWT.sign(payload, secret, { expiresIn: 60 * 60 * 60 })
    } 

    const verify = (token, secret, cb) => {
        return JWT.verify(token, secret, {}, cb)
    }

    return {
        issue,
        verify,
    }
}

module.exports = JwtService