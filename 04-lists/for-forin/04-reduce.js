const { obterPessoas } = require('./service')

Array.prototype.MeuReduce = function(callback, valorInicial) {
  let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]

  for (let i = 0; i <= this.length - 1; i++) {
    valorFinal = callback(valorFinal, this[i], this)
  }
  return valorFinal
}


async function main() {
    try {
      const { results } = await obterPessoas('a')
      const pesos = results.map(item => parseInt(item.height))
      const result = pesos.reduce((prv, nxt) => { return prv + nxt}, 0)
      console.log(result)

      const minhaLista = [
        ['Erick', 'Wendel'],
        ['NodeBR', 'Nerdzao']
      ]
      const total = minhaLista.MeuReduce((anterior, proximo) => {
        return anterior.concat(proximo)
      }, [])
      .join(', ')
      console.log(total)


    } catch (error) {
        console.error(error)
    }
}

main()