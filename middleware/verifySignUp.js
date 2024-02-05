const db = require('../models');
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const usernameUser = await User.findOne({
      username: req.body.username,
    }).exec();

    if (usernameUser) {
      req.flash('error', 'Failed! Username is already in use!');
      return res.redirect('/auth/signup'); 
    }

    const emailUser = await User.findOne({ email: req.body.email }).exec();

    if (emailUser) {
      req.flash('error', 'Failed! Username is already in use!');
      return res.redirect('/auth/signup');
    }

    next();
  } catch (err) {
    req.flash('error', 'Failed! Username is already in use!');
    return res.redirect('/auth/signup');
  }
};


const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;