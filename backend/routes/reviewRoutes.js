const express = require('express');
const { postReview, updateReview, deleteReview } = require('../controllers/reviewController');
const auth=require('../middlewares/auth')

const router = express.Router();

router.put('/:id', auth, updateReview);
router.delete('/:id', auth, deleteReview);

module.exports = router;