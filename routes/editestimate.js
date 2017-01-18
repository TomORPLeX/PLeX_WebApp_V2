var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");

var updatequer = "";

var obj = {};
var formvalues = {};

var plannermessage ="";
var estimatenum = "";
var selectedcases = "";
var allcases = "";
var dso = "";
var tmbooked = "";
var fluiditystatus = "";
var gangsize = "";
var skills = "";
var tasktime = "";
var unpintask = "";
var travel = "";
var eodtravel="";
var engein = "";
var tasknum = "";
var dates = "";
var flagtofluidity ="";

var gangsizedropdown = [{"ASSUMED_GANG_SIZE":1},{"ASSUMED_GANG_SIZE":2},{"ASSUMED_GANG_SIZE":3},{"ASSUMED_GANG_SIZE":4},{"ASSUMED_GANG_SIZE":5},{"ASSUMED_GANG_SIZE":6}];
var traveldropdown = [{"PLANNED_TT_DURATION":10},{"PLANNED_TT_DURATION":"20"},{"PLANNED_TT_DURATION":"30"},{"PLANNED_TT_DURATION":"40"},{"PLANNED_TT_DURATION":"50"},{"PLANNED_TT_DURATION":"60"},{"PLANNED_TT_DURATION":"70"},{"PLANNED_TT_DURATION":"80"},{"PLANNED_TT_DURATION":"90"},{"PLANNED_TT_DURATION":"100"},{"PLANNED_TT_DURATION":"110"},{"PLANNED_TT_DURATION":"120"},{"PLANNED_TT_DURATION":"130"},{"PLANNED_TT_DURATION":"140"},{"PLANNED_TT_DURATION":"150"}];
var tasknumberdropdown = [{"TASK_NUMBER":1},{"TASK_NUMBER":2},{"TASK_NUMBER":3},{"TASK_NUMBER":4},{"TASK_NUMBER":5},{"TASK_NUMBER":6}];

