const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

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
                    failAction: (request, headers, error) => {
                        throw error
                    },
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

}

module.exports = HeroisRoutes