var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");

router.all('/', loginfunction.isLoggedIn, function(req,res,next) {
    var updatecase = "";
    var updatequer2 = "";

    var obj = {};
    var formvalues = {};

    var plannermessage ="";
    var estimatenum = "";
    var selectedcases = "";

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

    estimatenum = req.body.ewocestimate;
    selectedcases = req.body.cases;
    var numengs;
    console.log('selectedcases: '+selectedcases);
    //console.log('numengs: '+numengs);
    //res.clearCookie("cases");

    dso = req.body.dso;
    tmbooked = req.body.tmbooked;
    keystonetask = req.body.keystonetask;
    flagtofluidity = req.body.flagtofluidity;
    skills = req.body.addeditskill;
    starttime = req.body.starttime;
    finishtime =  req.body.finishtime;
    engein = req.body.engein;
    console.log('engein:' +engein);

    tasknum = req.body.tasknum;
    travel = req.body.traveltime;
    eodtravel = req.body.eodtravel;
    dates = req.body.dates;
    engein2 = req.body.engein2;
    tasknum2 = req.body.tasknum2;
    travel2 = req.body.traveltime2;
    eodtravel2 = req.body.eodtravel2;
    dates2 = req.body.dates2;
    engein3 = req.body.engein3;
    tasknum3 = req.body.tasknum3;
    travel3 = req.body.traveltime3;
    eodtravel3 = req.body.eodtravel3;
    dates3 = req.body.dates3;
    engein4 = req.body.engein4;
    tasknum4 = req.body.tasknum4;
    travel4 = req.body.traveltime4;
    eodtravel4 = req.body.eodtravel4;
    dates4 = req.body.dates4;
    engein5 = req.body.engein5;
    tasknum5 = req.body.tasknum5;
    travel5 = req.body.traveltime5;
    eodtravel5 = req.body.eodtravel5;
    dates5 = req.body.dates5;
    engein6 = req.body.engein6;
    tasknum6 = req.body.tasknum6;
    travel6 = req.body.traveltime6;
    eodtravel6 = req.body.eodtravel6;
    dates6 = req.body.dates6;

    var dropdownsjson = {
        "fluiditydropdown":req.cookies.fluiditycookie,
        "skillsdropdown":req.cookies.skillscookie,
        "gangsizedropdown":gangsizedropdown,
        "traveldropdown":traveldropdown,
        "tasknumberdropdown": tasknumberdropdown
    };

    formvalues = {
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
    var str = "Updated Row (EST_NUM[" + estimatenum +"], CASE_ID[" + selectedcases +"]): ";
    var selectcolumns = "";
    var selectcolcount=0;

    console.log('initialised');
    if(selectedcases) {
        console.log("selected case: "+selectedcases);
        updatecase = "UPDATE live_workstack SET";
        updatequer2 = "UPDATE live_workstack SET";

        // case specific form info
        if (dso) {
            updatecase = updatecase + " WEB_DSO_BOOKED = '" + dso + "' ,";
            updatecase = updatecase + " WEB_SYSTEM_DEFINED_PRIORITY = '3.1' ,";
            //updatequer = updatequer + " SYSTEM_DEFINED_PRIORITY = '3.1' ,";
            updatecase = updatecase + " WEB_PRIORITY_DESCRIPTION = 'Urgent' ,";
            str = str + "DSO_BOOKED=Y ";
            selectcolumns = selectcolumns + " WEB_DSO_BOOKED, WEB_SYSTEM_DEFINED_PRIORITY, WEB_PRIORITY_DESCRIPTION,";
            selectcolcount = selectcolcount + 2;
        }
        if (flagtofluidity) {
            updatecase = updatecase + " WEB_REVIEW_FLAG = '" + flagtofluidity + "' ,";
            str = str + "FlagToFluidity=Y ";
            selectcolumns = selectcolumns + " WEB_REVIEW_FLAG,";
            selectcolcount++;
        }
        if (tmbooked) {
            updatecase = updatecase + " WEB_DEPENDENCIES_BOOKED = '" + tmbooked + "' ,";
            updatecase = updatecase + " WEB_SYSTEM_DEFINED_PRIORITY = '1.5' ,";
            //updatecase = updatecase + " SYSTEM_DEFINED_PRIORITY = '1.5' ,";
            updatecase = updatecase + " WEB_PRIORITY_DESCRIPTION = 'P1' ,";
            str = str + "Dependancies=Y ";
            selectcolumns = selectcolumns + " WEB_DEPENDENCIES_BOOKED, WEB_PRIORITY_DESCRIPTION, WEB_SYSTEM_DEFINED_PRIORITY,";
            selectcolcount = selectcolcount + 2;
        }
        if(keystonetask){
            updatecase = updatecase + " WEB_KEYSTONE_TASK = \'Y\',";
            str = str + "Keystone Task=Y ";
            selectcolumns = selectcolumns + " WEB_KEYSTONE_TASK,";
            selectcolcount = selectcolcount++;
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


        // delete all case data from engineer table.
        var deleteexisting = 'DELETE FROM live_plexplanner WHERE CASE_ID LIKE \'' + selectedcases + '\';';
        console.log(deleteexisting);
        pool.query(deleteexisting, function (err, rows) {
            if (err) {
                console.log('error in delete query');
                err.status = 503;
                return next(err);
            } else {
                console.log(rows.affectedRows + 'Rows Deleted:' + JSON.stringify(rows));
            }
        });



        var fullinsertquery ="";
        var insertquerpre = "INSERT INTO live_plexplanner ";
        var insertquerfields = "(";
        var insertquermid = " VALUES ";
        var insertquervalues = "(";
        var daysworking;
        var splitdates;
        var looper =0;
        if(engein.length>0){
            looper++;
        } if(engein2.length>0){
            looper++;
        } if(engein3.length>0){
            looper++;
        } if(engein4.length>0){
            looper++;
        } if(engein5.length>0){
            looper++;
        } if(engein6.length>0){
            looper++;
        }
        numengs = looper;

        if (engein.length>0) {
            console.log('engein1 exists');
            // set count to num of days eng io working on the case
            splitdates = dates.split(",");
            for(var temp1=0;temp1<splitdates.length;temp1++){
                splitdates[temp1] = splitdates[temp1].trim();
            }
            console.log('num of days eng1 is working: '+splitdates.length);
            for(var p =0; p<splitdates.length;p++) {
                // Set Web Planned Flag
                updatecase = updatecase + " WEB_PLANNED_FLAG = \'Y\',";

                //set case_id of row to be inserted
                insertquerfields = insertquerfields + " CASE_ID ,";
                insertquervalues = insertquervalues + " \'" + selectedcases + "\',";

                //insert eng specific data
                insertquerfields = insertquerfields + " PLANNED_ENGINEER ,";
                insertquervalues = insertquervalues + " \'" + engein + "\',";
                str = str + "Task pinned to = " + engein + " ";
                //selectcolumns = selectcolumns + " PLANNED_ENGINEERS,";
                //selectcolcount++;

                if (tasknum.length>0) {
                    insertquerfields = insertquerfields + " TASK_NUMBER ,";
                    insertquervalues = insertquervalues + " \'" + tasknum + "\',";
                    str = str + "Task Number = " + tasknum + " ";
                    //selectcolumns = selectcolumns + " TASK_NUMBER,";
                    //selectcolcount++;
                }
                if (travel.length>0) {
                    insertquerfields = insertquerfields + " ENG_TRAVEL_TIME ,";
                    insertquervalues = insertquervalues + " \'" + travel + "\',";
                    str = str + "Travel = " + travel + " ";
                    //selectcolumns = selectcolumns + " ENG_TRAVEL_TIME,";
                    //selectcolcount++;
                }
                if (eodtravel.length>0) {
                    insertquerfields = insertquerfields + " EOD_TRAVEL ,";
                    insertquervalues = insertquervalues + " \'" + eodtravel + "\',";
                    str = str + "EOD Travel = " + eodtravel + " ";
                    //selectcolumns = selectcolumns + " EOD_TRAVEL,";
                    //selectcolcount++;
                }
                if (splitdates.length>0) {
                    insertquerfields = insertquerfields + " PLANNED_DATE ,";
                    insertquervalues = insertquervalues + " str_to_date(\'" + splitdates[p] + " 00:00:00\','%m/%d/%Y %H:%i:%s'),";
                    str = str + "Dates = " + splitdates[p] + " ";
                    //selectcolumns = selectcolumns + " PLANNED_DATE,";
                    //selectcolcount++;

                }

                insertquerfields = insertquerfields.slice(",", -1);
                insertquerfields = insertquerfields + ")";
                insertquervalues = insertquervalues.slice(",", -1);
                insertquervalues = insertquervalues + ")";

                fullinsertquery = insertquerpre + insertquerfields + insertquermid + insertquervalues + ";";
                console.log('insertquer'+p+': ' + fullinsertquery);

                pool.query(fullinsertquery, function(err,rows)
                 {
                     if (err) {
                        console.log('error in insert query on eng1, day '+p);
                        err.status=503;
                     return next(err);
                     } else {
                        console.log('Rows Inserted Successfully: '+rows.affectedRows);
                     }
                 });

                insertquerfields = "(";
                insertquervalues = "(";
            }
        }

        console.log('numengsbefore eng 2: '+numengs);

        for(var ij=2;ij<numengs+1;ij++) {
            if (eval('engein' + ij+'.length > 0')) {
                // set count to num of days eng io working on the case
                eval('splitdates = dates'+ij+'.split(",")');
                for (var temp = 0; temp < splitdates.length; temp++) {
                    splitdates[temp] = splitdates[temp].trim();
                }
                console.log('num of days eng'+ij +' is working: '+splitdates.length);
                for (var pp = 0; pp < splitdates.length; pp++) {
                    // Set Web Planned Flag
                    updatecase = updatecase + " WEB_PLANNED_FLAG = \'Y\',";

                    //set case_id of row to be inserted
                    insertquerfields = insertquerfields + " CASE_ID ,";
                    insertquervalues = insertquervalues + " \'" + selectedcases + "\',";

                    //insert eng specific data
                    insertquerfields = insertquerfields + " PLANNED_ENGINEER ,";
                    insertquervalues = insertquervalues + " \'" + eval('engein'+ij) + "\',";
                    str = str + "Task pinned to = " + eval('engein'+ij) + " ";
                    //selectcolumns = selectcolumns + " PLANNED_ENGINEERS,";
                    //selectcolcount++;

                    if (eval('tasknum'+ij+'.length > 0')) {
                        insertquerfields = insertquerfields + " TASK_NUMBER ,";
                        insertquervalues = insertquervalues + " \'" + eval('tasknum'+ij) + "\',";
                        str = str + "Task Number = " + eval('tasknum'+ij) + " ";
                        //selectcolumns = selectcolumns + " TASK_NUMBER,";
                        //selectcolcount++;
                    }
                    if (eval('travel'+ij+'.length > 0')) {
                        insertquerfields = insertquerfields + " ENG_TRAVEL_TIME ,";
                        insertquervalues = insertquervalues + " \'" + eval('travel'+ij) + "\',";
                        str = str + "Travel = " + eval('travel'+ij) + " ";
                        //selectcolumns = selectcolumns + " ENG_TRAVEL_TIME,";
                        //selectcolcount++;
                    }
                    if (eval('eodtravel'+ij+'.length > 0')) {
                        insertquerfields = insertquerfields + " EOD_TRAVEL ,";
                        insertquervalues = insertquervalues + " \'" + eval('eodtravel'+ij) + "\',";
                        str = str + "EOD Travel = " + eval('eodtravel'+ij) + " ";
                        //selectcolumns = selectcolumns + " EOD_TRAVEL,";
                        //selectcolcount++;
                    }
                    if (splitdates.length>0) {
                        insertquerfields = insertquerfields + " PLANNED_DATE ,";
                        insertquervalues = insertquervalues + " str_to_date(\'" + splitdates[pp] + " 00:00:00\','%m/%d/%Y %H:%i:%s'),";
                        str = str + "Dates = " + splitdates[pp] + " ";
                        //selectcolumns = selectcolumns + " PLANNED_DATE,";
                        //selectcolcount++;

                    }

                    insertquerfields = insertquerfields.slice(",", -1);
                    insertquerfields = insertquerfields + ")";
                    insertquervalues = insertquervalues.slice(",", -1);
                    insertquervalues = insertquervalues + ")";

                    fullinsertquery = insertquerpre + insertquerfields + insertquermid + insertquervalues + ";";
                    console.log('eng'+ij+', insertquer' + pp + ': ' + fullinsertquery);

                    pool.query(fullinsertquery, function (err, rows) {
                        if (err) {
                            console.log('error in insert query on eng'+ij+', day ' + pp);
                            err.status = 503;
                            return next(err);
                        } else {
                            console.log('Rows Inserted Successfully: ' + rows.affectedRows);
                        }
                    });

                    insertquerfields = "(";
                    insertquervalues = "(";
                }
            }
        }

        updatecase = updatecase +" WEB_MOD_UIN = \'"+req.cookies.EIN+"\';";
        updatecase = updatecase.slice(",", -1);
        selectcolumns = selectcolumns.slice(",", -1);
        updatecase = updatecase + " WHERE ESTIMATENUMBER LIKE '" + estimatenum + "' AND CASE_ID LIKE '"+selectedcases+"';";

        var selectquer = "SELECT"+selectcolumns+" FROM live_workstack WHERE ESTIMATENUMBER LIKE '"+estimatenum +"' AND CASE_ID LIKE '"+selectedcases+"';";
        console.log('select query: '+selectquer);
        console.log('updatecase: '+updatecase);

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

                        //console.log("rows: "+JSON.stringify(rows));
                        obj = {"dropdownsjson":dropdownsjson,
                            "plannermessage": str,
                            "formvalues": formvalues,
                            "cases":req.cookies.cases,
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
            "cases": req.cookies.cases,
            "db":"",
            "rowsize": selectcolcount,
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
    selectedcases = "";
    dso = "";
    tmbooked = "";
    skills = "";
    travel = "";
    engein = "";
    tasknum = "";
    dates = "";
    plannermessage="";

});

module.exports = router;



