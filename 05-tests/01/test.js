const assert = require('assert')
const {
    obterPessoas
} = require('./service')
const nock = require('nock')

describe('StarWars Tests', () => {
    
    beforeEach(() => {
        const response = {
            count: 1,
            results: [{
                name: 'R2-D2',
                height: '96'
            }]
        }

        nock('https://swapi.dev/api/people')
            .get('/?search=r2-d2&format=json')
            .reply(200, response)
    })


    it('deve buscar o r2d2 com o formato correto', async () => {
        const expected = [{ nome: 'R2-D2', peso: '96'}]
        const nomeBase = 'r2-d2'

        const result = await obterPessoas(nomeBase)
        assert.deepEqual(result, expected)
    })

})