var express = require('express');
var router = express.Router();
var loginfunction = require("../bin/login.js");
var pool = require('../bin/db.js');

var obj = {};

router.get('/', loginfunction.isLoggedIn, function(req, res, next) {

    obj = {
        'username': req.cookies.username,
        'loginFlag': req.cookies.loginFlag,
        'adminFlag': req.cookies.adminFlag,
        'cases': req.cookies.cases,
        'profile': req.cookies.profile};
    res.render('jobflow', obj);
});

module.exports = router;
