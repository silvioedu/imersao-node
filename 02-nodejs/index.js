/* 
1 - Obter o número de telefone de um usuario a partir de seu id 
2 - Obter o endereço do usuário pelo seu id
*/

function obterUsuario(callback) {
    setTimeout(function() {
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(function() {
        return callback(null, {
            numero: '12345678',
            ddd: 11
        })
    }, 2000)
}

function obterEndereco(idUsuario, callback) {
    setTimeout(function() {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)
}

obterUsuario(function resolverUsuario(error, usuario) {
    if (error) {
        console.error('Problemas no USUARIO', error)
        return
    }

    obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
        if (error1) {
            console.error('Problemas no TELEFONE', error1)
            return
        }

        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if (error2) {
                console.error('Problemas no ENDEREÇO', error2)
                return
            }

            console.log(`
                Nome: ${usuario.nome},
                Endereço: ${endereco.rua},${endereco.numero},
                Telefone: (${telefone.ddd}) ${telefone.numero}
            `)
        })
    })
})
// const telefone = obterTelefone(usuario.id)

// console.log(`Telefone: ${telefone}`)n