var express = require('express');
var router = express.Router();
var loginfunction = require("../bin/login.js");

var obj = {};
var cases = '{"CASE_ID":"xxxxxx"},{"CASE_ID":"xxxxxx"}';

var plannermessage ="";
var estimatenum = "";
//var cases = "";
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

var formvalues = {
    "estimatenum":estimatenum,
    "dso":dso,
    "cases":cases,
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

router.get('/', loginfunction.isLoggedIn, function(req, res, next) {
    obj = {"plannermessage": plannermessage,
        "formvalues": formvalues,
        "cases": req.cookies.cases,
        "db":"",
        "loginFlag":req.cookies.loginFlag,
        "adminFlag":req.cookies.adminFlag
    };
    res.render('planner', obj);
});

module.exports = router;
