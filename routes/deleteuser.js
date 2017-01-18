var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");


var delein ="";
var deletequer = "";
var selectquer = "";
var obj = {};

router.all('/',loginfunction.isLoggedIn,function(req,res,next) {
    console.log('Removing user from database');

    delein = req.body.delein;
    if (delein.length != 9)
    {
        console.log('Please enter the users 9 digit EIN in the EIN field');
        delusermessage = 'Invalid EIN';
        res.redirect('/admin');
    }
    else
    {
        console.log('EIN to delete entered');
        deletequer = "DELETE * FROM users WHERE EIN ='"+delein+"';";
        selectquer = 'SELECT * FROM users ORDER BY ADDED_DATE DESC;';
        console.log('Delete Query is [ ' + deletequer+ ' ]');
        console.log('Select Query is [ ' + selectquer+ ' ]');

        pool.query(deletequer, function (err, rows) {
            if (err) {
                delusermessage = 'Invalid EIN';
                console.log(err.code);
                throw err;
            } else {
                console.log('Database Updated');
                pool.query(selectquer, function (err, rows) {
                    if (err) {
                        throw err;
                    } else {
                        obj = {db: rows, 'username': req.cookies.username, 'loginFlag': req.cookies.loginFlag, 'adminFlag': req.cookies.adminFlag};
                        delusermessage = 'User Deleted: [EIN: '+delein+']';
                        res.render('admin', obj);
                    }
                });
            }
        });
    }
});

module.exports = router;