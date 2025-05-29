const express = require('express');
const router = express.Router();
const {addBook,getBookByAuthorAndGenre,getAllGenres,getBookById} = require('../controllers/bookController');
const { postReview } = require('../controllers/reviewController');
const auth=require('../middlewares/auth')


router.post('/', auth,addBook);
router.get('/', getBookByAuthorAndGenre);
router.get('/:id', auth,getBookById);
router.get('/genres', auth,getAllGenres);
router.post('/:id/reviews', auth, postReview);


module.exports = router;
