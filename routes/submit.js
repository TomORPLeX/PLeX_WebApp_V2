var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");


router.all('/', function (req, res, next) {

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
})
});

module.exports = router;