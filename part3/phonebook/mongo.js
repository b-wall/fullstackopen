const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://b-wall:${password}@cluster0.8pebczm.mongodb.net/Phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    mongoose.connect(url)
        .then((results) => {
            console.log('phonebook:')
        })
        .then(Person.find({})
            .then(results => {
                results.forEach((result) => {
                    console.log(`${result.name} ${result.number}`)
                })
                mongoose.connection.close()
            }))
        .catch(err => console.log(err))
}

else {
    mongoose.connect(url)
        .then((result) => {
            const person = new Person({
                name: process.argv[3],
                number: process.argv[4]
            })

            return person.save()
        })
        .then(() => {
            return mongoose.connection.close()
        })
        .catch(err => console.log(err))
}

// mongoose.connect(url)
// .then((result) => {
//     console.log('connected')

//     const person = new Person({
//         name: process.argv[3],
//         number: process.argv[4]
//     })

//     return note.save()
// })
// .then(() => {
//     console.log('note saved!')
//     return mongoose.connection.close()
// })
// .then(Note.find({}).then(results => {
//     results.forEach((result) => {
//         console.log(result)
//     })
//     mongoose.connection.close()
// }))
// .catch((err) => console.log(err))