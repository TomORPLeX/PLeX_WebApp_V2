var express = require('express');
var router = express.Router();
var loginfunction = require("../bin/login.js");

/* GET home page. */
router.get('/', function(req, res, next) {

  if (loginFlag==0)
  {
      res.render('index', { title: 'Please Log In'});
  } else
  {
      res.render('index', { title: 'Welcome '+req.cookies.name, 'loginFlag': req.cookies.loginFlag, 'adminFlag': req.cookies.adminFlag  });
  }
});

module.exports = router;
