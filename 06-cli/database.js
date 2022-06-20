const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {

    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf-8')
        return JSON.parse(arquivo.toString())
    }

    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    async listar(id) {
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item => id ? item.id === id : true )
        return dadosFiltrados
    }

    async cadastrar(heroi) {
        
        const heroiComId = {
            id: heroi.id <= 2 ? heroi.id : Date.now(),
            ...heroi
        }

        const dados = [
            ...await this.obterDadosArquivo(),
            heroiComId
        ]
        const resultado = await this.escreverArquivo(dados)
        return resultado
    }

    async remover(id) {
        if(!id) {
            return await this.escreverArquivo([])
        }

        const dados = await this.obterDadosArquivo()
        const indice = await dados.findIndex(item => item.id === parseInt(id))
        if (indice === -1) {
            throw Error('O usuário não existe')
        }
        dados.splice(indice, 1)
        return await this.escreverArquivo(dados)
    }

    async atualizar(id, atualizacoes) {
        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex(item => item.id === parseInt(id));
        if (indice === -1) {
          throw Error('heroi não existe!');
        }
    
        const atual = dados[indice];
        dados.splice(indice, 1);
    
        //workaround para remover valores undefined do objeto
        const objAtualizado = JSON.parse(JSON.stringify(atualizacoes));
        const dadoAtualizado = Object.assign({}, atual, objAtualizado);
    
        return await this.escreverArquivo([...dados, dadoAtualizado]);
      }
    
      async remover(id) {
        if (!id) {
          await this.escreverArquivo([]);
          return true;
        }
    
        const dados = await this.obterDadosArquivo();
    
        const indice = dados.findIndex(item => item.id === parseInt(id));
        if (indice === -1) {
          throw Error('heroi não existe!');
        }
        const atual = dados[indice];
        dados.splice(indice, 1);
        await this.escreverArquivo(dados);
        return true;
      }
    }

module.exports = new Database()