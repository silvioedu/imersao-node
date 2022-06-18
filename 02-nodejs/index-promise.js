/* 
1 - Obter o número de telefone de um usuario a partir de seu id 
2 - Obter o endereço do usuário pelo seu id
*/
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(function() {
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)    
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function (resolve, reject) {
        setTimeout(function() {
            return resolve({
                numero: '12345678',
                ddd: 11
            })
        }, 2000)    
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(function() {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)
}

const usuarioPromise = obterUsuario()

usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
            .then(function(telefone) {
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone
                }
            })
    })
    .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function (result) {
            return {
                usuario: resultado.usuario,
                endereco: result,
                telefone: resultado.telefone
            }
        })
    })
    .then(function (resultado) {
        console.log(`
            Nome: ${resultado.usuario.nome},
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero},
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.numero}
        `)
    })
    .catch(function (error) {
        console.error('Erro', error)
    })
