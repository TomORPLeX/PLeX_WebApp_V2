var express = require('express');
var router = express.Router();
var loginfunction = require("../bin/login.js");

router.get('/', loginfunction.isLoggedIn, function(req, res, next) {
    var obj = {'db' : "" , 'teameditmessage': "", 'username': req.cookies.username, 'loginFlag': req.cookies.loginFlag, 'adminFlag': req.cookies.adminFlag, "profile": req.cookies.profile};
    res.render('teammanagement',obj);
});

module.exports = router;