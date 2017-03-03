var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");


var caseId ="";
var EngEIN ="";
var PlanDate="";
router.all('/',loginfunction.isLoggedIn,function(req,res,next) {


    caseId = req.body.CASE_ID;
    EngEIN = req.body.PLANNED_ENGINEER;
    PlanDate = req.body.PLANNED_DATE;

    var quer5 = "DELETE FROM live_plexplanner WHERE CASE_ID like '"+ caseId + "' AND PLANNED_ENGINEER like '"+ EngEIN + "' AND PLANNED_DATE like str_to_date('"+ PlanDate +"','%d-%m-%Y')  ;";
    console.log(quer5);
    var selectquer0 = "SELECT count(*) as engsplanned FROM live_plexplanner WHERE CASE_ID LIKE \'"+caseId+"\';";
    var updatequer;

    pool.query(quer5, function (err, rows1) {
        if (err) {
            err.status=500.04;
            return next(err);
        } else {
            pool.query(selectquer0, function (err, rows) {
                if (err) {
                    err.status=500.04;
                    return next(err);
                } else {
                    var plannedengs = JSON.stringify(rows[0].engsplanned);
                    console.log(plannedengs);
                    if (plannedengs == '0') {
                        //set WEB_PLANNED_FLAG to NULL
                        console.log('no planned engineers');
                        updatequer = "UPDATE live_workstack SET WEB_PLANNED_FLAG = NULL WHERE CASE_ID LIKE \'"+caseId+"\';";;
                    } else {
                        //set WEB_PLANNED_FLAG to plannedengs (#)
                        console.log(plannedengs+' planned engineers');
                        updatequer = "UPDATE live_workstack SET WEB_PLANNED_FLAG = "+plannedengs+" WHERE CASE_ID LIKE \'"+caseId+"\';";
                    }

                    //run update query to set WEB_PLANNED_FLAG to NULL
                    pool.query(updatequer, function (err, rows) {
                        if (err) {
                            err.status=500.04;
                            return next(err);
                        } else {
                            obj = {
                                caseId: caseId
                            };
                            res.send(obj);
                        }
                    });
                }
            });
        }
    });



});

module.exports = router;