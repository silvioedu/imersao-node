const { program } = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {
    program
        .option('-n, --nome [value]', 'Nome do heroi')
        .option('-p, --poder [value]', 'Poder do heroi')
        .option('-i, --id [value]', 'Id do heroi')

        .option('-c, --cadastrar', 'Cadastrar um heroi')
        .option('-l, --listar', 'Listar um heroi')
        .option('-r, --remover', 'Remover um heroi por id')
        .option('-a, --atualizar [value]', 'Atualizar um heroi por id')
        .parse(process.argv);

    const options = program.opts();
    const heroi = new Heroi(options)
    console.info(heroi)

    try {
        if (options.cadastrar) {
            delete heroi.id
            const resultado = await Database.cadastrar(heroi)
            if(!resultado) {
                console.error('Heroi não foi cadastrado')
                return
            }
            console.log('Heroi cadastrado com sucesso')
        }
        if (options.listar) {
            const resultado = await Database.listar()
            console.log(resultado)
        }
        if (options.remover) {
            const resultado = await Database.remover(heroi.id)
            if(!resultado) {
                console.error('Heroi não foi removido')
                return
            }
            console.log('Heroi removido com sucesso')
        }
        if (options.atualizar) {
            const idParaAtualizar = parseInt(options.atualizar)
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
            if(!resultado) {
                console.error('Não foi possível atualizar o heroi')
                return
            }
            console.log('Heroi atualizado com sucesso')
        }
    } catch (error) {
        console.error('Deu ruim', error)
    }
}

main()