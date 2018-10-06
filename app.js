var express = require('express');
var logger = require('morgan');

var healthRouter = require('./routes/health');
var authorizationRouter = require('./routes/authorization');
var oauthAccessRouter = require('./routes/oauthAccess');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/health', healthRouter);
app.use('/oauth/authorize', authorizationRouter);
app.use('/api/oauth.access', oauthAccessRouter);

module.exports = app;
