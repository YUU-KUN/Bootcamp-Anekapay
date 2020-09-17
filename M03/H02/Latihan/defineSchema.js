var mongoose = require('mongoose');
var Schema = mongoose.Schema

var blogSchema = new Schema({ 
    title: String,
    comment: [{body: String, date: Date}],
    hidden: Boolean,
    meta: {
        favs: Number
    }
})

// define a schema
var animalSchema = new Schema({
    name: String, 
    type: String,
})

// assign a function to the 'methods' object of our animalSchema
animalSchema.methods.findSimilarTypes = function(ob){
    return mongoose.model('animal').find({ type: this.type},cb)
}

// HOW TO USE
var Animal = mongoose.model('Animal',animalSchema)
var dog = new Animal({type: 'dog',})
dog.findSimilarTypes(function(err,dogs){
    console.log(dogs) //woof
})