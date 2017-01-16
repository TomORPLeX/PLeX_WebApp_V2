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
>>>>>>> tom4

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
>>>>>>> tom4
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
        plannedWork = "WHERE planned_work" + data.planned;
    } else {
        plannedWork = " AND planned_work" + data.planned;
    }

    var priorityScoreFlag = 0;

    if (data.priority.length < 1) {
        priorityScoreFlag = 1;
        priorityScore = "";
    } else if (fluidityStatusFlag == 1) {
        priorityScore = "WHERE priority_description IN (" + priorityScore + ")";
    } else {
        priorityScore = " AND priority_description IN (" + priorityScore + ")";
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
    var quer5 = "SELECT  LON, LAT, PRIMARY_SKILL, WT_DESCRIPTION, CASE_STATUS, PRIORITY_DESCRIPTION, EXCH, CASE_ID, CUST_EST_NO  FROM live_table " + dataString + ";";
    var quer6 = "SELECT COUNT(*) as Total, priority_description FROM live_table " + dataString + "group by priority_description;";


    pool.query(quer5, function (err, rows) {
        if (err) {
            return;
        } else {
            pool.query(quer6, function (err, rows1) {
                if (err) {
                    return;
                } else {
<<<<<<< HEAD

=======
                    //console.log(JSON.stringify(rows));
>>>>>>> tom4
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