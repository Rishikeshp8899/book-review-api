const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  publishedYear: Number,
  genre: String
}, {
  timestamps: true 
});

const Book = mongoose.model('Book', bookSchema); // 'Book' will create 'books' collection

module.exports = Book;
