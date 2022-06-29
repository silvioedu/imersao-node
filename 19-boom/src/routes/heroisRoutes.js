const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')

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
                    return Boom.internal('Deu problema no list')
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
                    return Boom.internal('Deu problema no create')
                }
            }
        }
    }

    patch() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                validate: {
                    failAction,
                    params: Joi.object({
                        id: Joi.string().required()
                    }),
                    payload: Joi.object({
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(20),
                    })
                }
            },
            handler: async (request, head) => {
                try {
                    const { id } = request.params
                    const { payload } = request

                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)

                    const result = await this.db.update(id, dados)

                    if (result.modifiedCount !== 1) {
                        return Boom.preconditionFailed('Id não localizado')
                    }

                    return {
                        message: 'Heroi atualizado com sucesso',
                        modifiedCount: result.modifiedCount
                    }
                } catch(error) {
                    console.error('Deu ruim', error)
                    return Boom.internal('Deu problema no patch')
                }
            }
        }
    }

    delete() {
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            config: {
                validate: {
                    failAction,
                    params: Joi.object({
                        id: Joi.string().required()
                    })
                }
            },
            handler: async (request, head) => {
                try {
                    const { id } = request.params
                    const result = await this.db.delete(id)

                    if (result.deletedCount !== 1) {
                        return Boom.preconditionFailed('Id não localizado')
                    }

                    return {
                        message: 'Heroi removido com sucesso',
                        deletedCount: result.deletedCount
                    }
                } catch(error) {
                    console.error('Deu ruim', error)
                    return Boom.internal('Deu problema no delete')
                }
            }
        }
    }
}

module.exports = HeroisRoutes