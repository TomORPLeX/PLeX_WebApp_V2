var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var leaf = require('./public/javascripts/test');

var pool = require('./bin/db.js');

var index = require('./routes/index');
var logincheck = require('./routes/logincheck');
var demand = require('./routes/demand');
var dayminus1 = require('./routes/dayminus1');
var otd = require('./routes/otd');
var close =  require('./routes/close');
var logout =  require('./routes/logout');
var admin =  require('./routes/admin');
var adduser =  require('./routes/adduser');
var deleteuser =  require('./routes/deleteuser');
var edituser =  require('./routes/edituser');
var editestimate = require('./routes/editestimate');
var queryestimatecases = require('./routes/queryestimatecases');

var app = express();

loginFlag =0;
adminFlag=0;
loginFailedMessage ="";
addusermessage="";
delusermessage="";
editusermessage="";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/', index);
app.use('/logincheck', logincheck);
app.use('/demand', demand);
app.use('/dayminus1', dayminus1);
app.use('/otd',  otd);
app.use('/close', close);
app.use('/logout', logout);
app.use('/admin', admin);
app.use('/adduser', adduser);
app.use('/deleteuser', deleteuser);
app.use('/edituser', edituser);
app.use('/editestimate', editestimate);
app.use('/queryestimatecases', queryestimatecases);


app.use('/submit', function(req,res) {
    console.log('Data Captured, Name: ' + req.body.nameinput);

    var obj = {};
    var quer3 = "SELECT * FROM test1 WHERE case_status='1'";
    var quer4 = "UPDATE test1 SET CASE_STATUS=1 WHERE OBJID=" + req.body.nameinput;
    console.log('Update Query is [ ' + quer4 + ' ]');
    console.log('Select Query is [ ' + quer3 + ' ]');

    pool.query(quer4, function (err, rows) {
        if (err) {
            throw err;
        } else {
            console.log('Database Updated');
            pool.query(quer3, function (err, rows) {
                if (err) {
                    throw err;
                } else {
                    obj = {db: rows};
                    res.render('dayminus1', obj);
                    console.log('new data displayed');
                    console.log(JSON.stringify(rows));
                }
            });
        }
    });
});

app.use('/mapRerender', function (req,res) {
    var data = req.body;
    var LatLngData;
    console.log('body: ' + JSON.stringify(data));
    console.log(data.fluidity);

    var fluidityStatusFlag = 0;
    var skillsFilter = [];
    var fluidityStatus;
    var plannedWork;
    var priorityScore = [];
    var oucSelection;
    var dataString = [];
    var obj = {};

    console.log(data.priority[0]);
    console.log(data.skills[3]);

    for (var i = 0; i < data.priority.length ; i++) {
        priorityScore[i]= "'" + data.priority[i] + "'";
    }

    for (i = 0; i < data.skills.length ; i++) {
        skillsFilter[i]= "'" + data.skills[i] + "'";
        console.log(data.skills[i]);
    }

    console.log(JSON.stringify(priorityScore));
    console.log(JSON.stringify(skillsFilter));

    if (data.fluidity == "All"){
        fluidityStatusFlag = 1;
        fluidityStatus = "";
    }else{
        fluidityStatus = "WHERE case_status= '" + data.fluidity +"'";
    }

    var plannedWorkFlag = 0;

    if(data.planned == "All"){
        plannedWorkFlag = 1;
        plannedWork = "";
    }else if (fluidityStatusFlag == 1){
        plannedWork = "WHERE planned_work" + data.planned;
    }else{
        plannedWork = " OR planned_work" + data.planned;
    }

    var priorityScoreFlag = 0;

    if(data.priority.length < 1){
        priorityScoreFlag = 1;
        priorityScore = "";
    }else if (fluidityStatusFlag == 1){
        priorityScore = "WHERE priority_description IN (" + priorityScore + ")";
    }else{
        priorityScore = " OR priority_description IN (" + priorityScore + ")";
    }

    var skillsFilterFlag = 0;

    if(data.skills.length < 1){
        skillsFilterFlag = 1;
        skillsFilter = "";
    }else if (priorityScoreFlag == 1){
        skillsFilter = "WHERE primary_skill IN (" + skillsFilter + ")";
    }else{
        skillsFilter = " OR primary_skill IN (" + skillsFilter + ")";
    }

    var oucSelectionFlag = 0;

    if(data.ouc == "All"){
        oucSelectionFlag = 1;
        oucSelection = "";
    }else if (skillsFilterFlag == 1){
        oucSelection = "WHERE OM_OUC= '" + data.ouc +"'";
    }else{
        oucSelection = " OR OM_OUC= '" + data.ouc +"'";
    }

    dataString = fluidityStatus+plannedWork+priorityScore+skillsFilter+oucSelection+";";

    var quer5 = "SELECT  LON, LAT, PRIMARY_SKILL, WT_DESCRIPTION, CASE_STATUS, PRIORITY_DESCRIPTION, EXCH, CASE_ID, CUST_EST_NO  FROM live_table " + dataString;
    console.log(quer5);

    pool.query(quer5, function (err, rows) {
        if (err) {
            throw err;
        } else {
            console.log('new data displayed');
            console.log(JSON.stringify(rows));
            obj = {LatLngData: rows,
                selection: data};
            LatLngData = (JSON.stringify(obj));
            fs.writeFile('../public/data/LatLngData.json', LatLngData);
        }
    });
    res.send('success');
});

//app.use('/mapupdate', function(req,res) {
//var checkList = {};
//function myFunction() {
//console.log(req.body.filter0);
//console.log(req.body.filter1);
//for (i = 0; i <9 ; i++){

// req.getElementById("filter"+i).name;
// console.log(req.getElementById("filter"+i).name);
//req.pause();
// res.status = 304;
//res.send('filters being applied');

// }
//}
//});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
