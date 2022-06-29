const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroisSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroisRoutes = require('./routes/heroisRoutes')

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
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    app.route(mapRoutes(new HeroisRoutes(context), HeroisRoutes.methods()))

    await app.start()
    console.log('Servidor rodando na porta', app.info.port)

    return app
}

module.exports = main()