const {
    deepEqual,
    ok
} = require('assert')

const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}
const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder: 'Energia do Anel',
    id: 2
}

describe('Suite de manipulação de herois', () => {
    before(async () => {
      await database.remover();
      await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
      await database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
    });
  
    it('deve cadastrar um heroi', async () => {
      const expected = DEFAULT_ITEM_CADASTRAR;
      await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
  
      const [realResult] = await database.listar(expected.id);
      deepEqual(realResult, expected);
    });
  
    it('deve listar um heroi pelo id', async () => {
      const expected = DEFAULT_ITEM_CADASTRAR;
      const result = await database.listar(1);
      deepEqual(result[0], expected);
    });
  
    it('deve remover um heroi pelo id', async () => {
        const expected = true;
        const result = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
        deepEqual(result, expected);
    });
  
    it('deve atualizar um heroi pelo id', async () => {
      const expected = {
        ...DEFAULT_ITEM_ATUALIZAR,
        nome: 'Batman',
        poder: 'Dinheiro',
      };
      await database.atualizar(expected.id, {
        nome: expected.nome,
        poder: expected.poder,
      });
  
      const [realResult] = await database.listar(expected.id);
      deepEqual(realResult, expected);
    });
  });