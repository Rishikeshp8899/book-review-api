const Book =require('../models/Book')
const Review = require('../models/Review');
require('dotenv').config();

const addBook=async(req,res)=>{
 try {
    const { title, author, publishedYear, genre } = req.body;

    // Create a new book instance
    const book = new Book({
      title,
      author,
      publishedYear,
      genre
    });
    // Save to DB
    await book.save();

    res.status(201).json({
      message: '✅ Book added successfully',
      data: book
    });
  } catch (error) {
    res.status(500).json({ message: '❌ Failed to add book', error: error.message });
  }
}

const getBookByAuthorAndGenre = async (req, res) => {
  try {
    const { author, genre } = req.query;
    const page = parseInt(req.query.page) || 1;     // Default: 1
    const limit = parseInt(req.query.limit) || 10;  // Default: 10

     const skip = (page - 1) * limit;

    // Build a dynamic filter object
    let filter = {};
    if (author) filter.author = author;
    if (genre) filter.genre = genre;

    // Find books matching the filter
    const books = await Book.find(filter).skip(skip) .limit(limit)

    res.status(200).json({
      message: '📚 Books fetched successfully',
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      message: '❌ Error fetching books',
      error: error.message
    });
  }
};


const getAllGenres = async (req, res) => {
  try {
    const genres = await Book.distinct('genre'); // Get unique genres from the DB

    res.status(200).json({
      message: '🎭 Unique genres fetched successfully',
      count: genres.length,
      data: genres
    });
  } catch (error) {
    res.status(500).json({
      message: '❌ Failed to fetch genres',
      error: error.message
    });
  }
};



const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Fetch book
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: '❌ Book not found' });
    }

    // 2. Fetch all reviews for this book
    const reviews = await Review.find({ book: id });

    // 3. Calculate average rating (assuming `rating` field exists in Review)
    let avgRating = 0;
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
      avgRating = totalRating / reviews.length;
    }

    res.status(200).json({
      message: '✅ Book fetched successfully',
      data: {
        book,
        totalReviews: reviews.length,
        averageRating: avgRating.toFixed(2)
      }
    });

  } catch (error) {
    res.status(500).json({
      message: '❌ Error fetching book',
      error: error.message
    });
  }
};

module.exports = {addBook,getBookByAuthorAndGenre,getAllGenres,getBookById};