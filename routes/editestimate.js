var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");

var updatecase = "";
var updatequer2 = "";

var obj = {};
var formvalues = {};

var plannermessage ="";
var estimatenum = "";
var selectedcases = "";
var allcases = "";

var dso = "";
var tmbooked = "";
var skills = "";
var keystonetask = "";
var flagtofluidity ="";
var starttime ="";
var finishtime ="";

var travel = "";
var eodtravel="";
var engein = "";
var tasknum = "";
var dates = "";
var travel2 = "";
var eodtravel2="";
var engein2 = "";
var tasknum2 = "";
var dates2 = "";
var travel3 = "";
var eodtravel3="";
var engein3 = "";
var tasknum3 = "";
var dates3 = "";
var travel4 = "";
var eodtravel4="";
var engein4 = "";
var tasknum4 = "";
var dates4 = "";
var travel5 = "";
var eodtravel5="";
var engein5 = "";
var tasknum5 = "";
var dates5 = "";
var travel6 = "";
var eodtravel6="";
var engein6 = "";
var tasknum6 = "";
var dates6 = "";

var gangsizedropdown = [{"ASSUMED_GANG_SIZE":1},{"ASSUMED_GANG_SIZE":2},{"ASSUMED_GANG_SIZE":3},{"ASSUMED_GANG_SIZE":4},{"ASSUMED_GANG_SIZE":5},{"ASSUMED_GANG_SIZE":6}];
var traveldropdown = [{"PLANNED_TT_DURATION":10},{"PLANNED_TT_DURATION":"20"},{"PLANNED_TT_DURATION":"30"},{"PLANNED_TT_DURATION":"40"},{"PLANNED_TT_DURATION":"50"},{"PLANNED_TT_DURATION":"60"},{"PLANNED_TT_DURATION":"70"},{"PLANNED_TT_DURATION":"80"},{"PLANNED_TT_DURATION":"90"},{"PLANNED_TT_DURATION":"100"},{"PLANNED_TT_DURATION":"110"},{"PLANNED_TT_DURATION":"120"},{"PLANNED_TT_DURATION":"130"},{"PLANNED_TT_DURATION":"140"},{"PLANNED_TT_DURATION":"150"}];
var tasknumberdropdown = [{"TASK_NUMBER":1},{"TASK_NUMBER":2},{"TASK_NUMBER":3},{"TASK_NUMBER":4},{"TASK_NUMBER":5},{"TASK_NUMBER":6}];

