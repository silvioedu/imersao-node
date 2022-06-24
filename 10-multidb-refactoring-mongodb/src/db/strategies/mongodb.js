const Mongoose = require('mongoose')
const ICrud = require('./interfaces/interface.crud')

const STATUS = {
     0: 'Desconectado',
     1: 'Conectado',
     2: 'Conectando',
     3: 'Disconectando'
}

class MongoDB extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null
    }

    async create(item) {
        return await this._herois.create(item)
    }

    async read(item, skip = 0, limit = 10) {
        return await this._herois.find(item).skip(skip).limit(limit)
    }

    async update(id, item) {
        return await this._herois.updateOne( { _id: id }, { $set: item } )
    }
    
    async delete(id) {
        return await this._herois.deleteOne({ _id: id })
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState]
        if (state === 'Conectado') return state;
        if (state !== 'Conectando') return state
        await new Promise(resolve => setTimeout(resolve, 1000))
        return STATUS[this._driver.readyState]    
    }

    async connect() {
        Mongoose.connect('mongodb://silviosilva:minhasenhasecreta@localhost:27017/herois', {
            useNewUrlParser: true 
        }, function(error) {
            if(!error) return
            console.error('Falha na conexão', error)
        })
       
        const connection = Mongoose.connection
        connection.once('open', () => console.log('Database rodando'))
        
        this._driver = connection
        this.defineModel()
    }

    defineModel() {
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
        
        //mocha workaround
        this._herois = Mongoose.models.herois || Mongoose.model('herois', heroiSchema)    
    }
}

module.exports = MongoDB
