const ICrud = require('./interfaces/interface.crud')

class Postgres extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('O item foi salvo no Postgres')
    }
}

module.exports = Postgres   