router.all('/', loginfunction.isLoggedIn, function(req,res,next) {
    console.log('Editing Estimate');

    estimatenum = req.body.ewocestimate;
    selectedcases = req.body.cases;
    dso = req.body.dso;
    tmbooked = req.body.tmbooked;
    keystonetask = req.body.keystonetask;
    flagtofluidity = req.body.flagtofluidity;
    skills = req.body.addeditskill;
    starttime = req.body.starttime;
    finishtime =  req.body.finishtime;
    engein = req.body.engein;
    tasknum = req.body.tasknum;
    travel = req.body.traveltime;
    eodtravel = req.body.eodtravel;
    dates = req.body.dates;
    engein2 = req.body.engein2;
    tasknum2 = req.body.tasknum;
    travel2 = req.body.traveltime;
    eodtravel2 = req.body.eodtravel;
    dates2 = req.body.dates;
    engein3 = req.body.engein;
    tasknum3 = req.body.tasknum;
    travel3 = req.body.traveltime;
    eodtravel3 = req.body.eodtravel;
    dates3 = req.body.dates;
    engein4 = req.body.engein;
    tasknum4 = req.body.tasknum;
    travel4 = req.body.traveltime;
    eodtravel4 = req.body.eodtravel;
    dates4 = req.body.dates;
    engein5 = req.body.engein;
    tasknum5 = req.body.tasknum;
    travel5 = req.body.traveltime;
    eodtravel5 = req.body.eodtravel;
    dates5 = req.body.dates;
    engein6 = req.body.engein;
    tasknum6 = req.body.tasknum;
    travel6 = req.body.traveltime;
    eodtravel6 = req.body.eodtravel;
    dates6 = req.body.dates;

    var dropdownsjson = {
        "fluiditydropdown":req.cookies.fluiditycookie,
        "skillsdropdown":req.cookies.skillscookie,
        "gangsizedropdown":gangsizedropdown,
        "traveldropdown":traveldropdown,
        "tasknumberdropdown": tasknumberdropdown
    };

    var formvalues = {
        "estimatenum":estimatenum,
        "dso":dso,
        "cases":selectedcases,
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
    //console.log('selected cases: '+selectedcases +'|'+'All cases: '+JSON.stringify(allcases));
    var str = "Updated Row (EST_NUM[" + estimatenum +"], CASE_ID[" + selectedcases +"]): ";
    var selectcolumns = "";
    var selectcolcount=0;

    console.log('initialised');
    if(selectedcases) {
        console.log("selected cases"+selectedcases+" length: "+selectedcases.length);
        updatecase = "UPDATE live_workstack SET";
        updatequer2 = "UPDATE live_workstack SET";
        // case specific form info
        if (dso) {
            updatecase = updatecase + " WEB_DSO_BOOKED = '" + dso + "' ,";
            updatecase = updatecase + " WEB_SYSTEM_DEFINED_PRIORITY = '3.1' ,";
            //updatequer = updatequer + " SYSTEM_DEFINED_PRIORITY = '3.1' ,";
            updatecase = updatecase + " PRIORITY_DESCRIPTION = 'Urgent' ,";
            str = str + "DSO_BOOKED=Y ";
            selectcolumns = selectcolumns + " WEB_DSO_BOOKED, WEB_SYSTEM_DEFINED_PRIORITY, PRIORITY_DESCRIPTION,";
            selectcolcount = selectcolcount + 3;
        }
        if (flagtofluidity) {
            updatecase = updatecase + " FLAG_TO_FLUIDITY = '" + flagtofluidity + "' ,";
            str = str + "FlagToFluidity=Y ";
            selectcolumns = selectcolumns + " FLAG_TO_FLUIDITY,";
            selectcolcount++;
        }
        if (tmbooked) {
            updatecase = updatecase + " WEB_DEPENDENCIES_BOOKED = '" + tmbooked + "' ,";
            updatecase = updatecase + " WEB_SYSTEM_DEFINED_PRIORITY = '1.5' ,";
            //updatecase = updatecase + " SYSTEM_DEFINED_PRIORITY = '1.5' ,";
            updatecase = updatecase + " WEB_PRIORITY_DESCRIPTION = 'P1' ,";
            str = str + "Dependancies=Y ";
            selectcolumns = selectcolumns + " WEB_DEPENDENCIES_BOOKED, WEB_PRIORITY_DESCRIPTION, WEB_SYSTEM_DEFINED_PRIORITY,";
            selectcolcount = selectcolcount + 3;
        }
        if(keystonetask){
                                /// what to do here?
        }
        if (skills) {
            //updatecase = updatecase + " PRIMARY_SKILL = '" + skills + "' ,";
            updatecase = updatecase + " WEB_PRIMARY_SKILL = '" + skills + "' ,";
            str = str + "Primary Skill = "+ skills+" ";
            selectcolumns = selectcolumns + " WEB_PRIMARY_SKILL,";
            selectcolcount++;
        }
        if (starttime) {
            updatecase = updatecase + " WEB_SPECIFIC_START_TIME = '" + starttime + "' ,";
            str = str + "Start Time = "+ starttime+" ";
            selectcolumns = selectcolumns + " WEB_SPECIFIC_START_TIME,";
            selectcolcount++;
        }
        if (finishtime) {
            updatecase = updatecase + " WEB_SPECIFIC_END_TIME = '" + finishtime + "' ,";
            str = str + "Start Time = "+ finishtime+" ";
            selectcolumns = selectcolumns + " WEB_SPECIFIC_END_TIME,";
            selectcolcount++;
        }


        // engineer specific form info
        var insertorupdate="";
        pool.query('SELECT distinct PLANNED_ENGINEER FROM live_plexplanner WHERE CASE_ID LIKE \''+cases+'\' AND PLANNED_ENGINEER IN (\''+engein+'\', \''+engein2'\', \''+engein3+'\', \''){

            //LOGIC: get array of all eins hat exisits for htat case. if rows = 0 then all engs are inserted. Otheriwise, check if each ein is in the array, if yes then update else insert.

            if err {

            } else {
                if rows > 0 {
                    insertrorupdate = update;
                }else {
                    insertrorupdate = insert;
                }
            }
        }

        if (insert)
        {
            var insert query
        }

        // TODO: check if that case_id & EIN exisit in plexplanner, if yes then update, if no then insert. DO this for each engineer.
        if (engein) {
            updatequer2 = updatequer2 + " WEB_PLANNED_ENGINEERS = '" + engein + "' ,";
            str = str + "Task pinned to = "+ engein+" ";
            selectcolumns = selectcolumns + " WEB_PLANNED_ENGINEERS,";
            selectcolcount++;
        }
        if (tasknum) {
            updatequer2 = updatequer2 + " WEB_TASK_NUMBER = '" + tasknum + "' ,";
            str = str + "Task Num = "+ tasknum+" ";
            selectcolumns = selectcolumns + " WEB_TASK_NUMBER,";
            selectcolcount++;
        }
        if (travel) {
            updatequer2 = updatequer2 + " WEB_ENG_TRAVEL_TIME = '" + travel + "' ,";
            str = str + "Travel = "+ travel+" ";
            selectcolumns = selectcolumns + " WEB_ENG_TRAVEL_TIME,";
            selectcolcount++;
        }
        if (eodtravel) {
            updatequer2 = updatequer2 + " EOD_TRAVEL = '" + eodtravel + "' ,";
            str = str + "EOD Travel = "+ eodtravel+" ";
            selectcolumns = selectcolumns + " EOD_TRAVEL,";
            selectcolcount++;
        }
        if (dates) {
            updatequer2 = updatequer2 + " WEB_PLANNED_DATE = '" + dates + "' ,";
            str = str + "Date(s) planned = "+ dates+" ";
            selectcolumns = selectcolumns + " WEB_PLANNED_DATE,";
            selectcolcount++;
        }

        //for(var cc = 2;cc<=5;cc++){
        //    eval('if(engein'+cc+'){ conosole.log(\'hiiiiii\')');
        //}


        updatecase = updatecase +" MOD_UIN = '"+req.cookies.EIN+"';";
        updatequer2 = updatequer2 +" MOD_UIN = '"+req.cookies.EIN+"';";

        updatecase = updatecase.slice(",", -1);
        selectcolumns = selectcolumns.slice(",", -1);
        updatecase = updatecase + " WHERE ESTIMATENUMBER = '" + estimatenum + "' AND CASE_ID in ('" + selectedcases + "');";
        var selectquer = "SELECT"+selectcolumns+" FROM live_workstack a INNER JOIN eng_case_table b ON a.case_id = b.case_id WHERE ESTIMATENUMBER LIKE '"+estimatenum +"' AND CASE_ID in ('" + selectedcases +"');";
        console.log('select query: '+selectquer);

        pool.query(updatecase, function (err, rows) {
            if (err) {
                console.log('error in update query');
                err.status=503;
                return next(err);
            } else {
                console.log('Database Updated');
                pool.query(selectquer, function (err, rows) {
                    if (err) {
                        console.log('Error in select query');
                        err.status=503;
                        return next(err);
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



