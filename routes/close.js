var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');

router.get('/', function(req, res, next) {
    console.log('Connection Pool closing');
// close db connection
    res.clearCookie("EIN");
    res.clearCookie("username");
    res.clearCookie("loginFlag");
    res.clearCookie("adminFlag");
    res.clearCookie("cases");
    res.send('');
});

module.exports = router;