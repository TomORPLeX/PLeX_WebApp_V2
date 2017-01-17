var express = require('express');
var router = express.Router();
var loginfunction = require("../bin/login.js");

var obj = {};

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
        "cases":req.cookies.cases,
        "db":"",
        "loginflag":req.cookies.loginFlag,
        "adminflag":req.cookies.adminFlag
    };
    res.render('dayminus1', obj);
});

module.exports = router;
