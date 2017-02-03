var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");

router.use('/', loginfunction.isLoggedIn, function(req, res, next) {

    var cases = req.body.cases;
    console.log('cases:' +cases);

    //selectquer = 'SELECT CASE_ID FROM live_workstack WHERE ESTIMATENUMBER LIKE \'' +cases +'\';';
    //console.log(selectquer);

    res.send('success');
   /* pool.query(selectquer, function (err, rows) {
        if (err) {
            console.log('error in select query');
            err.status=503;
            return next(err);
        } else {
            res.cookie('cases', rows);
            console.log('our new cookie: ' +JSON.stringify(rows));
            res.send('success');
        }
    });*/

});

module.exports = router;
