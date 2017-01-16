var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");

var obj = {};
var cases = '{"CASE_ID":"xxxxxx"},{"CASE_ID":"xxxxxx"}';

var selectquer1 = "SELECT DISTINCT ";
var selectquer2 = " FROM live_table";
var plannermessage ="";
var estimatenum = "";
//var cases = "";
var dso = "";
var tmbooked = "";
var fluiditystatus = "";
var gangsize = "";
var skills = "";
var tasktime = "";
var unpintask = "";
var travel = "";
var engein = "";
var tasknum = "";
var dates = "";

var formvalues = {
    "estimatenum":estimatenum,
    "dso":dso,
    "cases":cases,
    "tmbooked":tmbooked,
    "fluiditystatus":fluiditystatus,
    "gangsize":gangsize,
    "skills":skills,
    "tasktime":tasktime,
    "unpintask":unpintask,
    "travel":travel,
    "engein":engein,
    "tasknum":tasknum,
    "dates":dates
};

var fluiditydropdown = "";
var skilldropdown = "";
//var gangsizedropdown = runquery(selectquer1+'ASSUMED_GANG_SIZE'+selectquer2);
//var tasktimedropdown = runquery(selectquer1+'TT_REMAINING'+selectquer2);
//var traveldropdown = runquery(selectquer1+'TT_REMAINING'+selectquer2); //needs editing when real table done
//var tasknumberdropdown = runquery(selectquer1+'TT_REMAINING'+selectquer2); //needs editing when real table done

router.get('/', loginfunction.isLoggedIn, function(req, res, next) {
    pool.query(selectquer1+'CASE_STATUS'+selectquer2, function (err, rows) {
        if (err) {
            console.log('error in select query');
            throw err;
        } else {
            //console.log('JSON Returned Using('+selectquer1+'CASE_ID'+selectquer2+'): \n' + JSON.stringify(rows));
            fluiditydropdown = rows;
            res.cookie('fluiditycookie', fluiditydropdown);

            pool.query(selectquer1+'WT_DESCRIPTION'+selectquer2, function (err, rows) {
                if (err) {
                    console.log('error in select query');
                    throw err;
                } else {
                    skilldropdown = rows;
                    res.cookie('skillscookie', skilldropdown);
                    var dropdownsjson = {
                        "fluiditydropdown":fluiditydropdown,
                        "skillsdropdown":skilldropdown
                        //"gangsizedropdown":gangsizedropdown,
                        //"tasktimedropdown":tasktimedropdown,
                        //"traveldropdown":traveldropdown,
                        //"tasknumberdropdown": tasknumberdropdown
                    };
                    console.log('dropdownsjson:\n'+JSON.stringify(dropdownsjson));
                    obj = {"dropdownsjson":dropdownsjson,
                        "plannermessage": plannermessage,
                        "formvalues": formvalues,
                        "cases": req.cookies.cases,
                        "db":"",
                        "loginFlag":req.cookies.loginFlag,
                        "adminFlag":req.cookies.adminFlag
                    };
                    console.log("obj passed into dayminus1: \n"+JSON.stringify(obj)+"\n");
                    res.render('dayminus1', obj);
                }
            });

        }
    });
});

function runquery (selectquer) {
    pool.query(selectquer, function (err, rows) {
        if (err) {
            console.log('error in select query');
            throw err;
        } else {
            console.log('JSON Returned Using('+selectquer+'): \n' + JSON.stringify(rows));
            return JSON.stringify(rows);
        }
    });
}

module.exports = router;
