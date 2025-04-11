const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// GET all reviews for a specific book
router.get('/book/:bookId', async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId }).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { book, user, rating, comment } = req.body;

    const review = new Review({
      book,
      user,
      rating,
      comment
    });

    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ error: 'Failed to post review', details: err });
  }
});

// POST a new review
router.put('/:id', async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update review' });
  }
});


module.exports = router;
