var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");

router.all('/', loginfunction.isLoggedIn, function(req,res,next) {
    console.log('Editing OUC Info');
    var ein = req.body.ein;
    var ouc = req.body.ouc;
    var exclude = req.body.exclude;
    var reason = req.body.reason;
    var modein = req.cookies.EIN;
    var selectquer = "SELECT * FROM live_teammanagement WHERE ENGINEER_EIN LIKE "+ein+";";
    var insertquer = "INSERT INTO live_teammanagement (ENGINEER_EIN, OUC, EXCLUDE_FLAG, REASON, ENTERED_BY_EIN, ENTERED_TIME) VALUES ("+ein+",\'"+ouc+"\', \'"+exclude+"\',\'"+reason+"\',"+modein+",NOW()) ON DUPLICATE KEY UPDATE OUC =\'"+ouc+"\', EXCLUDE_FLAG = \'"+exclude+"\', REASON = \'"+reason+"\', ENTERED_BY_EIN = "+modein+", ENTERED_TIME = NOW();";
    console.log(insertquer);
    pool.query(insertquer, function (err, rows) {
        if (err) {
            console.log('error in insert ouc query');
            err.status=500.02;
            return next(err);
        } else {
            console.log('Database Updated');
            pool.query(selectquer, function (err, rows) {
                if (err) {
                    console.log('Error in select query');
                    err.status=500.03;
                    return next(err);
                } else {
                    var obj = {'db': rows, 'teameditmessage': 'Success: [EIN: '+ein+'  OUC: '+ouc+'  Flag: '+exclude+' Reason: '+reason+']', 'username': req.cookies.username, 'loginFlag': req.cookies.loginFlag, 'adminFlag': req.cookies.adminFlag, "profile": req.cookies.profile};
                    res.render('teammanagement', obj);
                }
            });
        }
    });

});
module.exports = router;