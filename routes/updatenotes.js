var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");

router.use('/', loginfunction.isLoggedIn, function(req, res, next) {

    var notes = req.body.note;
    var cases = req.body.case;
    var EIN = req.body.ein;
    var modEIN = req.cookies.EIN;
    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var insertquer = "INSERT INTO live_casenotes (case_id, planned_engineer, case_notes, mod_ein, date_modified) VALUES (\'"+cases+"\',\'"+EIN+"\',\'"+notes+"\',\'"+modEIN+"\', STR_TO_DATE(\'"+date+"\','%d/%m/%Y')) ON DUPLICATE KEY UPDATE case_notes = \'"+notes+"\', mod_EIN = \'"+modEIN+"\', date_modified = STR_TO_DATE(\'"+date+"\','%d/%m/%Y');";
    console.log('insertquer: '+insertquer);

    pool.query(insertquer, function (err, rows) {
        if (err) {
            console.log('error in select query (updatenotes.js)');
            err.status=500.25;
            return next(err);
        } else {
            res.send('success');
        }
    });
});

module.exports = router;