const service = require('./service')

Array.prototype.MeuMap = function (callback) {
    const novoArrayMapeado = []
    for(let i = 0; i <= this.length - 1; i++) {
        const resultado = callback(this[i], i)
        novoArrayMapeado.push(resultado)
    }
    return novoArrayMapeado
}

async function main() {
    try {
      const result = await service.obterPessoas('a')
      
      console.time('forEach')
      const names = []
      result.results.forEach(function (item) {
        names.push(item.name)
      })
      console.timeEnd('forEach')

      console.time('map')
      const namesMap = result.results.map(function (item) {
        return item.name
      })
      console.timeEnd('map')

      console.time('mapSimpler')
      const namesMapSimpler = result.results.map(item => item.name)
      console.timeEnd('mapSimpler')

      console.time('array')
      const namesArray = result.results.MeuMap((pessoa, indice) => {
        return `[${indice}] ${pessoa.name}`
      })
      console.timeEnd('array')

      console.log(namesArray)
    } catch (error) {
        console.error(error)
    }
}

main()