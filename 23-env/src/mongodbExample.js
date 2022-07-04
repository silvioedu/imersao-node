const Mongoose = require('mongoose')
Mongoose.connect('mongodb://silviosilva:minhasenhasecreta@localhost:27017/herois',
 { useNewUrlParser: true }, function(error) {
    if(!error) return
    console.error('Falha na conexão', error)
 })

 const connection = Mongoose.connection
 connection.once('open', () => console.log('Database rodando'))
 
//  setInterval(() => {
//      /* 
//      0 desconectado
//      1 conectado
//      2 conectando
//      3 disconectando
//      */
//     const state = connection.readyState
//     console.log('State: ', state)
// }, 1000)

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})
const model = Mongoose.model('heroi', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log('resultCadastrar', resultCadastrar)

    const listItens = await model.find()
    console.log('listItens', listItens)

}

main()