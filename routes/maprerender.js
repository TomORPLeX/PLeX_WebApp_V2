var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");
var fs = require('fs');

router.all('/', function (req, res, next) {

    var data = req.body;
    var LatLngData;
<<<<<<< HEAD

=======
>>>>>>> adam
    var fluidityStatusFlag = 0;
    var skillsFilter = [];
    var fluidityStatus;
    var plannedWork;
    var priorityScore = [];
    var oucSelection;
    var dataString = [];
    var obj = {};

    for (var i = 0; i < data.priority.length; i++) {
        priorityScore[i] = "'" + data.priority[i] + "'";
    }

    for (i = 0; i < data.skills.length; i++) {
        skillsFilter[i] = "'" + data.skills[i] + "'";
        console.log(data.skills[i]);
    }
<<<<<<< HEAD

=======
>>>>>>> adam
    if (data.fluidity == "All") {
        fluidityStatusFlag = 1;
        fluidityStatus = "";
    } else {
        fluidityStatus = "WHERE case_status= '" + data.fluidity + "'";
    }

    var plannedWorkFlag = 0;

    if (data.planned == "All") {
        plannedWorkFlag = 1;
        plannedWork = "";
    } else if (fluidityStatusFlag == 1) {
        plannedWork = "WHERE web_planned_engineers " + data.planned;
    } else {
        plannedWork = " AND web_planned_engineers " + data.planned;
    }

    var priorityScoreFlag = 0;

    if (data.priority.length < 1) {
        priorityScoreFlag = 1;
        priorityScore = "";
    } else if (plannedWorkFlag == 1) {
        priorityScore = "WHERE HL_PRIORITY_SCORE IN (" + priorityScore + ")";
    } else {
        priorityScore = " AND HL_PRIORITY_SCORE IN (" + priorityScore + ")";
    }

    var skillsFilterFlag = 0;

    if (data.skills.length < 1) {
        skillsFilterFlag = 1;
        skillsFilter = "";
    } else if (priorityScoreFlag == 1) {
        skillsFilter = "WHERE primary_skill IN (" + skillsFilter + ")";
    } else {
        skillsFilter = " AND primary_skill IN (" + skillsFilter + ")";
    }

    var oucSelectionFlag = 0;

    if (data.ouc == "All") {
        oucSelectionFlag = 1;
        oucSelection = "";
    } else if (skillsFilterFlag == 1) {
        oucSelection = "WHERE OM_OUC= '" + data.ouc + "'";
    } else {
        oucSelection = " AND OM_OUC= '" + data.ouc + "'";
    }

    dataString = fluidityStatus + plannedWork + priorityScore + skillsFilter + oucSelection;

    //Filter out jobs in execute
    var quer5 = "SELECT  LON, LAT, PRIMARY_SKILL, JOBDESCRIPTION, SUB_DESCRIPTION, HL_PRIORITY_SCORE, CASE_STATUS, EXCHANGE, CASE_ID, ESTIMATENUMBER  FROM live_workstack " + dataString + ";";
    var quer6 = "SELECT COUNT(*) as Total, priority_description FROM live_workstack " + dataString + "group by priority_description;";
    console.log(quer5);

    pool.query(quer5, function (err, rows) {
        if (err) {
            throw err;
        } else {
            pool.query(quer6, function (err, rows1) {
                if (err) {
                    throw err;
                } else {
                    obj = {
                        LatLngData: rows,
                        selection: data,
                        priorityCount: rows1
                    };
                    LatLngData = (JSON.stringify(obj));
                    var tempfilelocation = '../public/data/' + req.cookies.EIN + '_LatLngData.json';
                    fs.writeFile(tempfilelocation, LatLngData);
                }
            });
        }
    });
    res.send('success');
});

module.exports = router;