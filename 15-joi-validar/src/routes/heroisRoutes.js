const BaseRoute = require('./base/baseRoute')

class HeroisRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, head) => {
                try {
                    const { skip, limit, nome } = request.query

                    let query = {}
                    if(nome) {
                        query.nome = nome
                    }
                    if(isNaN(skip)) {
                        console.error('skip nao e numero')
                        throw Error('O tipo do skip está incorreto')
                    }
                    if(isNaN(limit)) {
                        console.error('limit nao e numero')
                        throw Error('O tipo do limit está incorreto')
                    }
                    
                    return this.db.read(query, parseInt(skip), parseInt(limit))
                } catch(error) {
                    console.error('Deu ruim', error)
                    return 'Erro interno no GET'
                }
            }
        }
    }

}

module.exports = HeroisRoutes