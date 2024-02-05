const db = require('../models');
const User = db.user;

exports.getList = async (userId) => {
    try {
        const user = await User.findById(userId).populate('readingList').exec();
        return user.readingList;
    } catch (error) {
        console.error('Error fetching reading list', error);
    }
}

exports.addToList = async (userId, bookId) => {
    try {
        const user = await User.findByIdAndUpdate(userId, { $addToSet: { readingList: bookId }});
        return user.readingList;
    } catch (error) {
        console.error('Error adding book to reading list', error);
    }
}

exports.deleteFromList = async (userId, bookId) => {
    try {
        const user = await User.findByIdAndUpdate(userId, { $pull: { readingList: bookId }});
        return user.readingList;
    } catch (error) {
        console.error('Error deleting book from reading list', error);
    }
}

exports.emptyList = async (userId) => {
    try {
        const user = await User.findByIdAndUpdate(userId, { $set: { readingList: [] }});
        return user.readingList;
    } catch (error) {
        console.error('Error emptying reading list', error);
    }
}