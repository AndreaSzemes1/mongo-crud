const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.books = require('./books.model');
db.review = require('./review.model');


module.exports = db;