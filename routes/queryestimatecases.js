var express = require('express');
var router = express.Router();
var loginfunction = require("../bin/login.js");
var pool = require('../bin/db.js');

/* GET home page. */
router.use('/', loginfunction.isLoggedIn, function(req, res, next) {
    var estimatenum = req.body.estimate;
    console.log('estimate:' +estimatenum);

    selectquer = 'SELECT CASE_ID FROM live_table WHERE CUST_EST_NO LIKE \'' +estimatenum +'\';';
    console.log(selectquer);

    pool.query(selectquer, function (err, rows) {
        if (err) {
            console.log('error in select query');
            throw err;
        } else {
            console.log('Queried Cases');
            obj = {'cases': rows};
            console.log(JSON.stringify(obj));
            res.render('dayminus1', obj);
        }
    });

});

module.exports = router;