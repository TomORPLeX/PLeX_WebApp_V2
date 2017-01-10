var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');

router.use('/', function(req, res, next) {

    var EIN = req.body.EIN;
    var quer1 = "SELECT * FROM users WHERE EIN = '"+EIN+"'";
    var obj = {};

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
                var adminFlag1 = 1;
            }

            var loginFlag1 = 1;

            console.log('Logged In (logincheck.js)');

            res.cookie('EIN', EIN, { maxAge: 900000, httpOnly: false} );
            res.cookie('username', name, { maxAge: 900000, httpOnly: false});
            res.cookie('loginFlag', loginFlag1, { maxAge: 900000, httpOnly: false});
            res.cookie('adminFlag', adminFlag1, { maxAge: 900000, httpOnly: false});
            res.cookie('cases','', { maxAge: 900000, httpOnly: false});


            //res.render('index', { title: 'Welcome '+ req.cookies.username, loginFlag: req.cookies.loginFlag, adminFlag: req.cookies.adminFlag });
            res.redirect('/demand');

        }
    });
});

module.exports = router;