var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");


/* GET SQL data. */
var obj = {};

var quer1 = "SELECT * FROM test1 LIMIT 10";
var quer2 = "SELECT om_ouc FROM live_table";

router.get('/', loginfunction.isLoggedIn, function(req, res) {

        pool.query(quer1, function(err,rows)
        {
            if(err)
            {
                console.log("error here");
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
                        pool.query(quer2, function(err,rows2)
                        {
                            if(err)
                            {
                                throw err;
                            } else
                            {
                                obj = {db: rows,
                                    db1: rows1,
                                    ouc: rows2};
                                res.render('demand', obj);

                                console.log(JSON.stringify(obj));
                            }
                        });
                    }
                });
            }
        });

});

module.exports = router;

