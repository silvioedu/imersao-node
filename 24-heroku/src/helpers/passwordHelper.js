const Bcrypt = require('bcrypt')
const { promisify} = require('util')

const hashAsync = promisify(Bcrypt.hash)
const compareAsyc = promisify(Bcrypt.compare)

const SALT = parseInt(process.env.PASSWORD_SALT)

class PasswordHelper {

    static hashPassword(pass) {
        return hashAsync(pass, SALT)
    }
    static comparePassword(pass, hash) {
        return compareAsyc(pass, hash)
    }

}

module.exports = PasswordHelper