var express = require('express');
var router = express.Router();
var request = require('request');
var URL = require('url').URL;

let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;
let scope = process.env.SCOPE;
let team = process.env.TEAM;

/* GET users listing. */
router.get('/', function (req, res, next) {
    let code = req.query['code'];

    code ? getAccessToken(res, code) : authenticate(res);
});

function authenticate(res) {
    let url = new URL('https://slack.com/oauth/authorize');

    url.searchParams.append('client_id', process.env.CLIENT_ID);
    url.searchParams.append('client_secret', process.env.CLIENT_SECRET);
    url.searchParams.append('scope', process.env.SCOPE);
    url.searchParams.append('team', process.env.TEAM);

    res.redirect(url.href);
}

function getAccessToken(res, code) {
    var options = {
        method: 'POST',
        url: 'https://slack.com/api/oauth.access',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        form:
            {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                code: code
            }
    };

    request(options, function (error, response, body) {
        res.send(error || JSON.parse(body));
    });
}

module.exports = router;
