var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var fs = require('fs')

router.get('/', function(req, res, next) {

    res.clearCookie("EIN");
    res.clearCookie("username");
    res.clearCookie("loginFlag");
    res.clearCookie("adminFlag");
    res.clearCookie("profile");
    res.clearCookie("cases");
    res.clearCookie("latLonCook");
    res.clearCookie("scale");

    loginFlag = 0;
    console.log('loggedOut');
    var tempfilelocation = '../public/data/' + req.cookies.EIN + '_LatLngData.json';
    fs.stat(tempfilelocation, function(err, stat) {
        if(err == null) {
            fs.unlinkSync(tempfilelocation);
        } else if(err.code == 'ENOENT') {
           return;
        } else {
            return;
        }
    });

    res.redirect('/');
});

module.exports = router;
