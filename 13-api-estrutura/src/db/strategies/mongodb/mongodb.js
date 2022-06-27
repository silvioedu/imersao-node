const Mongoose = require('mongoose')
const ICrud = require('../interfaces/interface.crud')

const STATUS = {
     0: 'Desconectado',
     1: 'Conectado',
     2: 'Conectando',
     3: 'Disconectando'
}

class MongoDB extends ICrud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema = schema
    }

    async create(item) {
        return await this._schema.create(item)
    }

    async read(item, skip = 0, limit = 10) {
        return await this._schema.find(item).skip(skip).limit(limit)
    }

    async update(id, item) {
        return await this._schema.updateOne( { _id: id }, { $set: item } )
    }
    
    async delete(id) {
        return await this._schema.deleteOne({ _id: id })
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState]
        if (state === 'Conectado') return state;
        if (state !== 'Conectando') return state
        await new Promise(resolve => setTimeout(resolve, 1000))
        return STATUS[this._connection.readyState]    
    }

    static connect() {
        Mongoose.connect('mongodb://silviosilva:minhasenhasecreta@localhost:27017/herois', {
            useNewUrlParser: true 
        }, function(error) {
            if(!error) return
            console.error('Falha na conexão', error)
        })
       
        const connection = Mongoose.connection
        connection.once('open', () => console.log('Database rodando'))
        return connection   
    }

}

module.exports = MongoDB
