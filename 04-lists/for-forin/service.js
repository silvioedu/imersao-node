const axios = require('axios').default
const URL = 'https://swapi.dev/api/people'

async function obterPessoas (nome) {
    const url = `${URL}/?search=${nome}&format=json`
    console.log(url)
    const response = await axios.get(url)
    return response.data
}

// obterPessoas('r2')
//     .then(resultado => console.log('Resultado', resultado))
//     .catch(error => console.error(error))

module.exports = {
    obterPessoas
}