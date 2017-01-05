var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');

router.get('/', function(req, res, next) {
    res.clearCookie("EIN");
    res.clearCookie("username");
    res.clearCookie("loginFlag");
    res.clearCookie("adminFlag");

    pool.end(function(err) {
        // The connection is terminated gracefully
        // Ensures all previously enqueued queries are still
        // before sending a COM_QUIT packet to the MySQL server.
        console.log('Connection Pool Closed');
    });

    loginFlag = 0;

    console.log('loggedOut');
    res.redirect('/');
});

module.exports = router;
