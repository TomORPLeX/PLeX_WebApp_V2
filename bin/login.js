var express = require('express');

//Login Function
exports.isLoggedIn = function (req,res,next) {
        console.log('Cookies:' + JSON.stringify(req.cookies));
        console.log('LoginFlag Cookie:' + JSON.stringify(req.cookies.loginFlag));

        if(req.cookies.loginFlag== 1) {
            console.log('Logged In');
            return next();
        } else {
            console.log('Not Logged In');
            res.redirect('/');
        }
    };