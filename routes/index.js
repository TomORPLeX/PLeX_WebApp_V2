var express = require('express');
var router = express.Router();
var loginfunction = require("../bin/login.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Please Log In' });
});

module.exports = router;
