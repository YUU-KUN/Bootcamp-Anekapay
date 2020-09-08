// include mongoose in our project 
const mongoose = require('mongoose');

// open a connection to the aneka database on our locally running instance of MongoDB
mongoose.connect('mongodb://localhost/aneka', { useNewUrlParser: true })

// We now need to get notified if we connect successfully or if a connection error occurs
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('We are connectd!')
})

// We've got a schema with one property, name, which will be a String
const kittySchema = new mongoose.Schema({
    name: String
})

// compiling our schema into a Model
const Kitten = mongoose.model('Kitten', kittySchema)

// A model is a class with which we construct documents. 
// In this case, each document will be a kitten with properties and behaviors as declared in our schema. 
const silence = new Kitten({ name: 'Silence' })
console.log(silence.name) // 'Silence'

// add "speak" functionality to our documents
kittySchema.methods.speak = function () {
    const greeting = this.name
        ? 'Meow nime is ' + this.name
        : 'I dont have a name'
    console.log(greeting)
}

// Functions added to the methods property of a schema get compiled into the Model prototype and exposed on each document instance:
const fluffy = new Kitten({ name: 'fluffy' })
fluffy.speak(); // "Meow name is fluffy"

// Each document can be saved to the database by calling its save method.
fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak()
});

// Say we want to display all the kittens we've seen
Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
})

// If we want to filter our kittens by name, Mongoose supports MongoDBs rich querying syntax.
Kitten.find({ name: '/^fluff/' }, callback)
// This performs a search for all documents with a name property that begins with "fluff"
// and returns the result as an array of kittens to the callback.