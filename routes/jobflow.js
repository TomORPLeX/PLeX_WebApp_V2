var express = require('express');
var router = express.Router();
var loginfunction = require("../bin/login.js");
var pool = require('../bin/db.js');

router.get('/', function(req, res, next) {
    res.render('jobflow');
});

module.exports = router;
