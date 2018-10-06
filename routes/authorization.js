var express = require('express');
var router = express.Router();
var URL = require('url').URL;

/* GET users listing. */
router.get('/', function (req, res, next) {
    sendAuthentication(res);
});

function sendAuthentication(res) {
    let url = new URL('https://slack.com/oauth/authorize');

    url.searchParams.append('client_id', process.env.CLIENT_ID);
    url.searchParams.append('scope', process.env.SCOPE);
    url.searchParams.append('team', process.env.TEAM);

    res.redirect(url.href);
}

module.exports = router;
