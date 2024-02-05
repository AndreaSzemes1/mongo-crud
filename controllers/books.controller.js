const db = require('../models');
const Books = db.books;
const Review = db.review;

exports.getAllbooks = async (filter, skip, pageSize) => {
    try {      
        const books = await Books.find(filter).skip(skip).limit(pageSize);
        const totalCount = await Books.countDocuments(filter);
        return { books, totalCount };
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).send('Error fetching books');
    }
}

exports.gethighestRatedBooks = async () => {
        return Books
        .find({ratings_count: {$gte: 1000}})
        .limit(5)
        .sort('-average_rating')
        .exec();
}

exports.getUniqueTitles = async () => {
         return Books.distinct('title').then(titles => titles.length);
}

exports.getMostPublishedAuthors = async () => {
    const pipeline = [
        {
            $project: {
              authors: { $split: ['$authors', '/'] }
            }
          },
          {
            $unwind: {
              path: '$authors',
              includeArrayIndex: 'string',
              preserveNullAndEmptyArrays: false
            }
          },
          {
            $group: {
              _id: '$authors',
              count: { $sum: 1 }
            }
          },
          { $sort: { count: -1 } },
          { $limit: 10 }
    ];

    try {
        const result = await Books.aggregate(pipeline);
        return result;
    } catch (error) {
        console.error('Aggregation error:', error);
        throw error;
    }
}

exports.getNumberOfLanguages = async () => {
    return Books.distinct('language_code').then(languages => languages.length);
}

exports.getAllReviewsForBook = async (bookId) => {
  return Review.find({ book: bookId }).populate('user', 'username');
}

exports.getBookById = async (bookId) => {
  return Books.findById(bookId);
}

exports.updateReview = async (reviewId, content) => {
  return Review.findByIdAndUpdate(reviewId, { content: content });
}

exports.deleteReview = async (reviewId) => {
  return Review.findByIdAndDelete(reviewId);
}