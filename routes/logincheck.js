var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');

router.use('/', function(req, res, next) {

    var EIN = req.body.EIN;
    var quer1 = "SELECT * FROM users WHERE EIN = '"+EIN+"'";
    var obj = {};
    console.log(quer1);

    pool.query(quer1, function(err,rows)
    {
        if(err)
        {
            throw err;
        } else
        {
            obj = {db: rows};

            var name = obj.db[0].NAME;
            var EIN = obj.db[0].EIN;
            var OUC = obj.db[0].OUC;
            var profile = obj.db[0].PROFILE;

            console.log('profile is: '+profile);
            if (profile == 'Admin')
            {
                adminFlag = 1;
            }

            loginFlag = 1;

            console.log('Logged In (logincheck.js)');
            //res.end();
            //res.render('index', { title: 'Welcome '+name });
            //res.render('otd', {title:'Welcome to OTD '+name});
            res.redirect('/demand');
        }
    });
});

module.exports = router;