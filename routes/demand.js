var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");

/* GET SQL data. */
var obj = {};

var quer1 = "SELECT * FROM test1 LIMIT 10";

router.get('/', loginfunction.isLoggedIn, function(req, res) {

        pool.query(quer1, function(err,rows)
        {
            if(err)
            {
                throw err;
            } else
            {
                //obj = {db: rows};

                console.log(JSON.stringify(obj));
                pool.query(quer1, function(err,rows1)
                {
                    if(err)
                    {
                        throw err;
                    } else
                    {
                        obj = {db: rows,
                            db1: rows1};
                        res.render('demand', obj);

                        console.log(JSON.stringify(obj));
                    }
                });
            }
        });

});

module.exports = router;

