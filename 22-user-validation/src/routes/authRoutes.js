const Joi = require('joi')
const Boom = require('boom')
const JWT = require('jsonwebtoken')

const BaseRoute = require('./base/baseRoute')
const PasswordHelper = require('./../helpers/passwordHelper')

const failAction = (request, headers, error) => {
    throw error
}
const USER = {
    username: 'xuxadasilva',
    password: '123'
}
class AuthRoutes extends BaseRoute {
    constructor(secret, db) {
        super()
        this.secret = secret
        this.db = db
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

                    // if(username.toLowerCase() !== USER.username ||
                    //    password !== USER.password) {
                    //     return Boom.unauthorized()
                    // }

                    const [usuario] = await this.db.read({ username: username.toLowerCase()})
                    if (!usuario) {
                        return Boom.unauthorized('O usuario informado nao existe')
                    }

                    if(!await PasswordHelper.comparePassword(password, usuario.password)){
                        return Boom.unauthorized('Usuario/senha invalidos')
                    }

                    const token = JWT.sign({
                        username,
                        id: usuario.id
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