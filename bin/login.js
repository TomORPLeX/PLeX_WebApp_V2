var express = require('express');

//Login Function
exports.isLoggedIn = function (req,res,next) {
    var url1 = req.baseUrl;
    var profile = req.cookies.profile;

    if(req.cookies.loginFlag== 1) {
        console.log('Logged In');
        console.log("profile:" + profile);
        console.log("base URL: "+url1);
        if (profile == 'Admin'){
            return next();
        }
        if (profile =='Manager')
        {
            if (url1 == '/demand' || url1 == '/planner' || url1 =='/otd' || url1 =='/jobflow' || url1 =='/maprerender' || url1 == '/editestimate' || url1 == '/getdatatabledata' || url1 == '/queryestimatecases'){
                return next();
            } else {
                res.redirect('/');
            }
        } else if (profile =='5DAP') {
            if (url1 == '/demand' || url1 == '/planner' || url1 =='/otd' || url1 =='/maprerender' || url1 == '/editestimate' || url1 == '/getdatatabledata' || url1 == '/queryestimatecases'){
                return next();
            } else {
                res.redirect('/');
            }
        } else if (profile =='OTD') {
            if (url1 == '/otd'){
                return next();
            } else {
                res.redirect('/');
            }
        }
    } else {
        console.log('Not Logged In');
        res.redirect('/');
    }
};