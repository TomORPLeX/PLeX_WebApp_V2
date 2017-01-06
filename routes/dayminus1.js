var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");

var obj = {};
var quer1 = "SELECT * FROM test1 LIMIT 10";

router.get('/', loginfunction.isLoggedIn, function(req, res, next) {

    var day0 = new Date();


    var day1 = day0;

    console.log(day0);
    console.log(day1);

    pool.query(quer1, function(err,rows)
    {
        if(err)
        {
            throw err;
        } else
        {
            obj = {db: rows, 'username': req.cookies.username, 'loginFlag': req.cookies.loginFlag, 'adminFlag': req.cookies.adminFlag};
            res.render('dayminus1', obj);
            console.log(JSON.stringify(rows));
        }
    });
});

module.exports = router;
