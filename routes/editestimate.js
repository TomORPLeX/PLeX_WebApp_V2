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
    editname = req.body.editname;
    editein = req.body.editein;
    editouc = req.body.editouc;
    editprofile = req.body.editprofile;

    if (editein.length != 9)
    {
        editusermessage = 'Please enter the 9 digit EIN of the User you want to edit';
        res.redirect('/admin');
    }
    else
    {
        if (editname.length == 0 && editouc.length ==0)
        {
            //update profile using EIN .
            updatequer = "UPDATE users SET profile = '"+editprofile+"' WHERE EIN ="+editein+";";
            console.log(updatequer);
            updatedatabase(updatequer, res);
            //res.render('admin', obj1);
        }
        else if (editname.length == 0 && editprofile.length ==0)
        {
            //update ouc using EIN
            updatequer = "UPDATE users SET ouc = '"+editouc+"' WHERE EIN ="+editein+";";
            console.log(updatequer);
            updatedatabase(updatequer, res);
        }
        else if (editouc.length == 0 && editprofile.length ==0)
        {
            //update name using EIN
            updatequer = "UPDATE users SET name= '"+editname+"' WHERE EIN ="+editein+";";
            console.log(updatequer);
            updatedatabase(updatequer, res);
        }
        else if (editouc.length == 0)
        {
            //update profile & name using EIN
            updatequer = "UPDATE users SET name= '"+editname+"', profile ='"+editprofile+"' WHERE EIN ="+editein+";";
            console.log(updatequer);
            updatedatabase(updatequer, res);
        }
        else if (editname.length == 0)
        {
            //update profile & OUC using EIN
            updatequer = "UPDATE users SET ouc= '"+editouc+"', profile ='"+editprofile+"' WHERE EIN ="+editein+";";
            console.log(updatequer);
            res.redirect('/admin');
        }
        else if (editprofile.length == 0)
        {
            //update name & ouc using EIN
            updatequer = "UPDATE users SET ouc= '"+editouc+"', name ='"+editname+"' WHERE EIN ="+editein+";";
            console.log(updatequer);
            updatedatabase(updatequer, res);
        }
        else
        {
            // update all 3 - ouc name & profile
            updatequer = "UPDATE users SET ouc= '"+editouc+"', name ='"+editname+"', profile = '"+editprofile +"' WHERE EIN ="+editein+";";
            console.log(updatequer);
            updatedatabase(updatequer, res);
        }
    }


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