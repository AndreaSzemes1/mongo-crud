const config = require('../config/auth.config');
const db = require('../models');
const validator = require('validator');
const User = db.user;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    try {
        if (validator.isEmail(req.body.email) 
            && validator.isStrongPassword(req.body.password)
            && req.body.password === req.body.confirmPassword) {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
            });
            await user.save();
        
            req.flash('success', 'Registration was successful. Please log in.');
            res.redirect('/auth/signin');
        } else {
            throw new Error('Error validation email/password.');
        }
        
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/auth/signup');
    }
}

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username }).exec();
        if (!user) {
            throw new Error('User not found.');
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            throw new Error('Invalid password.');
        }

        var token = jwt.sign({ id: user.id }, config.jwtSecret, {
            expiresIn: 86400
        });


        req.session.user = { id: user._id, username: user.username };
        req.session.accessToken =  token;

        req.session.save(err => {
            if (err) {
                console.error(err);
            }
            res.redirect('/');
        })

    } catch (err) {
        req.flash('login-error', err.message + ' Please try again.');
        res.redirect('/auth/signin');
    }
}

exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error: ', err);
            res.status(500).send('Error logging out');
        } else {
            res.clearCookie('connect.sid');
        }
        res.redirect('/');
    })
}

exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        const token = req.session.accessToken;
        const decoded = jwt.verify(token, config.jwtSecret);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            throw new Error('Current password is incorrect.');
        }

        if (newPassword === confirmNewPassword && validator.isStrongPassword(newPassword)) {
            const hashedPassword = await bcrypt.hash(newPassword, 12);
            user.password = hashedPassword;
            await user.save();

            req.flash('pw-success', 'Password updated successfully')
            res.redirect('/auth/profile');
        } else {
            throw new Error('Error validating new password.');
        }

    } catch (error) {
        req.flash('pw-error', error.message);
        res.redirect('/auth/profile');
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const token = req.session.accessToken;
        const decoded = jwt.verify(token, config.jwtSecret);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('profile', { user, success: req.flash('pw-success'), error: req.flash('pw-error') });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}