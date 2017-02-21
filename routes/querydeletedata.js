var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");

router.use('/', loginfunction.isLoggedIn, function(req, res, next) {

    var cases = req.body.cases;
    var quer1 = "SELECT CASE_ID, PLANNED_ENGINEER, date_format(PLANNED_DATE, '%d-%m-%Y') as PLANNED_DATE, ENG_TRAVEL_TIME, EOD_TRAVEL, TASK_NUMBER FROM live_plexplanner WHERE case_id= '" + cases + "';";


    pool.query(quer1, function (err, rows) {
        if (err) {
            err.status=500.24;
            return next(err);
        } else {
            obj = {
                deletedata: rows
            };
            deletedata = (JSON.stringify(obj));
            res.send(obj);
        }
    });
});

module.exports = router;