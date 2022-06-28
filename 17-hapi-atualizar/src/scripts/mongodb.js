// docker ps
// sudo docker exec -it 0c0144e100d9 mongo -u silviosilva -p minhasenhasecreta --authenticationDatabase herois

// show dbs
// use herois

// show collections

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

db.herois.find().pretty()

for(let i = 0; i <= 10000; i++) {
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
       
}

db.herois.count()
db.herois.findOne()
db.herois.find().limit(5).sort({nome: -1})
db.herois.find({}, {poder: 1, _id: 0})

db.herois.find({nome: 'Flash'})
db.herois.update({_id: ObjectId("62b4981139bb07fed28d3ebb")}, 
    {nome: 'Mulher Maravilha'})
db.herois.find({nome: 'Mulher Maravilha'})

db.herois.update({_id: ObjectId("62b4988139bb07fed28d65cb")},
    {$set: {nome: 'Lanterna Verde'}} )
db.herois.find({_id: ObjectId("62b4988139bb07fed28d65cb")})

db.herois.update({poder: 'Velocidade'}, {$set: {poder: 'Super-forca'}})

db.herois.remove({})
db.herois.remove({nome: 'Mulher Maravilha'})
