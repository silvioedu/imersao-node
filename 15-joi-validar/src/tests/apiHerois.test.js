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
            url: '/herois?skip=0&limit=10'
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        deepEqual(statusCode, 200)
        ok(Array.isArray(dados))
    })
  
    it('api /herois read with skip and limit', async () => {
        const limit = 3
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${limit}`
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        deepEqual(statusCode, 200)
        ok(Array.isArray(dados))
        ok(dados.length === limit)
    })

    it('api /herois read with skip limit and nome', async () => {
        const limit = 3
        const nome = 'Homem Aranha-1656079789370'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${limit}&nome=${nome}`
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        deepEqual(statusCode, 200)
        ok(Array.isArray(dados))
        ok(dados.length === 1)
        deepEqual(dados[0].nome, nome)
    })


    it('api /herois read with invalid query string', async () => {
        const limit = 'asd'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${limit}`
        })

        deepEqual(result.payload, 'Erro interno no GET')
    })

})