const express = require('express');
const router = express.Router();
const  {getBookByAuthorAndGenre,getBookByAuthorAndtitle} = require("../controllers/publicController")

router.get('/books', getBookByAuthorAndGenre);
router.get('/search', getBookByAuthorAndtitle);

module.exports = router;