var express = require('express');

//Login Function
exports.isLoggedIn = function (req,res,next) {
        console.log(loginFlag);
        console.log('in login function');
        if(loginFlag== 1) {
            console.log('Logged In');
            return next();
        } else {
            console.log('Not Logged In');
            res.redirect('/');
        }
    };


