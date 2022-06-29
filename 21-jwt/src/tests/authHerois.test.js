const { ok, deepEqual } = require('assert')
const api = require('./../api')

let app = {}
describe('Auth test suite', function() {

    this.beforeAll(async () => {
        app = await api
    })

    it('get Token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'XuxaDaSilva',
                password: '123'
            }
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        deepEqual(statusCode, 200)
        ok(dados.token.length > 10)
    })

})