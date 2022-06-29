const { ok, deepEqual } = require('assert')
const api = require('./../api')
const Context = require('./../db/strategies/base/contextStrategy')
const Postgres = require('./../db/strategies/postgres/postgres')
const UsuarioSchema = require('./../db/strategies/postgres/schemas/usuarioSchema')

const MOCK_USER = {
    username: 'xuxadasilva',
    password: '123'
}
const USER_DB = {
    ...MOCK_USER,
    password: '$2b$04$IGzT4dtdOSpF8LmFPNtK3O5G9V79APofbAt.v6dHaEz6Qqv.C1PCq' //123
}

let app = {}
describe('Auth test suite', function() {

    this.beforeAll(async () => {
        app = await api

        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, UsuarioSchema)
        const postgres = new Context(new Postgres(connection, model))
        await postgres.update(null, USER_DB, true)
    })

    it('get Token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: MOCK_USER
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        deepEqual(statusCode, 200)
        ok(dados.token.length > 10)
    })

    it('get Token unauthorized user not found', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'lalallelel',
                password: '123sada'
            }
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        deepEqual(statusCode, 401)
        deepEqual(dados.error,  'Unauthorized')
        deepEqual(dados.message, 'O usuario informado nao existe')
    })

    it('get Token unauthorized incorrect password', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                ...MOCK_USER,
                password: '475'
            }
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        deepEqual(statusCode, 401)
        deepEqual(dados.error,  'Unauthorized')
        deepEqual(dados.message, 'Usuario/senha invalidos')
    })

})