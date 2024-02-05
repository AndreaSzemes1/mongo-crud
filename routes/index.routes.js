const router = require('express').Router();
const bookController = require('../controllers/books.controller');
  
router.get('', async (req, res) => {
    try {
        const uniqueBookTitlesCount = await bookController.getUniqueTitles();
        const highestRatedBooks = await bookController.gethighestRatedBooks();
        const mostPublishedAuthors = await bookController.getMostPublishedAuthors();
        const uniqueLangugeCount = await bookController.getNumberOfLanguages();

        res.render('index', {
            uniqueBookTitlesCount, 
            highestRatedBooks, 
            mostPublishedAuthors,
            uniqueLangugeCount
        });
    } catch (err) {
        console.error('Error fetching data for homepage:', error);
        res.status(500).send('Error loading homepage');
    }
});

module.exports = router;
