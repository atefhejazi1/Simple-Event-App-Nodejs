const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require('../models/User');
const { body } = require("express-validator");

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Saving user object in the session

passport.use('local-signup', new localStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    // allows us to pass back the entire request to the callback
},
    function (req, email, password, done) {
        // User.findOne won't fire unless data is sent back
        process.nextTick(function () {
            // find a user whose email is the same as the forms email
            User.findOne({ 'local.email': email }).then((user) => {

                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    // if there is no user with that email -create the user
                    var newUser = new User();
                    // set the user's local credentials
                    newUser.email = email;
                    newUser.password = newUser.generateHash(password);
                    // save the user
                    newUser.save().then(() => {
                        return done(null, newUser);
                    })
                }
            }).catch(err => {
                if (err)
                    return done(err);
            });
        });
    }));


passport.use('local-login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    function (req, email, password, done) {
        // find a user whose email is the same as the forms email
        User.findOne({ 'email': email }).then((user) => {
            if (!user) {
                console.log("User Doent found ");
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }
            if (!user.validPassword(password)) {
                console.log("Pass problem ");
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }
            // all is well, return successful user
            return done(null, user);
        }).catch(err => {
            if (err)
                return done(err);
        });;
    }));
