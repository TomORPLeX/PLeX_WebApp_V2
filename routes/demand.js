var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");
var fs = require('fs');

/* GET SQL data. */
var obj = {};

//var quer1 = "SELECT * FROM live_workstack LIMIT 10";
var quer2 = "SELECT DISTINCT om_ouc FROM live_workstack";

router.get('/', loginfunction.isLoggedIn, function(err,req, res) {
    console.log(req.cookies.EIN );
    var tempfilelocation = '../public/data/' +req.cookies.EIN +'_LatLngData.json';
    var JsonData = JSON.parse(fs.readFileSync(tempfilelocation));
    var selection = JsonData.selection;
    var priorityCount = JsonData.priorityCount;

<<<<<<< HEAD
                        pool.query(quer2, function(err,rows2)
                        {
                            if(err)
                            {
                                throw err;
                            } else
                            {
                                obj = {ouc: rows2,
                                    selection: selection,
                                    priorityCount: priorityCount,
                                    ein: req.cookies.EIN, 'username': req.cookies.username, 'loginFlag': req.cookies.loginFlag, 'adminFlag': req.cookies.adminFlag, 'cases': req.cookies.cases};
                                    res.render('demand', obj);

                            }
                        });
=======

    pool.query(quer2, function(err,rows2)
    {
        if(err)
        {
            throw err;
        } else
        {
            obj = {ouc: rows2,
                selection: selection,
                priorityCount: priorityCount,
                ein: req.cookies.EIN,
                'username': req.cookies.username,
                'loginFlag': req.cookies.loginFlag,
                'adminFlag': req.cookies.adminFlag,
                'cases': req.cookies.cases};
                res.render('demand', obj);
        }
    });
>>>>>>> adam1
});

module.exports = router;