router.all('/', loginfunction.isLoggedIn, function(req,res,next) {
    console.log('Editing Estimate');

    estimatenum = req.body.ewocestimate;
    allcases = req.cookies.cases;
    selectedcases = req.body.cases;
    dso = req.body.dso;
    tmbooked = req.body.tmbooked;
    fluiditystatus = req.body.fluiditystatus;
    gangsize = req.body.gangsize;
    skills = req.body.addeditskill;
    tasktime = req.body.tasktime;
    unpintask = req.body.unpintask;
    travel = req.body.traveltime;
    eodtravel = req.body.eodtravel;
    engein = req.body.engein;
    tasknum = req.body.tasknum;
    dates = req.body.dates;
    flagtofluidity = req.body.flagtofluidity;

    var dropdownsjson = {
        "fluiditydropdown":req.cookies.fluiditycookie,
        "skillsdropdown":req.cookies.skillscookie,
        "gangsizedropdown":gangsizedropdown,
        "traveldropdown":traveldropdown,
        "tasknumberdropdown": tasknumberdropdown
    };

    formvalues = {
        "estimatenum":estimatenum,
        "cases":selectedcases,
        "dso":dso,
        "tmbooked":tmbooked,
        "fluiditystatus":fluiditystatus,
        "gangsize":gangsize,
        "skills":skills,
        "tasktime":tasktime,
        "unpintask":unpintask,
        "travel":travel,
        "eodtravel":eodtravel,
        "engein":engein,
        "tasknum":tasknum,
        "dates":dates,
        "flagtofluidity":flagtofluidity
    };
    //console.log('selected cases: '+selectedcases +'|'+'All cases: '+JSON.stringify(allcases));
    var str = "Updated Row (EST_NUM[" + estimatenum +"], CASE_ID[" + selectedcases +"]): ";
    var selectcolumns = "";
    var selectcolcount=0;
    if(selectedcases) {
        console.log("selected cases"+selectedcases+" length: "+selectedcases.length);
        updatequer = "UPDATE live_workstack SET";
        if (dso) {
            updatequer = updatequer + " WEB_DSO_BOOKED = '" + dso + "' ,";
            updatequer = updatequer + " WEB_SYSTEM_DEFINED_PRIORITY = '3.1' ,";
            updatequer = updatequer + " SYSTEM_DEFINED_PRIORITY = '3.1' ,";
            updatequer = updatequer + " PRIORITY_DESCRIPTION = 'Urgent' ,";
            str = str + "DSO_BOOKED=Y ";
            selectcolumns = selectcolumns + " WEB_DSO_BOOKED, WEB_SYSTEM_DEFINED_PRIORITY, PRIORITY_DESCRIPTION,";
            selectcolcount = selectcolcount + 3;
        }
        if (flagtofluidity) {
            updatequer = updatequer + " FLAG_TO_FLUIDITY = '" + flagtofluidity + "' ,";
            str = str + "FlagToFluidity=Y ";
            selectcolumns = selectcolumns + " FLAG_TO_FLUIDITY,";
            selectcolcount++;
        }
        if (tmbooked) {
            updatequer = updatequer + " WEB_DEPENDENCIES_BOOKED = '" + tmbooked + "' ,";
            updatequer = updatequer + " WEB_SYSTEM_DEFINED_PRIORITY = '1.5' ,";
            updatequer = updatequer + " SYSTEM_DEFINED_PRIORITY = '1.5' ,";
            updatequer = updatequer + " PRIORITY_DESCRIPTION = 'P1' ,";
            str = str + "Dependancies=Y ";
            selectcolumns = selectcolumns + " WEB_DEPENDENCIES_BOOKED, PRIORITY_DESCRIPTION, WEB_SYSTEM_DEFINED_PRIORITY,";
            selectcolcount = selectcolcount + 3;
        }
        if (fluiditystatus) {
            updatequer = updatequer + " CASE_STATUS = '" + fluiditystatus + "' ,";
            updatequer = updatequer + " WEB_CASE_STATUS = 1 ,";
            str = str + "Fluidity Status = "+ fluiditystatus +" ";
            selectcolumns = selectcolumns + " CASE_STATUS,";
            selectcolcount++;
        }
        if (gangsize) {
            updatequer = updatequer + " ASSUMED_GANG_SIZE = '" + gangsize + "' ,";
            updatequer = updatequer + " WEB_ASSUMED_GANG_SIZE = '" + gangsize + "' ,";
            str = str + "Gang Size = "+ gangsize +" ";
            selectcolumns = selectcolumns + " ASSUMED_GANG_SIZE,";
            selectcolcount++;
        }
        if (skills) {
            updatequer = updatequer + " PRIMARY_SKILL = '" + skills + "' ,";
            updatequer = updatequer + " WEB_PRIMARY_SKILL = '" + skills + "' ,";
            str = str + "Primary Skill = "+ skills+" ";
            selectcolumns = selectcolumns + " PRIMARY_SKILL,";
            selectcolcount++;
        }
        if (tasktime) {
            updatequer = updatequer + " PLANNED_TT_DURATION = '" + tasktime + "' ,";
            updatequer = updatequer + " WEB_PLANNED_TT_DURATION = '" + tasktime + "' ,";
            str = str + "Task Time = "+ tasktime +" ";
            selectcolumns = selectcolumns + " PLANNED_TT_DURATION,";
            selectcolcount++;
        }
        if (unpintask) {
            updatequer = updatequer + " WEB_PLANNED_ENGINEERS = '' ,";
            str = str + "Job removed from engineer "+engein+" ";
            selectcolumns = selectcolumns + " WEB_PLANNED_ENGINEERS,";
            selectcolcount++;
        }
        if (travel) {
            updatequer = updatequer + " WEB_ENG_TRAVEL_TIME = '" + travel + "' ,";
            str = str + "Travel = "+ travel+" ";
            selectcolumns = selectcolumns + " WEB_ENG_TRAVEL_TIME,";
            selectcolcount++;
        }
        if (eodtravel) {
            updatequer = updatequer + " EOD_TRAVEL = '" + eodtravel + "' ,";
            str = str + "EOD Travel = "+ eodtravel+" ";
            selectcolumns = selectcolumns + " EOD_TRAVEL,";
            selectcolcount++;
        }
        if (engein) {
            updatequer = updatequer + " WEB_PLANNED_ENGINEERS = '" + engein + "' ,";
            str = str + "Task pinned to = "+ engein+" ";
            selectcolumns = selectcolumns + " WEB_PLANNED_ENGINEERS,";
            selectcolcount++;
        }
        if (tasknum) {
            updatequer = updatequer + " WEB_TASK_NUMBER = '" + tasknum + "' ,";
            str = str + "Task Num = "+ tasknum+" ";
            selectcolumns = selectcolumns + " WEB_TASK_NUMBER,";
            selectcolcount++;
        }
        if (dates) {
            updatequer = updatequer + " WEB_PLANNED_DATE = '" + dates + "' ,";
            str = str + "Date(s) planned = "+ dates+" ";
            selectcolumns = selectcolumns + " WEB_PLANNED_DATE,";
            selectcolcount++;
        }
        updatequer = updatequer +" MOD_UIN = '"+req.cookies.EIN+"';";

        updatequer = updatequer.slice(",", -1);
        selectcolumns = selectcolumns.slice(",", -1);
        updatequer = updatequer + " WHERE ESTIMATENUMBER = '" + estimatenum + "' AND CASE_ID in ('" + selectedcases + "');";
        var selectquer = "SELECT"+selectcolumns+" FROM live_workstack WHERE ESTIMATENUMBER LIKE '"+estimatenum +"' AND CASE_ID in ('" + selectedcases +"');";
        console.log('select query: '+selectquer);

        pool.query(updatequer, function (err, rows) {
            if (err) {
                console.log('error in update query');
                throw err;
            } else {
                console.log('Database Updated');
                pool.query(selectquer, function (err, rows) {
                    if (err) {
                        console.log('Error in select query');
                        throw err;
                    } else {
                        console.log("rows: "+JSON.stringify(rows));
                        obj = {"dropdownsjson":dropdownsjson,
                            "plannermessage": str,
                            "formvalues": formvalues,
                            "cases":allcases,
                            "db":rows,
                            "rowsize": selectcolcount,
                            "loginFlag":req.cookies.loginFlag,
                            "adminFlag":req.cookies.adminFlag};
                            res.render('planner', obj);
                    }
                });
            }
        });



    } else
    {
        plannermessage = "Please select cases to edit";
        obj = {"dropdownsjson":dropdownsjson,
            "plannermessage": plannermessage,
            "formvalues": formvalues,
            "cases": allcases,
            "db":"",
            "loginFlag":req.cookies.loginFlag,
            "adminFlag":req.cookies.adminFlag
        };

        console.log("form values: "+JSON.stringify(obj.formvalues));
        res.render('planner', obj);
    }

    //call update function
/*
    selectquer = "SELECT * FROM live_table WHERE CASE_ID IN ("+cases+");";
    pool.query(updatequer, function (err, rows) {
        if (err) {
            console.log('Error in update query');
            throw err; //what does this actually do?!
        } else {
            console.log('Database Updated');
            pool.query(selectquer, function (err, rows) {
                if (err) {
                    console.log('Error in select query');
                    throw err;
                } else {
                    plannermessage = "Record Updated";
                    obj = { "db": rows,
                        "formvalues": formvalues,
                        "plannermessage": plannermessage};
                    res.render('admin', obj);
                }
            });
        }
    });*/

// Reset form values to ""
    estimatenum = "";
    allcases = "";
    selectedcases = "";
    dso = "";
    tmbooked = "";
    fluiditystatus = "";
    gangsize = "";
    skills = "";
    tasktime = "";
    unpintask = "";
    travel = "";
    engein = "";
    tasknum = "";
    dates = "";
    plannermessage="";

});

module.exports = router;



