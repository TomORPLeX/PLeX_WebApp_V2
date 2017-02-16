var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var selectquer = "";
var loginfunction = require("../bin/login.js");


router.all('/', loginfunction.isLoggedIn, function(req, res, next) {
    selectquer = "SELECT a.ESTIMATENUMBER, a.CASE_ID, b.PLANNED_DATE, b.TASK_NUMBER, b.ENG_TRAVEL_TIME, b.EOD_TRAVEL, a.WEB_PRIORITY_DESCRIPTION, a.WEB_PRIMARY_SKILL, a.WEB_REVIEW_FLAG, a.WEB_KEYSTONE_TASK, a.WEB_SPECIFIC_START_TIME, a.WEB_SPECIFIC_END_TIME FROM live_workstack a LEFT JOIN live_plexplanner b on a.case_id = b.case_id ORDER BY a.WEB_TIMESTAMP DESC LIMIT 10000;";
    pool.query(selectquer, function (err, rows) {
        if (err) {
            err.status=503;
            return next(err);
        } else {
            obj = {db: rows};
            //console.log(JSON.stringify(obj.db));
            res.send(JSON.stringify(obj.db));
        }
    });
});

module.exports = router;