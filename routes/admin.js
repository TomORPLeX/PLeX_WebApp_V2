var express = require('express');
var router = express.Router();
var loginfunction = require("../bin/login.js");

router.get('/', loginfunction.isLoggedIn, function(req, res, next) {
    var obj = {'db' : "" , 'username': req.cookies.username, 'loginFlag': req.cookies.loginFlag, 'adminFlag': req.cookies.adminFlag, "profile": req.cookies.profile};
    res.render('admin',obj);
});

module.exports = router;
