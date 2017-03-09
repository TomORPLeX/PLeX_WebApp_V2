var express = require('express');
var fs = require('fs');
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
    var notesarray =["","","","","","",""];

    var delflag=0;
    var delflag2=0;
    var delflag3=0;
    var delflag4=0;
    var delflag5=0;
    var delflag6=0;

    var gangsizedropdown = [{"ASSUMED_GANG_SIZE":1},{"ASSUMED_GANG_SIZE":2},{"ASSUMED_GANG_SIZE":3},{"ASSUMED_GANG_SIZE":4},{"ASSUMED_GANG_SIZE":5},{"ASSUMED_GANG_SIZE":6}];
    var traveldropdown = [{"PLANNED_TT_DURATION":10},{"PLANNED_TT_DURATION":"20"},{"PLANNED_TT_DURATION":"30"},{"PLANNED_TT_DURATION":"40"},{"PLANNED_TT_DURATION":"50"},{"PLANNED_TT_DURATION":"60"},{"PLANNED_TT_DURATION":"70"},{"PLANNED_TT_DURATION":"80"},{"PLANNED_TT_DURATION":"90"},{"PLANNED_TT_DURATION":"100"},{"PLANNED_TT_DURATION":"110"},{"PLANNED_TT_DURATION":"120"},{"PLANNED_TT_DURATION":"130"},{"PLANNED_TT_DURATION":"140"},{"PLANNED_TT_DURATION":"150"}];
    var tasknumberdropdown = [{"TASK_NUMBER":1},{"TASK_NUMBER":2},{"TASK_NUMBER":3},{"TASK_NUMBER":4},{"TASK_NUMBER":5},{"TASK_NUMBER":6}];

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
    notesarray[1] = req.body.note1;
    notesarray[2] = req.body.note2;
    notesarray[3] = req.body.note3;
    notesarray[4] = req.body.note4;
    notesarray[5] = req.body.note5;
    notesarray[6] = req.body.note6;

    var numengs;

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
        "dates6":dates6,
        "notesarray": notesarray
    };
    var str = "EST_NUM: <b>" + estimatenum +"</b>   CASE_ID: <b>" + selectedcases +"</b><br /><br />";
    var selectcolumns = "";
    var selectcolcount=0;

    console.log('Initialised Edit Estimate');
    if(selectedcases) {
        console.log("selected case: "+selectedcases);
        updatecase = "UPDATE live_workstack SET";
        updatequer2 = "UPDATE live_workstack SET";

        // case specific form info
        if (dso) {
            updatecase = updatecase + " WEB_DSO_BOOKED = \'Y\' ,";
            updatecase = updatecase + " WEB_SYSTEM_DEFINED_PRIORITY = \'3\' ,";
            updatecase = updatecase + " WEB_PRIORITY_DESCRIPTION = \'P3\' ,";
            updatecase = updatecase + " WEB_SYSTEM_DEFINED_PRIORITY_FLAG = \'1\' ,";
            str = str + "DSO_BOOKED = Y <br />";
            selectcolumns = selectcolumns + " WEB_DSO_BOOKED, WEB_SYSTEM_DEFINED_PRIORITY, WEB_PRIORITY_DESCRIPTION,";
            selectcolcount = selectcolcount + 3;
        } else {
            updatecase = updatecase + " WEB_DSO_BOOKED = NULL ,";
            updatecase = updatecase + " WEB_SYSTEM_DEFINED_PRIORITY = SYSTEM_DEFINED_PRIORITY ,";
            updatecase = updatecase + " WEB_PRIORITY_DESCRIPTION = PRIORITY_DESCRIPTION ,";
            updatecase = updatecase + " WEB_SYSTEM_DEFINED_PRIORITY_FLAG = NULL ,";
            str = str + "DSO_BOOKED = N <br />";
        }
        if (flagtofluidity) {
            updatecase = updatecase + " WEB_REVIEW_FLAG = '1' ,";
            str = str + "FlagToFluidity = Y <br />";
            selectcolumns = selectcolumns + " WEB_REVIEW_FLAG,";
            selectcolcount++;
        } else {
            updatecase = updatecase + " WEB_REVIEW_FLAG = NULL ,";
            str = str + "FlagToFluidity = N <br />";
        }
        if (tmbooked) {
            updatecase = updatecase + " WEB_DEPENDENCIES_BOOKED = 'Y' ,";
            updatecase = updatecase + " WEB_SYSTEM_DEFINED_PRIORITY = '1' ,";
            updatecase = updatecase + " WEB_PRIORITY_DESCRIPTION = 'P1' ,";
            updatecase = updatecase + " WEB_SYSTEM_DEFINED_PRIORITY_FLAG = \'1\' ,";
            str = str + "Dependancies Booked = Y <br />";
            selectcolumns = selectcolumns + " WEB_DEPENDENCIES_BOOKED, WEB_PRIORITY_DESCRIPTION, WEB_SYSTEM_DEFINED_PRIORITY,";
            selectcolcount = selectcolcount + 3;
        } else {
            updatecase = updatecase + " WEB_DEPENDENCIES_BOOKED = NULL ,";
            updatecase = updatecase + " WEB_SYSTEM_DEFINED_PRIORITY = SYSTEM_DEFINED_PRIORITY ,";
            updatecase = updatecase + " WEB_PRIORITY_DESCRIPTION = PRIORITY_DESCRIPTION ,";
            updatecase = updatecase + " WEB_SYSTEM_DEFINED_PRIORITY_FLAG = NULL ,";
            str = str + "Dependancies Booked = N <br />";
        }
        if(keystonetask){
            updatecase = updatecase + " WEB_KEYSTONE_TASK = \'Y\',";
            str = str + "Keystone Task = Y <br />";
            selectcolumns = selectcolumns + " WEB_KEYSTONE_TASK ";
            selectcolcount = selectcolcount++;
        } else {
            updatecase = updatecase + " WEB_KEYSTONE_TASK = NULL ,";
            str = str + "Keystone Task = N <br />";
        }
        if (skills) {
            //updatecase = updatecase + " PRIMARY_SKILL = '" + skills + "' ,";
            updatecase = updatecase + " WEB_PRIMARY_SKILL = '" + skills + "' ,";
            updatecase = updatecase + " WEB_PRIMARY_SKILL_FLAG = '1' ,";
            str = str + "Primary Skill = "+ skills+" <br />";
            selectcolumns = selectcolumns + " WEB_PRIMARY_SKILL,";
            selectcolcount++;
        } else {
            updatecase = updatecase + " WEB_PRIMARY_SKILL = NULL ,";
            updatecase = updatecase + " WEB_PRIMARY_SKILL_FLAG = NULL ,";
            str = str + "Primary Skill = NULL <br />";
        }
        if (starttime) {
            updatecase = updatecase + " WEB_SPECIFIC_START_TIME = '" + starttime + "' ,";
            str = str + "Start Time = "+ starttime+" <br />";
            selectcolumns = selectcolumns + " WEB_SPECIFIC_START_TIME,";
            selectcolcount++;
        } else {
            updatecase = updatecase + " WEB_SPECIFIC_START_TIME = NULL ,";
            str = str + "Start Time = NULL <br />";
        }
        if (finishtime) {
            updatecase = updatecase + " WEB_SPECIFIC_END_TIME = '" + finishtime + "' ,";
            str = str + "Finish Time = "+ finishtime+" <br />";
            selectcolumns = selectcolumns + " WEB_SPECIFIC_END_TIME,";
            selectcolcount++;
        } else {
            updatecase = updatecase + " WEB_SPECIFIC_END_TIME = NULL ,";
            str = str + "Start Time = NULL <br />";
        }

        // write plexplanner data before delete and clear after so no loss of data
        var today = new Date().getTime(); //$.datepicker.formatDate('dd/mm', new Date());
        today = Math.round(today/1000/60/60);
        console.log('todays date:'+today);

        var tempfilelocation = '../public/data/' + req.cookies.EIN +'_'+today+'_tempcasedata.json';
        var formvalues_temp = JSON.stringify(formvalues);
        console.log(tempfilelocation);
        console.log(formvalues_temp);
        fs.writeFile(tempfilelocation, formvalues_temp);

        // delete all case data from engineer table.
        var deleteexisting = 'DELETE FROM live_plexplanner WHERE CASE_ID LIKE \'' + selectedcases + '\';';
        //console.log(deleteexisting);
        pool.query(deleteexisting, function (err, rows) {
            if (err) {
                console.log('error in delete eng query:'+deleteexisting);
                err.status = 500.08;
                return next(err);
            } else {
                console.log(rows.affectedRows + ' EngDay Rows Deleted:' + JSON.stringify(rows));

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
                estimatenum = req.body.ewocestimate;
                selectedcases = req.body.cases;
                var numengs;
                //console.log('selectedcases: '+selectedcases);

                if (req.body.deleteeng == 'Y'){
                    delflag = 1;
                }
                if (req.body.deleteeng2 == 'Y'){
                    delflag2 = 1;
                }
                if (req.body.deleteeng3 == 'Y'){
                    delflag3 = 1;
                }
                if (req.body.deleteeng4 == 'Y'){
                    delflag4 = 1;
                }
                if (req.body.deleteeng5 == 'Y'){
                    delflag5 = 1;
                }
                if (req.body.deleteeng6 == 'Y'){
                    delflag6 = 1;
                }


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

                var looper2 =0;
                if(engein.length>0 && delflag == 0){
                    looper2++;
                } if(engein2.length>0 && delflag2 == 0){
                    looper2++;
                } if(engein3.length>0 && delflag3 == 0){
                    looper2++;
                } if(engein4.length>0 && delflag4 == 0){
                    looper2++;
                } if(engein5.length>0 && delflag5 == 0){
                    looper2++;
                } if(engein6.length>0 && delflag6 == 0){
                    looper2++;
                }

                numengs = looper;
                var numengsincflag = looper2;
                if (numengsincflag == 0) {
                    console.log('no planned engineers');
                    updatecase = updatecase + " WEB_PLANNED_FLAG = NULL,";

                } else {
                    updatecase = updatecase + " WEB_PLANNED_FLAG = \'"+numengsincflag+"\',";
                }


                //console.log('delflag: '+delflag);
                //console.log('EIN len: '+engein.length);

                if (engein.length==9 && delflag==0) {
                    //console.log('engein1 exists');
                    // set count to num of days eng io working on the case
                    splitdates = dates.split(",");
                    for (var temp1 = 0; temp1 < splitdates.length; temp1++) {
                        splitdates[temp1] = splitdates[temp1].trim();
                    }
                    //console.log('num of days eng1 is working: '+splitdates.length);
                    var alldates = "[";
                    for (var p = 0; p < splitdates.length; p++) {

                        //set case_id of row to be inserted
                        insertquerfields = insertquerfields + " CASE_ID ,";
                        insertquervalues = insertquervalues + " \'" + selectedcases + "\',";

                        //insert eng specific data
                        insertquerfields = insertquerfields + " PLANNED_ENGINEER ,";
                        insertquervalues = insertquervalues + " \'" + engein + "\',";
                        //selectcolumns = selectcolumns + " PLANNED_ENGINEERS,";
                        //selectcolcount++;

                        if (tasknum.length > 0) {
                            insertquerfields = insertquerfields + " TASK_NUMBER ,";
                            insertquervalues = insertquervalues + " \'" + tasknum + "\',";
                            //selectcolumns = selectcolumns + " TASK_NUMBER,";
                            //selectcolcount++;
                        }
                        if (travel.length > 0) {
                            insertquerfields = insertquerfields + " ENG_TRAVEL_TIME ,";
                            insertquervalues = insertquervalues + " \'" + travel + "\',";
                            //selectcolumns = selectcolumns + " ENG_TRAVEL_TIME,";
                            //selectcolcount++;
                        }
                        if (eodtravel.length > 0) {
                            insertquerfields = insertquerfields + " EOD_TRAVEL ,";
                            insertquervalues = insertquervalues + " \'" + eodtravel + "\',";
                            //selectcolumns = selectcolumns + " EOD_TRAVEL,";
                            //selectcolcount++;
                        }
                        if (splitdates.length > 0) {
                            insertquerfields = insertquerfields + " PLANNED_DATE ,";
                            insertquervalues = insertquervalues + " str_to_date(\'" + splitdates[p] + " 00:00:00\','%m/%d/%Y %H:%i:%s'),";
                            //selectcolumns = selectcolumns + " PLANNED_DATE,";
                            //selectcolcount++;
                            if (alldates.length > 2) {
                                alldates = alldates + ", " + splitdates[p];
                            } else {
                                alldates = alldates + splitdates[p];
                            }

                        }

                        insertquerfields = insertquerfields.slice(",", -1);
                        insertquerfields = insertquerfields + ")";
                        insertquervalues = insertquervalues.slice(",", -1);
                        insertquervalues = insertquervalues + ")";

                        fullinsertquery = insertquerpre + insertquerfields + insertquermid + insertquervalues + ";";
                        //console.log('insertquer' + p + ': ' + fullinsertquery);

                        pool.query(fullinsertquery, function (err, rows) {
                            if (err) {
                                console.log('error in insert query on eng1, day '+p);
                                err.status=500.09;
                                return next(err);
                            } else {
                                console.log('Rows Inserted Successfully: ' + rows.affectedRows);
                            }
                        });

                        insertquerfields = "(";
                        insertquervalues = "(";

                    }
                    //console.log('str after eng 1 before dates: ' + str);
                    str = str + "Pinned to = " + engein + ", ";
                    str = str + "Task Num = " + tasknum + ", ";
                    str = str + "Travel = " + travel + ", ";
                    str = str + "EOD Travel = " + eodtravel + ", ";
                    str = str + "Dates = " + alldates + "] <br />";
                    //console.log('str after inserted dates: ' + str);
                }

                var alldates2;
                for(var ij=2;ij<numengs+1;ij++) {
                    alldates2 = "[";
                    if (eval('engein' + ij+'.length == 9 ') && eval('delflag'+ij+' == 0')) {
                        // set count to num of days eng io working on the case
                        eval('splitdates = dates'+ij+'.split(",")');
                        for (var temp = 0; temp < splitdates.length; temp++) {
                            splitdates[temp] = splitdates[temp].trim();
                        }
                        //console.log('num of days eng'+ij +' is working: '+splitdates.length);
                        for (var pp = 0; pp < splitdates.length; pp++) {

                            //set case_id of row to be inserted
                            insertquerfields = insertquerfields + " CASE_ID ,";
                            insertquervalues = insertquervalues + " \'" + selectedcases + "\',";

                            //insert eng specific data
                            insertquerfields = insertquerfields + " PLANNED_ENGINEER ,";
                            insertquervalues = insertquervalues + " \'" + eval('engein'+ij) + "\',";
                            //selectcolumns = selectcolumns + " PLANNED_ENGINEERS,";
                            //selectcolcount++;

                            if (eval('tasknum'+ij+'.length > 0')) {
                                insertquerfields = insertquerfields + " TASK_NUMBER ,";
                                insertquervalues = insertquervalues + " \'" + eval('tasknum'+ij) + "\',";
                                //selectcolumns = selectcolumns + " TASK_NUMBER,";
                                //selectcolcount++;
                            }
                            if (eval('travel'+ij+'.length > 0')) {
                                insertquerfields = insertquerfields + " ENG_TRAVEL_TIME ,";
                                insertquervalues = insertquervalues + " \'" + eval('travel'+ij) + "\',";
                                //selectcolumns = selectcolumns + " ENG_TRAVEL_TIME,";
                                //selectcolcount++;
                            }
                            if (eval('eodtravel'+ij+'.length > 0')) {
                                insertquerfields = insertquerfields + " EOD_TRAVEL ,";
                                insertquervalues = insertquervalues + " \'" + eval('eodtravel'+ij) + "\',";
                                //selectcolumns = selectcolumns + " EOD_TRAVEL,";
                                //selectcolcount++;
                            }
                            if (splitdates.length>0) {
                                insertquerfields = insertquerfields + " PLANNED_DATE ,";
                                insertquervalues = insertquervalues + " str_to_date(\'" + splitdates[pp] + " 00:00:00\','%m/%d/%Y %H:%i:%s'),";
                                if (alldates2.length > 2) {
                                    alldates2 = alldates2 + ", " + splitdates[pp];
                                } else {
                                    alldates2 = alldates2 + splitdates[pp];
                                }
                                //selectcolumns = selectcolumns + " PLANNED_DATE,";
                                //selectcolcount++;

                            }

                            insertquerfields = insertquerfields.slice(",", -1);
                            insertquerfields = insertquerfields + ")";
                            insertquervalues = insertquervalues.slice(",", -1);
                            insertquervalues = insertquervalues + ")";

                            fullinsertquery = insertquerpre + insertquerfields + insertquermid + insertquervalues + ";";
                            //console.log('eng'+ij+', insertquer' + pp + ': ' + fullinsertquery);

                            pool.query(fullinsertquery, function (err, rows) {
                                if (err) {
                                    console.log('error in insert query on eng'+ij+', day ' + pp);
                                    err.status = 500.10;
                                    return next(err);
                                } else {
                                    console.log('Rows Inserted Successfully: ' + rows.affectedRows);
                                }
                            });

                            insertquerfields = "(";
                            insertquervalues = "(";
                        }
                        str = str + "Pinned to = " + eval('engein'+ij) + ", ";
                        str = str + "Task Num = " + eval('tasknum'+ij) + ", ";
                        str = str + "Travel = " + eval('travel'+ij) + ", ";
                        str = str + "EOD Travel = " + eval('eodtravel'+ij) + ", ";
                        str = str + "Dates = " + alldates2 + "] <br />";
                    }
                }

                fs.stat(tempfilelocation, function(err, stat) {
                    if(err == null) {
                        fs.unlinkSync(tempfilelocation);
                    } else if(err.code == 'ENOENT') {
                        return;
                    } else {
                        return;
                    }
                });

                updatecase = updatecase +" WEB_MOD_UIN = \'"+req.cookies.EIN+"\';";
                updatecase = updatecase.slice(",", -1);
                selectcolumns = selectcolumns.slice(",", -1);
                updatecase = updatecase + " WHERE ESTIMATENUMBER LIKE '" + estimatenum + "' AND CASE_ID LIKE '"+selectedcases+"';";

                var selectquer = "SELECT * FROM live_workstack LIMIT 1;";
                //console.log('select query: '+selectquer);
                //console.log('updatecase: '+updatecase);

                pool.query(updatecase, function (err, rows) {
                    if (err) {
                        console.log('error in update query');
                        err.status=500.11;
                        return next(err);
                    } else {
                        console.log('Database Updated');
                        pool.query(selectquer, function (err, rows) {
                            if (err) {
                                console.log('Error in select query');
                                err.status=503;
                                return next(err);
                            } else {
                                var loginflag0 = req.cookies.loginFlag;
                                var adminflag0 = req.cookies.adminFlag;

                                obj = {"dropdownsjson":dropdownsjson,
                                    "plannermessage": str,
                                    "formvalues": formvalues,
                                    "cases":req.cookies.cases,
                                    "db":rows,
                                    "rowsize": selectcolcount,
                                    "loginFlag":loginflag0,
                                    "adminFlag":adminflag0,
                                    "profile": req.cookies.profile};
                                //console.log(obj);
                                res.render('planner', obj);
                            }
                        });
                    }
                });

            }
        });
    } else
    {
        //console.log('no selected cases :'+selectedcases);
        plannermessage = "Please select cases to edit";
        obj = {"dropdownsjson":dropdownsjson,
            "plannermessage": plannermessage,
            "formvalues": formvalues,
            "cases": req.cookies.cases,
            "db":"",
            "rowsize": selectcolcount,
            "loginFlag":req.cookies.loginFlag,
            "adminFlag":req.cookies.adminFlag,
            "profile": req.cookies.profile
        };

        res.render('planner', obj);
    }


// Reset form values to ""
    estimatenum = "";
    selectedcases = "";
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
    plannermessage="";
});

module.exports = router;



