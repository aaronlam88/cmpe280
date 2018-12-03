"use strict";

require('pug'); // check if pug is install

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var compression = require('compression')
var logger = require('morgan');

var app = express();

// setup compression, use gzip to improve performance
app.use(compression())

// setup view engine
app.set('views', path.join(__dirname, 'views')); // all view templates should be in views/ directory
app.set('view engine', 'pug'); // using pug as view engine

// setup static access for html & css files
// NOTE: all files under static directory are public and can be viewed by anyone
app.use(express.static(path.join(__dirname, 'public')));

// setup static access for javascript files
app.use(express.static(path.join(__dirname, 'controllers/client')));

app.use(logger('dev')); // to support logging
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: false })); // to support URL-encoded bodies
app.use(cookieParser()); // to support cookie
app.use(session({
  secret: 'webkeepers',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
})); // to support session, and setup session

// route --> page
// home page
app.use('/', require('./routes/index'));
app.use('/home', require('./routes/index'));
// about
// app.use('/about', require('./routes/about'));
//

// for mongodb api
app.use('/mongodb', require('./routes/mongodb'));

// for json object api
app.use('/api', require('./routes/api'));

// dashboard
app.use('/dashboard', require('./routes/dashboard'));

app.use('/intro2', require('./routes/intro'));
app.use('/contact', require('./routes/contact'));
app.use('/overview', require('./routes/overview'));
app.use('/top', require('./routes/top'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
