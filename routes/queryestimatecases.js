var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");


router.use('/', loginfunction.isLoggedIn, function(req, res, next) {

    var estimatenum = req.body.estimate;
    console.log('estimate:' +estimatenum);

    var selectquer = 'SELECT CASE_ID FROM live_workstack WHERE ESTIMATENUMBER LIKE \'' +estimatenum +'\';';
    console.log(selectquer);

    pool.query(selectquer, function (err, rows) {
        if (err) {
            console.log('error in select query');
            err.status=500.25;
            return next(err);
        } else {
            res.cookie('cases', rows);
            console.log('All Cases: ' +JSON.stringify(rows));
            res.send(rows);
        }
    });

});

module.exports = router;