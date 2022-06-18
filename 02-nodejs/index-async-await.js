/* 
1 - Obter o número de telefone de um usuario a partir de seu id 
2 - Obter o endereço do usuário pelo seu id
*/
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

function obterEndereco(idUsuario) {
    return new Promise(function (resolve, reject) {
        setTimeout(function() {
            return resolve({
                rua: 'dos bobos',
                numero: 0
            })
        }, 2000)
    })
}

async function main() {
    try {
        console.time('tempo-promise')
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEndereco(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEndereco(usuario.id)
        ])
        const telefone = resultado[0]
        const endereco = resultado[1]

        console.log(`
            Nome: ${usuario.nome},
            Endereco: ${endereco.rua}, ${endereco.numero},
            Telefone: (${telefone.ddd}) ${telefone.numero}
        `)
        console.timeEnd('tempo-promise')

    } catch(error) {
        console.error('Deu ruim', error)
    }
}

main()
