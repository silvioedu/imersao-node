const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

const failAction = (request, headers, error) => {
    throw error
}

class HeroisRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                validate: {
                    failAction,
                    query: Joi.object({
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    })
                }
            },
            handler: (request, head) => {
                try {
                    const { skip, limit, nome } = request.query
                    const query = nome ? { nome: {$regex: `.*${nome}*.`} } : {}

                    return this.db.read(query, skip, limit)
                } catch(error) {
                    console.error('Deu ruim', error)
                    return 'Erro interno no GET'
                }
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                validate: {
                    failAction,
                    payload: Joi.object({
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(20),
                    })
                }
            },
            handler: async (request, head) => {
                try {
                    const { nome, poder } = request.payload
                    const result = await this.db.create({ nome, poder })

                    return {
                        message: 'Heroi cadastrado com sucesso',
                        _id: result._id
                    }
                } catch(error) {
                    console.error('Deu ruim', error)
                    return 'Erro interno no POST'
                }
            }
        }
    }

}

module.exports = HeroisRoutes