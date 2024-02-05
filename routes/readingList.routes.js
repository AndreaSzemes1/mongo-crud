const express = require('express');
const router = express.Router();

const readingListController = require('../controllers/readingList.controller');
const User = require('../models/user.model');

router.get('/readinglist', async (req, res) => {
    try {
        const userId = req.session?.user?.id;
        const readingList = await readingListController.getList(userId);
        res.render('readingList', { readingList });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.post('/readinglist/add/:bookId', async (req, res) => {
    const userId = req.session.user.id;
    const bookId = req.params.bookId;

    try {
        await readingListController.addToList(userId, bookId);
        res.status(200).json({ message: 'Book added successfully'});

    } catch (error) {
        res.status(500).send('Server error');
    }
})

router.delete('/readinglist/remove/:bookId', async (req, res) => {
    try {
        const userId = req.session.user.id;
        const bookId = req.params.bookId;
        await readingListController.deleteFromList(userId, bookId);
        res.status(200).json({ message: 'Book deleted successfully'});
    } catch (error) {
        res.status(500).send('Server error');
    }
})

router.delete('/readinglist/deleteAll', async (req, res) => {
    try {
        const userId = req.session.user.id;
        await readingListController.emptyList(userId);
        res.status(200).json({ message: 'Books deleted successfully'});
    } catch (error) {
        res.status(500).send('Server error');
    }
})

module.exports = router;