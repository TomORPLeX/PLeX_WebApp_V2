var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    loginFlag = 0;
    console.log('loggedOut');
    res.redirect('/');
});

module.exports = router;
