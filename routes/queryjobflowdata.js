var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');

router.all('/', function(req, res, next) {
    console.log("in job flow");
    var selectquer1 = "SELECT * FROM live_jobflow;";
    pool.query(selectquer1, function (err, rows) {
        if (err) {
            err.status=500.15;
            return next(err);
        } else {

            var row = new Array();
            var array = new Array();

            for (var i = 0; i < Object.keys(rows).length; i++) {

                row[0] = rows[i].OUC;
                row[1] = rows[i].EIN;
                row[2] = rows[i].ENG_ID;
                row[3] = rows[i].ENG_NAME;
                row[4] = rows[i].PRIMARY_NS_SKILLS;
                row[5] = rows[i].VEHICLES;
                row[6] = rows[i].START_LOCATION;

                row[7] = rows[i].TODAY_TASKS_ALLOCATED;
                row[8] = rows[i].TODAY_PLANNED_NOT_PINNED;
                row[9] = rows[i].TODAY_CONDITIONAL_FORMAT;

                row[10] = rows[i].DAY_1_TASKS_ALLOCATED;
                row[11] = rows[i].DAY_1_PLANNED_NOT_PINNED;
                row[12] = rows[i].DAY_1_CONDITIONAL_FORMAT;

                row[13] = rows[i].DAY_2_TASKS_ALLOCATED;
                row[14] = rows[i].DAY_2_PLANNED_NOT_PINNED;
                row[15] = rows[i].DAY_2_CONDITIONAL_FORMAT;

                row[16] = rows[i].DAY_3_TASKS_ALLOCATED;
                row[17] = rows[i].DAY_3_PLANNED_NOT_PINNED;
                row[18] = rows[i].DAY_3_CONDITIONAL_FORMAT;

                row[19] = rows[i].DAY_4_TASKS_ALLOCATED;
                row[20] = rows[i].DAY_4_PLANNED_NOT_PINNED;
                row[21] = rows[i].DAY_4_CONDITIONAL_FORMAT;

                row[22] = rows[i].DAY_5_TASKS_ALLOCATED;
                row[23] = rows[i].DAY_5_PLANNED_NOT_PINNED;
                row[24] = rows[i].DAY_5_CONDITIONAL_FORMAT;

                array[i] = row;
                row = [];
            }

            var obj = {"data1":array};
            res.send(obj);
        }
    });
});

module.exports = router;
