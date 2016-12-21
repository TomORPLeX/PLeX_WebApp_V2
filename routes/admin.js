var express = require('express');
var router = express.Router();
var loginfunction = require("../bin/login.js");

router.get('/', loginfunction.isLoggedIn, function(req, res, next) {
    res.render('admin');
});

module.exports = router;
