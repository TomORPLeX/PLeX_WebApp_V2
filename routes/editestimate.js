var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');

var editname ="";
var editein ="";
var editouc ="";
var editprofile="";
var selectquer = "";
var updatequer = "";
var obj = {};

router.all('/', function(req,res,next) {
    console.log('Editing Estimate');

    estimatenum = req.body.estimatenum
    editname = req.body.editname;
    editein = req.body.editein;
    editouc = req.body.editouc;
    editprofile = req.body.editprofile;




});

module.exports = router;

function updatedatabase(updatequer, res) {
    selectquer = "SELECT * FROM users ORDER BY ADDED_DATE DESC;";
    pool.query(updatequer, function (err, rows) {
        if (err) {
            console.log('error in insert query');
            throw err;
        } else {
            console.log('Database Updated');
            pool.query(selectquer, function (err, rows) {
                if (err) {
                    console.log('Error in select query');
                    throw err;
                } else {
                    obj = {db: rows};
                    editusermessage = "Edited User: [EIN: '"+editein+"' OUC: '"+editouc+"' Name: '"+editname+"' Profile: '"+editprofile+"' ]";
                    res.render('admin', obj);
                }
            });
        }
    });
}