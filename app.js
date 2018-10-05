var express = require('express');
var logger = require('morgan');

var authenticationRouter = require('./routes/authentication');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/authentication', authenticationRouter);

module.exports = app;
