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


    pool.query(quer5, function (err, rows1) {
        if (err) {
            err.status=503;
            return next(err);
        } else {
            obj = {
                caseId: caseId
            };
            res.send(obj);
        }
    });



});

module.exports = router;