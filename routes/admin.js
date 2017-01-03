var express = require('express');
var router = express.Router();
var loginfunction = require("../bin/login.js");

obj = {'db' : "" };

router.get('/', loginfunction.isLoggedIn, function(req, res, next) {
    res.render('admin',obj);
});

module.exports = router;
