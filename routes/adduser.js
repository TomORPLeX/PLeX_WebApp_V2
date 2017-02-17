var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");


var addname ="";
var addein ="";
var addouc ="";
var addprofile="";
var selectquer = "";
var insertquer = "";
var obj = {};

router.all('/', loginfunction.isLoggedIn, function(req,res,next) {
    console.log('Adding user to database');
    addname = req.body.name;
    addein = req.body.ein;
    addouc = req.body.ouc;
    addprofile = req.body.profile;

    if (addname.length == 0)
    {
        addusermessage = "Please enter the users Name in the Name field";
        res.redirect('/admin');
    }
    else if (addein.length != 9)
    {
        addusermessage = 'Please enter a 9 digit EIN in the EIN field';
        res.redirect('/admin');
    }
    else if (addouc.length == 0)
    {
        addusermessage = 'Please enter an OUC in the OUC field';
        res.redirect('/admin');
    }
    else if (addprofile.length == 0)
    {
        addusermessage = 'Please select a Profile from the dropdown list';
        res.redirect('/admin');
    }
    else //if(!(addname.length == 0 && addein.length == 0 && addouc.length == 0 && addprofile.length == 0))
    {
        insertquer = "INSERT INTO users (name, ein, ouc, profile, Added_date) VALUES ('"+addname+"','"+addein+"','"+addouc+"','"+addprofile+"',NOW());";
        selectquer = "SELECT * FROM users ORDER BY ADDED_DATE DESC;";
        console.log('Update Query is [ ' + insertquer+ ' ]');
        console.log('Select Query is [ ' + selectquer+ ' ]');

        pool.query(insertquer, function (err, rows) {
            if (err) {
                console.log('error in insert query');
                err.status=500.02;
                return next(err);
            } else {
                console.log('Database Updated');
                pool.query(selectquer, function (err, rows) {
                    if (err) {
                        console.log('Error in select query');
                        err.status=500.03;
                        return next(err);
                    } else {
                        obj = {db: rows, 'username': req.cookies.username, 'loginFlag': req.cookies.loginFlag, 'adminFlag': req.cookies.adminFlag};
                        addusermessage = 'Added User: [OUC: '+addouc+' Name: '+addname+' EIN: '+addein+' Profile: '+addprofile+' ]';
                        res.render('admin', obj);
                    }
                });
            }
        });
    }

});

module.exports = router;