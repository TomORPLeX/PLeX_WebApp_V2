var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");
var fs = require('fs');

router.all('/',loginfunction.isLoggedIn,function(req,res,next) {

    var data = req.body;
    var LatLngData;
    var fluidityStatusFlag = 0;
    var skillsFilter = [];
    var fluidityStatus;
    var plannedWork;
    var priorityScore = [];
    var oucSelection;
    var execStatusSelection;
    var qFlagSelection;
    var taskduration;
    var dataString = [];
    var obj = {};

    for (var i = 0; i < data.priority.length; i++) {
        priorityScore[i] = "'" + data.priority[i] + "'";
    }

    for (i = 0; i < data.skills.length; i++) {
        skillsFilter[i] = "'" + data.skills[i] + "'";
        //console.log(data.skills[i]);
    }
    if (data.fluidity == "All") {
        fluidityStatusFlag = 1;
        fluidityStatus = "";
    } else {
        fluidityStatus = "WHERE Final_status= '" + data.fluidity + "'";
    }

    var plannedWorkFlag = 0;

    if (data.planned == "All" && fluidityStatusFlag == 1) {
        plannedWorkFlag = 1;
        plannedWork = "";
    } else if (data.planned == "All" && fluidityStatusFlag == 0) {
        plannedWorkFlag = 0;
        plannedWork = "";
    }else if (fluidityStatusFlag == 1) {
        plannedWork = "WHERE web_planned_flag " + data.planned;
    } else {
        plannedWork = " AND web_planned_flag " + data.planned;
    }

    var priorityScoreFlag = 0;

    if (data.priority.length < 1) {
        priorityScoreFlag = 1;
        priorityScore = "";
    } else if (plannedWorkFlag == 1) {
        priorityScore = "WHERE web_system_defined_priority IN (" + priorityScore + ")";
    } else {
        priorityScore = " AND web_system_defined_priority IN (" + priorityScore + ")";
    }

    var skillsFilterFlag = 0;

    if (data.skills.length < 1) {
        skillsFilterFlag = 1;
        skillsFilter = "";
    } else if (priorityScoreFlag == 1) {
        if (data.skills.length == 9) {
            skillsFilter = "WHERE (web_primary_skill IN (" + skillsFilter + ") or web_primary_skill is null)";
        }else{
            skillsFilter = "WHERE web_primary_skill IN (" + skillsFilter + ")";
        }
    } else {
        if(data.skills.length == 9) {
            skillsFilter = " AND (web_primary_skill IN (" + skillsFilter + ")  or web_primary_skill is null)";
        }else{
            skillsFilter = " AND web_primary_skill IN (" + skillsFilter + ")";
        }
    }

    var execStatusFlag = 0;

    if (data.execStatus == "All") {
        execStatusFlag = 1;
        execStatusSelection = "";
    } else if (skillsFilterFlag == 1) {
        execStatusSelection = "WHERE JIN_STATUS= '" + data.execStatus + "'";
    } else {
        execStatusSelection = " AND JIN_STATUS= '" + data.execStatus + "'";
    }

    var qFlagFlag = 0;

    if (data.qFlag == "All" && execStatusFlag == 1) {
        qFlagFlag = 1;
        qFlagSelection = "";
    } else if (data.qFlag == "All" && execStatusFlag == 0) {
        qFlagFlag = 0;
        qFlagSelection = "";
    } else {
        qFlagSelection = " AND queue_flag= '" + data.qFlag + "'";
    }

    //var oucSelectionFlag = 0;

    if (data.ouc == "All") {
        //oucSelectionFlag = 1;
        oucSelection = "";
    }else {
        oucSelection = " AND om_ouc= '" + data.ouc + "'";
    }

    if(data.durationselection == '0' ){
        taskduration = "";
    }else if(data.durationselection == '1'){
        taskduration= " AND planned_tt_duration > '"+ data.durationinput + "'";
    }else{
        taskduration= " AND planned_tt_duration < '"+ data.durationinput + "'";
    }

    dataString = fluidityStatus + plannedWork + priorityScore + skillsFilter + execStatusSelection + qFlagSelection + oucSelection + taskduration;

    //Filter out jobs in execute
    var quer5 = "SELECT  LON, LAT, WEB_PRIMARY_SKILL AS PRIMARY_SKILL, JOBDESCRIPTION, SUB_DESCRIPTION, web_system_defined_priority, FINAL_STATUS as CASE_STATUS, EXCHANGE, CASE_ID, ESTIMATENUMBER, CASE_OBJID, QUEUE_ID FROM live_workstack " + dataString + ";";
    var quer6 = "SELECT COUNT(*) as Total, priority_description as priority_description FROM live_workstack " + dataString + "group by priority_description;";
    //console.log(quer5);
    //console.log(data.durationinput);

    pool.query(quer5, function (err,rows) {
        if (err) {
            err.status=500.16;
            return next(err);
        } else {
            pool.query(quer6, function (err, rows1) {
                if (err) {
                    err.status=500.17;
                    return next(err);
                } else {
                    obj = {
                        LatLngData: rows,
                        selection: data,
                        priorityCount: rows1
                    };
                    LatLngData = (JSON.stringify(obj));
                    var tempfilelocation = '../public/data/' + req.cookies.EIN + '_LatLngData.json';
                    fs.writeFile(tempfilelocation, LatLngData);
                    res.send('success');
                }
            });
        }
    });
});

module.exports = router;