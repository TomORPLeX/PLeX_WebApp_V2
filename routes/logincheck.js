var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var fs = require('fs');

router.use('/', function(req, res, next) {

    var EIN = req.body.EIN;
    var quer1 = "SELECT * FROM users WHERE EIN = '"+EIN+"'";
    var obj = {};

    if(EIN.length == 9) {
        pool.query(quer1, function (err, rows) {
            if (rows.length > 0) {
                obj = {db: rows};

                var name = obj.db[0].NAME;
                var EIN = obj.db[0].EIN;
                var OUC = obj.db[0].OUC;
                var profile = obj.db[0].PROFILE;

                if (profile == 'Admin') {
                    var adminFlag1 = 1;
                }

                var loginFlag1 = 1;

                res.cookie('EIN', EIN, {maxAge: 900000, httpOnly: false});
                res.cookie('username', name, {maxAge: 900000, httpOnly: false});
                res.cookie('loginFlag', loginFlag1, {maxAge: 900000, httpOnly: false});
                res.cookie('adminFlag', adminFlag1, {maxAge: 900000, httpOnly: false});
                res.cookie('profile', profile, {maxAge: 900000, httpOnly: false});
                res.cookie('cases', '', {httpOnly: false});
                //create temp file for map
                var initialJson = {
                    "LatLngData": [{
                        "LON": "",
                        "LAT": "",
                        "PRIMARY_SKILL": "",
                        "WT_DESCRIPTION": "",
                        "CASE_STATUS": "",
                        "PRIORITY_DESCRIPTION": "",
                        "EXCH": "",
                        "CASE_ID": "",
                        "CUST_EST_NO": ""
                    }],
                    "selection": {
                        "fluidity": "All",
                        "planned": "All",
                        "priority": [""],
                        "skills": [""],
                        "ouc": "All"
                    },
                    "priorityCount": [{
                        "Total": "",
                        "priority_description": ""
                    }]
                };
                var tempfilelocation = '../public/data/' + EIN + '_LatLngData.json';
                fs.writeFile(tempfilelocation, JSON.stringify(initialJson));

                //res.render('index', { title: 'Welcome '+ req.cookies.username, loginFlag: req.cookies.loginFlag, adminFlag: req.cookies.adminFlag });
                res.redirect('/demand');
            } else {
                //res.send('Login Failed');//,{"loginFailedMessage": "Login Failed"});
                res.render('index', {"loginFailedMessage": "You do not currently have access. <a href=\"http://formwize.intra.bt.com/v2/run/survey3.cfm?idx=505d040b0009010e08\" title=\"PLeX Web App Access Request\">Apply for access here</a>", "title": "Please Log In"});
            }
        });
    } else {
        res.render('index', {"loginFailedMessage": "Please Enter a 9 Digit EIN", "title": "Please Log In"});
    }
});

module.exports = router;