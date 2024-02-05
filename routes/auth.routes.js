const { verifySignUp } = require('../middleware');
const controller = require('../controllers/auth.controller');
const router = require('express').Router();

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, Accept'
  );
  next();
});

router.get('/auth/signup', (req, res) => {
    res.render('signup', { error: req.flash('error') });
});

router.get('/auth/signin', (req, res) => {
    res.render('signin', {success: req.flash('success'), error: req.flash('login-error') });
});

router.get('/auth/profile', controller.getUserProfile);
router.get('/auth/logout', controller.logout);

router.post(
  '/auth/signup', [verifySignUp.checkDuplicateUsernameOrEmail], controller.signup);

router.post('/auth/signin', controller.signin);
router.post('/auth/update-password', controller.updatePassword);

module.exports = router;