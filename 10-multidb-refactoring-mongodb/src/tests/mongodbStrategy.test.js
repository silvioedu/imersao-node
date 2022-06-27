const { deepEqual } = require('assert')
const ContextStrategy = require('../db/strategies/base/contextStrategy')
const MongoDB = require('../db/strategies/mongodb/mongodb')
const HeroisSchema = require('./../db/strategies/mongodb/schemas/heroisSchema')

let context = {}
const MOCK_HEROI_CADASTRAR = { nome: 'Mulher Maravilha', poder: 'Laço'}
const MOCK_HEROI_DEFAULT = { nome: `Homem Aranha-${Date.now()}`, poder: 'Super Teia'}
const MOCK_HEROI_ATUALIZAR = { nome: `Patolino-${Date.now()}`, poder: 'Velocidade'}
let MOCK_HEROI_ATUALIZAR_ID = ''

describe('MongoDB Suite de testes', function() {

    this.beforeAll(async function () {
        const connection = MongoDB.connect()
        context = new ContextStrategy(new MongoDB(connection, HeroisSchema))

        await context.create(MOCK_HEROI_DEFAULT)
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ATUALIZAR_ID = result._id
    })

    it('connection', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado'

        deepEqual(result, expected)
    })

    it('create', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
        
        deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
    })

    it('read', async () => {
        const [{ nome, poder}] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome })
        const result = {nome, poder}
        deepEqual(result, MOCK_HEROI_DEFAULT    )
    })

    it('update', async () => {
        const result = await context.update(MOCK_HEROI_ATUALIZAR_ID, {poder: 'Pernalonga'})
        deepEqual(result.modifiedCount, 1)
    })

    it('delete', async () => {
        const result = await context.delete(MOCK_HEROI_ATUALIZAR_ID)
        deepEqual(result.deletedCount, 1)
    })
})