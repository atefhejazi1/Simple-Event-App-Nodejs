const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require("passport");


//middleware to chech if user is logged in or not

isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/user/login')
}

// login user view 
router.get('/login', (req, res) => {
    res.render('user/login')
})

// login post request  
// router.post('/login', (req, res) => {
//     console.log(req.body);
//     res.json('loign in user ... ')
// })

// process the login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/user/profile', // redirect to the secure profile section
    failureRedirect: '/user/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

// signup form 
router.get('/signup', (req, res) => {
    res.render('user/signup')
})


// signup post request  
// router.post('/signup',
//     passport.authenticate('local.signup', { failureRedirect: '/user/signup' }),
//     function (req, res) {
//         res.redirect('/user/profile');
//     });

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/user/profile', //redirect to the secure profile section
    failureRedirect: '/user/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

// profile 
router.get('/profile', isAuthenticated, (req, res) => {

    res.render('user/profile')

})

// logout 
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/user/login');
        }
    });
})


module.exports = router
