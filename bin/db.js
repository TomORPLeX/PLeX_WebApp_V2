var express = require('express');
var mysql = require('mysql');

function ConnectDB() {
    var pool = mysql.createPool({
        host: "10.52.204.247",
        user: "nsusr",
        password: "N5p1A2",
        database: "plex",
        connectionLimit: 50,
        multipleStatements: true,
        acquireTimeout: 15000
    });

    pool.getConnection(function(err, connection) {
        console.log('Connection Established');
    });

    pool.on('error', function(err,rows) {
        console.log(err.code);
        console.log('recieved error in connection pool');
        //get another connection form the pool
    });

    /*pool.on('close', function(err,rows) {
        console.log('Connection Pool Closed');
    });*/

    //implement pool clustering

    return pool;
}
module.exports = ConnectDB();

/*
//create connection pool
var quer1 = "SELECT * FROM test1 LIMIT 10";
pool.getConnection(function(err, connection) {
    connection.query(quer1, function(err,rows) {
        if(err) {
            throw err;
        } else {
            console.log(JSON.stringify(rows));
        }
    });
    connection.release();
    console.log('Connection Released');
});
    */