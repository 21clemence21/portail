const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
var Database = require('./config/keys');
let database = new Database();

//EJS 
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser 
app.use(express.urlencoded({ extended: false}))

// Express Session 
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash // pour envoyer un message apres un redirect
app.use(flash())

// Global Variables 
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000;

//run the server 
app.listen(PORT, console.log(`Server started on sport ${PORT}`));