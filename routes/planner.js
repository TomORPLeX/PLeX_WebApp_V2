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
var tasktime = "";
var keystonetask = "";
var travel = "";
var eodtravel ="";
var engein = "";
var tasknum = "";
var dates = "";
var flagtofluidity ="";

var formvalues = {
    "estimatenum":estimatenum,
    "dso":dso,
    "cases":cases,
    "tmbooked":tmbooked,
    "skills":skills,
    "tasktime":tasktime,
    "keystonetask":keystonetask,
    "travel":travel,
    "eodtravel":eodtravel,
    "engein":engein,
    "tasknum":tasknum,
    "dates":dates,
    "flagtofluidity":flagtofluidity
};

var fluiditydropdown = "";
var skillsdropdown = "";
var gangsizedropdown = ""; //runquery(selectquer1+'ASSUMED_GANG_SIZE'+selectquer2);
var traveldropdown = ""; //runquery(selectquer1+'TT_REMAINING'+selectquer2); //needs editing when real table done
var tasknumberdropdown = ""; // runquery(selectquer1+'TT_REMAINING'+selectquer2); //needs editing when real table done

router.get('/', loginfunction.isLoggedIn, function(req, res, next) {
    pool.query(selectquer1+'CASE_STATUS'+selectquer2, function (err, rows) {
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
                    skillsdropdown = rows;
                    gangsizedropdown = [{"ASSUMED_GANG_SIZE":1},{"ASSUMED_GANG_SIZE":2},{"ASSUMED_GANG_SIZE":3},{"ASSUMED_GANG_SIZE":4},{"ASSUMED_GANG_SIZE":5},{"ASSUMED_GANG_SIZE":6}];
                    traveldropdown = [{"PLANNED_TT_DURATION":10},{"PLANNED_TT_DURATION":"20"},{"PLANNED_TT_DURATION":"30"},{"PLANNED_TT_DURATION":"40"},{"PLANNED_TT_DURATION":"50"},{"PLANNED_TT_DURATION":"60"},{"PLANNED_TT_DURATION":"70"},{"PLANNED_TT_DURATION":"80"},{"PLANNED_TT_DURATION":"90"},{"PLANNED_TT_DURATION":"100"},{"PLANNED_TT_DURATION":"110"},{"PLANNED_TT_DURATION":"120"},{"PLANNED_TT_DURATION":"130"},{"PLANNED_TT_DURATION":"140"},{"PLANNED_TT_DURATION":"150"}];
                    tasknumberdropdown = [{"TASK_NUMBER":1},{"TASK_NUMBER":2},{"TASK_NUMBER":3},{"TASK_NUMBER":4},{"TASK_NUMBER":5},{"TASK_NUMBER":6}];
                    res.cookie('fluiditycookie', fluiditydropdown, {maxAge: 900000, httpOnly: false});
                    res.cookie('skillscookie', skillsdropdown, {maxAge: 900000, httpOnly: false});

                    var dropdownsjson = {
                        "fluiditydropdown":fluiditydropdown,
                        "skillsdropdown":skillsdropdown,
                        "gangsizedropdown":gangsizedropdown,
                        "traveldropdown":traveldropdown,
                        "tasknumberdropdown": tasknumberdropdown
                    };
                    //console.log('dropdownsjson:\n'+JSON.stringify(dropdownsjson));
                    obj = {"dropdownsjson":dropdownsjson,
                        "plannermessage": plannermessage,
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
