const express = require('express')
const router = express.Router()
const Event = require('../models/Event')
const { query, validationResult, body, check } = require('express-validator');

const moment = require('moment'); // require
moment().format();

isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/user/login')
}


router.get('/', (req, res) => {

    Event.find({}).then(events => {
        res.render('events/index', { events: events, message: req.flash('info') })
    })

})


router.get('/create', isAuthenticated, (req, res) => {
    res.render('events/create', {
        errors: false
    })
})


router.post('/create',
    [
        check('title').isLength({ min: 5 }).withMessage('Title Should Be More Than 5 !'),
        check('description').isLength({ min: 5 }).withMessage('Description Should Be More Than 5 !'),
        check('location').isLength({ min: 5 }).withMessage('Location Should Be More Than 5 !'),
        check('date').isLength({ min: 5 }).withMessage('Date Should Be Valid Date !'),

    ], (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {

            req.flash('errors', errors.array())
            // res.render('events/create', { errors: errors.array() })
            res.render('events/create', { errors: req.flash('errors') })
        } else {
            let newEvent = new Event({
                title: req.body.title,
                description: req.body.description,
                location: req.body.location,
                date: req.body.date,
                user_id: req.user,
                created_at: Date.now(),
            })
            newEvent.save();
            req.flash('info', 'The Event Was Created Successfully')
            res.redirect('/events')
        }

    })

router.get('/:id', (req, res) => {

    Event.findOne({ _id: req.params.id }).then((event) => {
        res.render('events/show', { event: event })
    })

})

router.get('/edit/:id', isAuthenticated, (req, res) => {

    Event.findOne({ _id: req.params.id }).then((event) => {
        res.render('events/edit',
            {
                event: event,
                eventDate: moment(event.date).format('YYYY-MM-DD'),
            })
    })

})

router.post('/update',
    [
        check('title').isLength({ min: 5 }).withMessage('Title Should Be More Than 5 !'),
        check('description').isLength({ min: 5 }).withMessage('Description Should Be More Than 5 !'),
        check('location').isLength({ min: 5 }).withMessage('Location Should Be More Than 5 !'),
        check('date').isLength({ min: 5 }).withMessage('Date Should Be Valid Date !'),

    ], isAuthenticated , (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {

            req.flash('errors', errors.array())
            // res.redirect('events/edit' + req.body.id)
            console.log("Error");
        } else {
            let newFeilds = {
                title: req.body.title,
                description: req.body.description,
                location: req.body.location,
                date: req.body.date,
                created_at: Date.now(),
            }

            // let query = { _id: req.body.id }
            let formDataId = req.body.id;
            console.log(formDataId);
            Event.findByIdAndUpdate(formDataId, newFeilds, { new: true })
                .then((updatedFormData) => {
                    //   res.send(updatedFormData);
                    res.redirect('/events/' + req.body.id)
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send('Error updating form data');
                });

        }
    })


router.get('/delete/:id' ,isAuthenticated , (req, res) => {

    Event.findByIdAndDelete(req.params.id)
        .then(() => {
            // res.send('Form data deleted successfully');
            res.redirect('/events')
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error deleting form data');
        });

})





module.exports = router
