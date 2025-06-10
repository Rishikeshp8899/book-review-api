const Book =require('../models/Book')
require('dotenv').config();

const getBookByAuthorAndGenre = async (req, res) => {
  try {
    const { author, genre ,title} = req.query;
    const page = parseInt(req.query.page) || 1;     // Default: 1
    const limit = parseInt(req.query.limit) || 10;  // Default: 10

     const skip = (page - 1) * limit;

    // Build a dynamic filter object
    let filter = {};
    if (author) filter.author = new RegExp(`^${author}$`, 'i');
    if (genre)  filter.genre  = new RegExp(`^${genre}$`, 'i');
    if (title)  filter.title  = new RegExp(`^${title}$`, 'i');

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

const getBookByAuthorAndtitle = async (req, res) => {
  try {
    const { author, genre ,title} = req.query;
    const page = parseInt(req.query.page) || 1;     // Default: 1
    const limit = parseInt(req.query.limit) || 10;  // Default: 10

     const skip = (page - 1) * limit;

    // Build a dynamic filter object
    let filter = {};
    if (author) filter.author = new RegExp(`^${author}$`, 'i');
    if (title)  filter.title  = new RegExp(`^${title}$`, 'i');

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

module.exports={getBookByAuthorAndGenre,getBookByAuthorAndtitle}