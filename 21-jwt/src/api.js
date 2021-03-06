const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const HapiJwt = require('hapi-auth-jwt2')

const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroisSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroisRoutes = require('./routes/heroisRoutes')
const AuthRoutes = require('./routes/authRoutes')

const JWT_SECRET = 'MEU_SEGREDAO_123'
const app = new Hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroisSchema))
    const swaggerOptions = {
        info: {
                title: 'API Herois #CursoErickWendel',
                version: 'v1.0'
        }
    }

    await app.register([
        HapiJwt,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    
    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        // options: {
        //     expiresIn: 20
        // }
        validate: (dado, request) => {


            return {
                isValid: true
            }
        }
    })
    app.auth.default('jwt')
    
    app.route([
        ...mapRoutes(new HeroisRoutes(context), HeroisRoutes.methods()),
        ...mapRoutes(new AuthRoutes(JWT_SECRET), AuthRoutes.methods())
    ])


    await app.start()
    console.log('Servidor rodando na porta', app.info.port)

    return app
}

module.exports = main()