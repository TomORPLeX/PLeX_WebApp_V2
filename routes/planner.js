var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");

var obj = {};
var cases = '{"CASE_ID":"xxxxxx"},{"CASE_ID":"xxxxxx"}';

var selectquer1 = "SELECT DISTINCT ";
var selectquer2 = " FROM live_workstack";
var plannermessage ="";
var estimatenum = "";
//var cases = "";
var dso = "";
var tmbooked = "";
var skills = "";
var starttime = "";
var finishtime = "";
var keystonetask = "";
var travel = "";
var eodtravel ="";
var engein = "";
var tasknum = "";
var dates = "";
var flagtofluidity ="";
var engein2="";
var tasknum2="";
var eodtravel2="";
var travel2="";
var dates2="";
var engein3="";
var tasknum3="";
var eodtravel3="";
var travel3="";
var dates3="";
var engein4="";
var tasknum4="";
var eodtravel4="";
var travel4="";
var dates4="";
var engein5="";
var tasknum5="";
var eodtravel5="";
var travel5="";
var dates5="";
var engein6="";
var tasknum6="";
var eodtravel6="";
var travel6="";
var dates6="";

var formvalues = {
    "estimatenum":estimatenum,
    "dso":dso,
    "cases":cases,
    "tmbooked":tmbooked,
    "skills":skills,
    "starttime":starttime,
    "finishtime":finishtime,
    "keystonetask":keystonetask,
    "travel":travel,
    "eodtravel":eodtravel,
    "engein":engein,
    "tasknum":tasknum,
    "dates":dates,
    "flagtofluidity":flagtofluidity,
    "engein2":engein2,
    "tasknum2":tasknum2,
    "eodtravel2":eodtravel2,
    "travel2":travel2,
    "dates2":dates2,
    "engein3":engein3,
    "tasknum3":tasknum3,
    "eodtravel3":eodtravel3,
    "travel3":travel3,
    "dates3":dates3,
    "engein4":engein4,
    "tasknum4":tasknum4,
    "eodtravel4":eodtravel4,
    "travel4":travel4,
    "dates4":dates4,
    "engein5":engein5,
    "tasknum5":tasknum5,
    "eodtravel5":eodtravel5,
    "travel5":travel5,
    "dates5":dates5,
    "engein6":engein6,
    "tasknum6":tasknum6,
    "eodtravel6":eodtravel6,
    "travel6":travel6,
    "dates6":dates6
};

var fluiditydropdown = "";
var skillsdropdown = "";
var gangsizedropdown = ""; //runquery(selectquer1+'ASSUMED_GANG_SIZE'+selectquer2);
var traveldropdown = ""; //runquery(selectquer1+'TT_REMAINING'+selectquer2); //needs editing when real table done
var tasknumberdropdown = ""; // runquery(selectquer1+'TT_REMAINING'+selectquer2); //needs editing when real table done

router.get('/', loginfunction.isLoggedIn, function(req, res, next) {
    pool.query(selectquer1+'FINAL_STATUS'+selectquer2, function (err, rows) {
        if (err) {
            console.log('error in select query');
            throw err;
        } else {
            //console.log('JSON Returned Using('+selectquer1+'CASE_ID'+selectquer2+'): \n' + JSON.stringify(rows));
            fluiditydropdown = rows;

            pool.query(selectquer1+'PRIMARY_SKILL'+selectquer2, function (err, rows) {
                if (err) {
                    console.log('error in select query');
                    throw err;
                } else {
                    console.log('skill dropdown:'+JSON.stringify(rows));
                    skillsdropdown = rows;
                    gangsizedropdown = [{"ASSUMED_GANG_SIZE":1},{"ASSUMED_GANG_SIZE":2},{"ASSUMED_GANG_SIZE":3},{"ASSUMED_GANG_SIZE":4},{"ASSUMED_GANG_SIZE":5},{"ASSUMED_GANG_SIZE":6}];
                    traveldropdown = [{"PLANNED_TT_DURATION":10},{"PLANNED_TT_DURATION":"20"},{"PLANNED_TT_DURATION":"30"},{"PLANNED_TT_DURATION":"40"},{"PLANNED_TT_DURATION":"50"},{"PLANNED_TT_DURATION":"60"},{"PLANNED_TT_DURATION":"70"},{"PLANNED_TT_DURATION":"80"},{"PLANNED_TT_DURATION":"90"},{"PLANNED_TT_DURATION":"100"},{"PLANNED_TT_DURATION":"110"},{"PLANNED_TT_DURATION":"120"},{"PLANNED_TT_DURATION":"130"},{"PLANNED_TT_DURATION":"140"},{"PLANNED_TT_DURATION":"150"}];
                    tasknumberdropdown = [{"TASK_NUMBER":1},{"TASK_NUMBER":2},{"TASK_NUMBER":3},{"TASK_NUMBER":4},{"TASK_NUMBER":5},{"TASK_NUMBER":6}];
                    res.cookie('fluiditycookie', fluiditydropdown, {maxAge: 900000, httpOnly: false});
                    res.cookie('skillscookie', skillsdropdown, {httpOnly: false});

                    var dropdownsjson = {
                        "fluiditydropdown":fluiditydropdown,
                        "skillsdropdown":skillsdropdown,
                        "gangsizedropdown":gangsizedropdown,
                        "traveldropdown":traveldropdown,
                        "tasknumberdropdown": tasknumberdropdown
                    };
                    //console.log('dropdownsjson:\n'+JSON.stringify(dropdownsjson));
                    obj = {"dropdownsjson":dropdownsjson,
                        "plannermessage": "test message", //plannermessage,
                        "formvalues": formvalues,
                        "cases": req.cookies.cases,
                        "db":"",
                        "rowsize":0,
                        "loginFlag":req.cookies.loginFlag,
                        "adminFlag":req.cookies.adminFlag
                    };
                    //console.log("obj passed into planner: \n"+JSON.stringify(obj)+"\n");
                    res.render('planner', obj);

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
            //console.log('JSON Returned Using('+selectquer+'): \n' + JSON.stringify(rows));
            return JSON.stringify(rows);
        }
    });
}

module.exports = router;
