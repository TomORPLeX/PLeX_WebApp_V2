var express = require('express');
var router = express.Router();
var loginfunction = require("../bin/login.js");

/* GET home page. */
router.get('/', loginfunction.isLoggedIn, function(req, res, next) {
    res.render('otd', { title: 'On The Day', 'username': req.cookies.username, 'loginFlag': req.cookies.loginFlag, 'adminFlag': req.cookies.adminFlag });
});

module.exports = router;