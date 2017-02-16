var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");

function dateconverter(uglydate) {
    //var nicedate = uglydate.getDay() + uglydate.getMonth() + uglydate.getYear();
    var nicedate2 = uglydate.toLocaleDateString("en-GB");
    return nicedate2;
}

router.use('/', loginfunction.isLoggedIn, function(req, res, next) {

    var cases = req.body.cases;
    var estimatenum = req.body.estimatenum;
    estimatenum = estimatenum.trim();

    console.log('estimate:'+estimatenum+';');
    console.log('cases:'+cases+';');


    var dso ="";
    var tmbooked="";
    var skills="";
    var starttime="";
    var finishtime="";
    var keystonetask="";
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



    var selectquer = 'SELECT CASE_ID, WEB_DEPENDENCIES_BOOKED, WEB_DSO_BOOKED, WEB_KEYSTONE_TASK, WEB_REVIEW_FLAG, WEB_PRIMARY_SKILL, WEB_SPECIFIC_START_TIME, WEB_SPECIFIC_END_TIME FROM live_workstack WHERE ESTIMATENUMBER LIKE \''+estimatenum+'\' AND CASE_ID LIKE \''+cases+'\';';

    console.log(selectquer);
    // query to get case specific data
    pool.query(selectquer, function (err, rows) {
        if (err) {
            console.log('error in select query');
            err.status=503;
            return next(err);
        } else {
            console.log('queried case data: '+JSON.stringify(rows));
            tmbooked = rows[0].WEB_DEPENDENCIES_BOOKED;
            dso = rows[0].WEB_DSO_BOOKED;
            flagtofluidity = rows[0].WEB_REVIEW_FLAG;
            keystonetask = rows[0].WEB_KEYSTONE_TASK;
            skills = rows[0].WEB_PRIMARY_SKILL;
            starttime = rows[0].WEB_SPECIFIC_START_TIME;
            finishtime = rows[0].WEB_SPECIFIC_END_TIME;
            //console.log('formvalue.skills: '+skills);

            var selectquer2 = 'SELECT CASE_ID, PLANNED_ENGINEER, count(*) as Num from live_plexplanner WHERE CASE_ID LIKE \''+cases+'\' GROUP BY CASE_ID, PLANNED_ENGINEER ORDER BY CASE_ID, PLANNED_ENGINEER;';
            console.log(selectquer2);
            //query to find out the number of engineers currently assigned to the job
            pool.query(selectquer2, function (err, rows) {
                if (err) {
                    console.log('error in select2 query:' +selectquer2);
                    err.status=503;
                    return next(err);
                } else {
                    var numengs = Object.keys(rows).length;
                    console.log('numengs: '+numengs);
                    var daysforeng =  [];
                    for(var n=0;n<numengs;n++){
                        daysforeng[n] = rows[n].Num;
                    }
                    console.log('days for each eng: '+daysforeng);

                    //query to get eng specific data
                    var selectquer3 = 'SELECT * FROM live_plexplanner WHERE CASE_ID LIKE \''+cases+'\' ORDER BY CASE_ID, PLANNED_ENGINEER, PLANNED_DATE;';
                    pool.query(selectquer3, function (err, rows) {
                        if (err) {
                            console.log('error in select3 query');
                            err.status = 503;
                            return next(err);
                        } else {

                            if(numengs == 0 ) {
                                console.log('no planned engineers');
                            }else if(numengs > 0 ) {
                                engein = rows[0].PLANNED_ENGINEER;
                                tasknum = rows[0].TASK_NUMBER;
                                travel = rows[0].ENG_TRAVEL_TIME;
                                eodtravel = rows[0].EOD_TRAVEL;

                                var rowindex = 0;
                                var datestring = "";
                                for(var k=rowindex;k < daysforeng[0];k++)
                                {
                                    var cleandate = dateconverter(rows[k].PLANNED_DATE);
                                    if(k<daysforeng[0]-1) {
                                        datestring = datestring + cleandate + ', ';
                                    } else {
                                        datestring = datestring + cleandate;
                                    }
                                }
                                console.log('datestring: '+datestring);
                                console.log('rowindex: '+rowindex);
                                dates = datestring;
                                rowindex = rowindex + daysforeng[0];
                                console.log('rowindex after eng 1: '+rowindex);
                                var maxrowindex;
                                if(numengs>1) {
                                    for (var j = 2; j < numengs+ 1; j++) {   // numengs+1 [ +2 -1 = 1], + 2 because starting at 2 and -1 because we have set eng1 above
                                        eval('engein' + j + ' = rows[' + rowindex + '].PLANNED_ENGINEER');
                                        eval('tasknum' + j + ' = rows[' + rowindex + '].TASK_NUMBER');
                                        eval('travel' + j + ' = rows[' + rowindex + '].ENG_TRAVEL_TIME');
                                        eval('eodtravel' + j + ' = rows[' + rowindex + '].EOD_TRAVEL');
                                        var datestring2 = "";
                                        maxrowindex = rowindex + daysforeng[j-1];
                                        for (var kk = rowindex; kk < maxrowindex; kk++) {
                                            var cleandate2 = dateconverter(rows[kk].PLANNED_DATE);
                                            if (kk < maxrowindex - 1) {
                                                datestring2 = datestring2 + cleandate2 + ', ';
                                            } else {
                                                datestring2 = datestring2 + cleandate2;
                                            }
                                        }
                                        console.log('datestring2: ' + datestring2);
                                        eval('dates' + j + ' = datestring2');
                                        rowindex = maxrowindex;
                                        console.log('rowindex after eng('+j+'): ' + rowindex);
                                    }
                                }
                            }

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

                            cases = "";
                            estimatenum = "";
                            dso ="";
                            tmbooked ="";
                            skills="";
                            starttime="";
                            finishtime="";
                            keystonetask="";
                            travel = "";
                            eodtravel ="";
                            engein = "";
                            tasknum = "";
                            dates = "";
                            flagtofluidity ="";
                            engein2="";
                            tasknum2="";
                            eodtravel2="";
                            travel2="";
                            dates2="";
                            engein3="";
                            tasknum3="";
                            eodtravel3="";
                            travel3="";
                            dates3="";
                            engein4="";
                            tasknum4="";
                            eodtravel4="";
                            travel4="";
                            dates4="";
                            engein5="";
                            tasknum5="";
                            eodtravel5="";
                            travel5="";
                            dates5="";
                            engein6="";
                            tasknum6="";
                            eodtravel6="";
                            travel6="";
                            dates6="";

                            var obj = {"formvalues": formvalues};
                            res.send(obj);
                        }
                    });
                }
            });
        }
    });

});

module.exports = router;
