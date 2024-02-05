const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    readingList: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Books'},
    ]
}));

module.exports = User;