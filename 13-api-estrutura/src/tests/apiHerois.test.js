const { deepEqual, ok } = require('assert')
const api = require('../api')

let app = {}
describe('Suite API Heroes', function () {

    this.beforeAll(async () => {
        app = await api
    })

    it('api /herois read ', async() => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        deepEqual(statusCode, 200)
        ok(Array.isArray(dados))
    })
    
})