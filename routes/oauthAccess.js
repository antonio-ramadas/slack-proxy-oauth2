var express = require('express');
var router = express.Router();
var request = require('request');
var URL = require('url').URL;

/* GET users listing. */
router.get('/', function (req, res, next) {
    let code = req.query['code'];

    sendAccessToken(res, code);
});

function sendAccessToken(res, code) {
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
