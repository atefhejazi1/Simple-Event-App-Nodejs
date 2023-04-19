const express = require('express')
const app = express()
const port = 3000
const db = require('./config/database')

var bodyParser = require('body-parser')
var session = require('express-session')
var flash = require('connect-flash');
var passport = require('passport');
var passportSetup = require('./config/passport-setup');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.static('node_modules'))

app.use(session({
    secret: 'lorem ipsum',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 15 }
}))


app.use(flash())

//bring passport 
app.use(passport.initialize())
app.use(passport.session())

app.get('*', (req, res, next) => {
    res.locals.user = req.user || null
    next()
})

app.get('/', (req, res) => {
    res.redirect('/events')
})

const events = require('./routes/event-router')
app.use('/events', events)

const user = require('./routes/user-router')
app.use('/user', user)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})