var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');

router.use('/', function(req, res, next) {

    var estimatenum = req.body.estimate;
    console.log('estimate:' +estimatenum);

    selectquer = 'SELECT CASE_ID FROM live_workstack WHERE ESTIMATENUMBER LIKE \'' +estimatenum +'\';';
    console.log(selectquer);

    pool.query(selectquer, function (err, rows) {
        if (err) {
            console.log('error in select query');
            throw err;
        } else {
            res.cookie('cases', rows);
            console.log('our new cookie: ' +JSON.stringify(rows));
            res.send('success');
        }
    });

});

module.exports = router;