const book =require('../models/Book')
require('dotenv').config();
const Review = require('../models/Review');

const postReview = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;
    const existing = await Review.findOne({ user: userId, book: bookId });
    if (existing) {
      return res.status(400).json({ message: '❌ You have already reviewed this book' });
    }

    const review = new Review({ user: userId, book: bookId, rating, review:comment });
    await review.save();

    res.status(201).json({ message: '✅ Review added', data: review });
  } catch (error) {
    res.status(500).json({ message: '❌ Failed to add review', error: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id: bookId } = req.params; 
    const { rating, comment } = req.body;
    const userId = req.user.id;

  
    const review = await Review.findOne({ book: bookId, user: userId });
    if (!review) {
      return res.status(404).json({ message: '❌ Review not found or not yours' });
    }

    // 2) Update fields
    review.rating  = rating  != null ? rating  : review.rating;
    review.review  = comment != null ? comment : review.review;

    // 3) Save
    await review.save();

    res.status(200).json({ message: '✅ Review updated', data: review });
  } catch (error) {
    res.status(500).json({ message: '❌ Failed to update review', error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

   const deleted = await Review.findOneAndDelete({ _id: id, user: userId });
if (!deleted) {
  return res.status(403).json({ message: '❌ Not allowed to delete this review' });
}
res.status(200).json({ message: '✅ Review deleted' });
  } catch (error) {
    res.status(500).json({ message: '❌ Failed to delete review', error: error.message });
  }
};

module.exports = { postReview, updateReview, deleteReview };
