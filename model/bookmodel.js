const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: [String], required: true },
    yearPublished: { type: String, required: true },
    price: { type: Number, required: true }
})
const Book = mongoose.model('Book', BookSchema)
module.exports = Book