const { deepEqual, ok, notEqual } = require('assert')
const api = require('../api')

const MOCK_DEFAULT_CADASTRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta Bionica'
}

let app = {}
describe('Suite API Heroes', function () {

    this.beforeAll(async () => {
        app = await api
    })

    it('api /herois read ', async() => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10&nome=dsa'
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

    it('api /herois read with invalid query limit', async () => {
        const limit = 'asd'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${limit}`
        })

        const errorResult = {
            "statusCode": 400,
            "error": "Bad Request",
            "message": "\"limit\" must be a number",
            "validation": {
                "source": "query",
                "keys": [
                    "limit"
                ]
            }
        }

        deepEqual(result.statusCode, 400)
        deepEqual(result.payload, JSON.stringify(errorResult))
    })

    it('api /herois read with invalid query skip', async () => {
        const skip = 'asd'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=${skip}`
        })

        const errorResult = {
            "statusCode": 400,
            "error": "Bad Request",
            "message": "\"skip\" must be a number",
            "validation": {
                "source": "query",
                "keys": [
                    "skip"
                ]
            }
        }

        deepEqual(result.statusCode, 400)
        deepEqual(result.payload, JSON.stringify(errorResult))
    })

    it('api /herois create ', async() => {
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_DEFAULT_CADASTRAR)
        })

        const statusCode = result.statusCode
        const { message, _id } = JSON.parse(result.payload)

        ok(statusCode === 200)
        deepEqual(message, 'Heroi cadastrado com sucesso')
        notEqual(_id, undefined)
    })


})