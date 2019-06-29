var mongoose = require('mongoose');
var User = mongoose.model('User');
var validEmail = require('../helpers/email');

var cleanString = require('../helpers/cleanString');
var hash = require('../helpers/hash');
var crypto = require('crypto');


module.exports = function (app) {
    // GET
    app.get('/signup', function (req, res) {
        res.render('signup.jade')
    });

    app.get('/login', function (req, res) {
        res.render('login.jade')
    });

    app.post('/signup', function (req, res) {
        var email = req.param('email');
        var name = req.param('name');
        var pass = req.param('pass');
        // Server side validations
        // Valid email
        if (!(validEmail(email))) {
            return res.render('signup.jade', {invalidEmail: true});
        }
        // Name length
        if (name.length <5) {
            return res.render('signup.jade', {shortName: true});
        }
        // Password length
        if (pass.length <6) {
            return res.render('signup.jade', {shortPassword: true});
        }
        // Available username
        /*
        User.find({name: name}, function (err, user) {
            if (err) return next(err);
            if (user) {
                // Using return triggers error
                // "Can't set headers after they are sent"
                res.render('signup.jade', {alreadyChosen: true});
            }
        });
        */
        User.findById(email, function (err, user) {
            if (err) return next(err);
            // Email already registered
            if (user) {
                return res.render('signup.jade', {exists: true})
            }
            // Password generation
            crypto.randomBytes(16, function (err, bytes) {
                if (err) return next(err);
                // User saving
                var user = {_id: email};
                user.salt = bytes.toString('utf8');
                user.hash = hash(pass, user.salt);
                user.name = name;
                User.create(user, function (err, newUser) {
                    if (err) {
                        if (err instanceof mongoose.Error.ValidationError) {
                            console.log("invalid");
                        }
                        return next(err);
                    }
                    // Session creation
                    req.session.isLoggedIn = true;
                    req.session.user = email;
                    return res.redirect('/');
                })
            })
        })
    });

    app.post('/login', function (req, res) {
        var email = req.param('email');
        var pass = req.param('pass');

        User.findById(email, function (err, user) {
            if (err) return next(err);

            if (!user) {
                return userInvalid();
            }

            if (user.hash != hash(pass, user.salt)) {
                return passInvalid();
            }
            req.session.isLoggedIn = true;
            req.session.user = email;
            return res.redirect('/');
        })

        function userInvalid() {
            return res.render('login.jade', {userInvalid: true});
        }
        function passInvalid () {
          return res.render('login.jade', { passInvalid: true });
        }
    });

    // Logout route
    app.get('/logout', function (req, res) {
        req.session.isLoggedIn = false;
        req.session.user = null;
        res.redirect('/');
    })
}