const { equal, deepEqual } = require('assert')
const Postgres = require('../db/strategies/postgres/postgres')
const ContextStrategy = require('../db/strategies/base/contextStrategy')
const HeroisSchema = require('./../db/strategies/postgres/schemas/heroisSchema')

let context = {}
const MOCK_HEROI_CADASTRAR = { nome: 'Gaviao Negro', poder: 'flexas' };
const MOCK_HEROI_ATUALIZAR = { nome: 'Batman', poder: 'dinheiro' };

describe('PostgreSQL Strategy', function() {
    this.timeout(500)

    this.beforeAll(async () => {
      const connection = await Postgres.connect()
      const model = await Postgres.defineModel(connection, HeroisSchema)

      context = new ContextStrategy(new Postgres(connection, model))
      await context.delete()
      await context.create(MOCK_HEROI_ATUALIZAR)
    })

    it('connection', async () => {
        const result = await context.isConnected()
        equal(result, true)
    })

    it('create', async () => {
        const result = await context.create(MOCK_HEROI_CADASTRAR);
        delete result.id
        deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    
    it('read', async () => {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        delete result.id
        deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('update', async () => {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome });
    
        const novoItem = {
          ...MOCK_HEROI_ATUALIZAR,
          nome: 'Mulher Maravilha',
        };
        const [result] = await context.update(itemAtualizar.id, novoItem);
        const [itemAtualizado] = await context.read({ id: itemAtualizar.id })
        deepEqual(result, 1);
        deepEqual(itemAtualizado.nome, novoItem.nome);
      });

      it('delete', async () => {
        const [item] = await context.read({});
        const result = await context.delete(item.id);
        deepEqual(result, 1);
      });
})