var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var fs = require('fs');
var loginfunction = require("../bin/login.js");

router.use('/', function( req, res, next) {
    var EIN = req.body.EIN;
    var quer1 = "SELECT * FROM users WHERE EIN = '"+EIN+"'";
    var obj = {};

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    console.log("EIN:"+EIN+" Login:"+dateTime);


    if(EIN.length == 9) {
        pool.query(quer1, function (err, rows) {
            if (err)
            {
                err.status=500.01;
                return next(err);
            }
            else if (rows.length > 0) {
                obj = {db: rows};

                var name = obj.db[0].NAME;
                var EIN = obj.db[0].EIN;
                var OUC = obj.db[0].OUC;
                var profile = obj.db[0].PROFILE;
                var tempfilelocation = '../public/data/' + EIN + '_LatLngData.json';

                if (profile == 'Admin') {
                    var adminFlag1 = 1;
                }

                var loginFlag1 = 1;

                res.cookie('EIN', EIN, { httpOnly: false});
                res.cookie('username', name, { httpOnly: false});
                res.cookie('loginFlag', loginFlag1, { httpOnly: false});
                res.cookie('adminFlag', adminFlag1, { httpOnly: false});
                res.cookie('profile', profile, { httpOnly: false});
                res.cookie('cases', '', {httpOnly: false});
                res.cookie('latLonCook','LatLng(54.00011, 0.00001)', {httpOnly: false});
                res.cookie('scale','5', {httpOnly: false});
                //create temp file for map
                //TODO: distinguish user type and change file structure?
                var initialJson = {
                    "LatLngData": [{
                        "LON": "",
                        "LAT": "",
                        "PRIMARY_SKILL": "",
                        "JOBDESCRIPTION": "",
                        "SUB_DESCRIPTION": "",
                        "web_system_defined_priority": "",
                        "CASE_STATUS": "",
                        "PRIORITY_DESCRIPTION": "",
                        "EXCHANGE": "",
                        "CASE_ID": "",
                        "ESTIMATENUMBER": "",
                        "CASE_OBJID": "",
                        "QUEUE_ID": "",
                        "PLANNED_TT_DURATION": "",
                        "OM_OUC": ""

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
                        "web_priority_description": ""
                    }]
                };

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