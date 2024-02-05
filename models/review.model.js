const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    content: String,
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Books' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;