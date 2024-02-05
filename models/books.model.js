const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const booksSchema = new mongoose.Schema({
    bookID: { type: Number, required: true },
    title: { type: String, required: true },
    authors: { type: String, required: true },
    average_rating: Number,
    isbn: String,
    isbn13: String,
    language_code: String,
    num_pages: Number,
    ratings_count: Number,
    text_reviews_count: Number,
    publication_date: Date,
    publisher: String
});

booksSchema.plugin(mongoosePaginate);

const Books = mongoose.model('Books', booksSchema, 'books');

module.exports = Books;
