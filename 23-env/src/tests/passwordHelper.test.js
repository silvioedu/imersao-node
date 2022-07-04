const { ok, deepEqual} = require('assert')
const { resourceLimits } = require('worker_threads')
const PasswordHelper = require('./../helpers/passwordHelper')

const SENHA = 'Silvio@123467890'
const HASH = '$2b$04$tW5/5fVXd.3WK8wTcy5thOVHktrZjHrhQX2hSvEYjCOGTXHAd0qKm'

describe('PasswordHelper test suite', function() {

    it('should generate a hash from a password', async () => {
        const result = await PasswordHelper.hashPassword(SENHA)

        ok(result.length > 10)
    })

    it('should compare a password to a hash', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)

        ok(result === true)
    })

})