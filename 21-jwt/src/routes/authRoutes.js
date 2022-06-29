const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
const JWT = require('jsonwebtoken')

const failAction = (request, headers, error) => {
    throw error
}
const USER = {
    username: 'xuxadasilva',
    password: '123'
}
class AuthRoutes extends BaseRoute {
    constructor(secret) {
        super()
        this.secret = secret
    }

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'Obter token',
                notes:  'faz login com usuario e senha do banco',
                auth: false,
                validate: {
                    failAction,
                    payload: Joi.object({
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    })
                }
            },
            handler: async (request, head) => {
                try {
                    const { username, password } = request.payload

                    if(username.toLowerCase() !== USER.username ||
                       password !== USER.password) {
                        return Boom.unauthorized()
                    }

                    const token = JWT.sign({
                        username,
                        id: 1
                    }, this.secret)
                    return {
                        token
                    }
                } catch(error) {
                    console.error('Deu ruim', error)
                    return Boom.internal('Deu problema no login')
                }
            }
        }
    }
}

module.exports = AuthRoutes