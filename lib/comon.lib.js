const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
module.exports = {
    hashPass: (payload, salt = 10) => {
        return bcrypt.hash(payload, salt)
    },
    comparePass: (payload, hash) => {
        return bcrypt.compare(payload, hash)
    },
    jwt: (payload) => {
        return jsonwebtoken.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '10d'
        })
    }

}