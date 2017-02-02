var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var selectquer = "";
var loginfunction = require("../bin/login.js");


router.all('/', function(req, res, next) {
    selectquer = "SELECT * FROM live_workstack LIMIT 100;";
    pool.query(selectquer, function (err, rows) {
        if (err) {
            err.status=503;
            return next(err);
        } else {
            obj = {db: rows};
            //console.log(JSON.stringify(obj.db));
            res.send(JSON.stringify(obj.db));
        }
    });
});

module.exports = router;