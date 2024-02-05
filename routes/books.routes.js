const express = require('express');
const router = express.Router();

const bookController = require('../controllers/books.controller');
const Review = require('../models/review.model');
  
router.get('/books', async (req, res) => {
  try {
    const selectedLetter = req.query.letter || '';
    const letterFilter = selectedLetter ? {title: {$regex: `^${selectedLetter}`, $options: 'i'} }: {};
    const page = parseInt(req.query.page) || 1;
    const pageSize = 20;
    const skip = (page - 1) * pageSize;

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const userId = req.session.user?.id;

    const result = await bookController.getAllbooks(letterFilter, skip, pageSize);
    const books = result.books;
    const totalCount = result.totalCount;
    const totalPages = Math.ceil(totalCount / pageSize);
    res.render('books', {books, userId, page, totalPages, alphabet, selectedLetter});
  } catch (error) {
    console.error(error);
  }
});

router.get('/books/:bookId', async(req, res) => {
  try {
    const { bookId } = req.params;
    const book = await bookController.getBookById(bookId);
    const reviews = await bookController.getAllReviewsForBook(bookId);
 
    res.render('bookDetail', { book, reviews });
  } catch (error) {
    console.error(error);
  }
})

router.post('/books/:bookId/add', async (req, res) => {
  const { content } = req.body;
  const { bookId } = req.params;
  const userId = req.session.user.id;

  try {
    const review = new Review({
      content,
      book: bookId,
      user: userId
    });
    await review.save();

    res.redirect(`/books/${bookId}`);

  } catch (error) {
    console.error(error);
  }
})

router.post('/books/update/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  const { content } = req.body;

  try {
    await bookController.updateReview(reviewId, content);
    res.json({ success: true, message: 'Review updated successfully' });
    
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating review'});
  }
})

router.delete('/books/:bookId/delete/:reviewId', async (req, res) => {
  const { bookId, reviewId } = req.params;
  try {
    await bookController.deleteReview(reviewId);
    res.json({ success: true, message: 'Review deleted successfully' });
    //res.redirect(`/books/${bookId}`);

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting review'});
  }
})

module.exports = router;