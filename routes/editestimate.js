var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');

var selectquer = "";
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
var engein = "";
var tasknum = "";
var dates = "";

router.all('/', function(req,res,next) {
    console.log('Editing Estimate');

    estimatenum = req.body.ewocestimate;
    allcases = req.cookies.cases;
    selectedcases = req.body.cases;
    dso = req.body.dso;
    tmbooked = req.body.tmbooked;
    fluiditystatus = req.body.fluiditystatus;
    gangsize = req.body.gangsize;
    skills = req.body.addeditskill;
    tasktime = req.body.edittasktime;
    unpintask = req.body.unpintask;
    travel = req.body.traveltime;
    engein = req.body.engein;
    tasknum = req.body.tasknum;
    dates = req.body.dates;

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
        "engein":engein,
        "tasknum":tasknum,
        "dates":dates
    };
    console.log(JSON.stringify(formvalues));
    console.log('selected cases cookie:  '+req.cookies.cases);
    console.log('cookie.cases[0].CASE_ID:  '+req.cookies.cases[0].CASE_ID);

    console.log('selected cases: '+selectedcases +'|'+'All cases: '+JSON.stringify(allcases));

    if(selectedcases) {
        updatequer = "UPDATE live_table SET";
        if (dso) {
            updatequer = updatequer + " DSO_BOOKED = '" + dso + "' ,";
        }
        if (tmbooked) {
            updatequer = updatequer + " tmbooked = '" + tmbooked + "' ,";
        }
        if (fluiditystatus) {
            updatequer = updatequer + " fluiditystatus = '" + fluiditystatus + "' ,";
        }
        if (gangsize) {
            updatequer = updatequer + " gangsize = '" + gangsize + "' ,";
        }
        if (skills) {
            updatequer = updatequer + " skills = '" + skills + "' ,";
        }
        if (tasktime) {
            updatequer = updatequer + " tasktime = '" + tasktime + "' ,";
        }
        if (unpintask) {
            updatequer = updatequer + " unpintask = '" + unpintask + "' ,";
        }
        if (travel) {
            updatequer = updatequer + " travel = '" + travel + "' ,";
        }
        if (engein) {
            updatequer = updatequer + " engein = '" + engein + "' ,";
        }
        if (tasknum) {
            updatequer = updatequer + " tasknum = '" + tasknum + "' ,";
        }
        if (dates) {
            updatequer = updatequer + " dates = '" + dates + "' ,";
        }
        console.log('update before slice: '+updatequer);
        updatequer = updatequer.slice(",", -1);
        console.log('update after slice: '+updatequer);
        updatequer = updatequer + "WHERE ESTIMATENUM = '" + estimatenum + "' AND CASE_ID in (" + selectedcases + ");";
        console.log('final query: '+updatequer);
        obj = {"plannermessage": "Success",
            "formvalues": formvalues,
            "cases":allcases,
            "db":""};
        res.render('dayminus1', obj);
    } else
    {
        plannermessage = "Please select cases to edit";
        obj = {"plannermessage": plannermessage,
                "formvalues": formvalues,
                "cases":allcases,
                "db":""};
        res.render('dayminus1', obj);
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



