var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var selectquer = "";

router.all('/', function(req, res, next) {
    selectquer = "SELECT * FROM live_workstack;";
    pool.query(selectquer, function (err, rows) {
        if (err) {
            throw err;
        } else {
            obj = {db: rows};
            //console.log(JSON.stringify(obj.db));
            res.send(JSON.stringify(obj.db));
        }
    });
});

module.exports = router;