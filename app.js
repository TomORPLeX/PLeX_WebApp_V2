var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var index = require('./routes/index');
var logincheck = require('./routes/logincheck');
var demand = require('./routes/demand');
var planner = require('./routes/planner');
var logout =  require('./routes/logout');
var admin =  require('./routes/admin');
var adduser =  require('./routes/adduser');
var deleteuser =  require('./routes/deleteuser');
var edituser =  require('./routes/edituser');
var editestimate = require('./routes/editestimate');
var queryestimatecases = require('./routes/queryestimatecases');
var maprerender = require('./routes/maprerender');
var getdatatabledata = require('./routes/getdatatabledata');
var querycasedata = require ('./routes/querycasedata');
var querydeletedata = require ('./routes/querydeletedata');
var deleteclicked = require ('./routes/deleteclicked');
var updatenotes= require ('./routes/updatenotes');
var jobflow = require('./routes/jobflow');
var queryjobflowdata = require('./routes/queryjobflowdata');
var teammanagement = require('./routes/teammanagement');
var queryengoucinfo = require('./routes/queryengoucinfo');

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
app.use('/planner', planner);
app.use('/logout', logout);
app.use('/admin', admin);
app.use('/adduser', adduser);
app.use('/deleteuser', deleteuser);
app.use('/edituser', edituser);
app.use('/editestimate', editestimate);
app.use('/queryestimatecases', queryestimatecases);
app.use('/maprerender', maprerender);
app.use('/getdatatabledata', getdatatabledata);
app.use('/querycasedata', querycasedata);
app.use('/querydeletedata', querydeletedata);
app.use('/deleteclicked', deleteclicked);
app.use('/updatenotes', updatenotes);
app.use('/jobflow', jobflow);
app.use('/queryjobflowdata', queryjobflowdata);
app.use('/teammanagement', teammanagement);
app.use('/queryengoucinfo', queryengoucinfo);

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
    //if (res.locals.message == 'ER_PARSE_ERROR') { console.log('in error handler');}
    console.log('in error app.js');
    // render the error page
    res.status(err.status || 500.01 || 500.02);
    res.render('error');
});

module.exports = app;
