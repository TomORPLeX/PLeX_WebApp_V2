var express = require('express');
var router = express.Router();
var loginfunction = require("../bin/login.js");



router.get('/', loginfunction.isLoggedIn, function(req, res, next) {
    obj = {'db' : "" , 'username': req.cookies.username, 'loginFlag': req.cookies.loginFlag, 'adminFlag': req.cookies.adminFlag};
    res.render('admin',obj);
});

module.exports = router;
