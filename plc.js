var snap7 = require('node-snap7');
var s7client = new snap7.S7Client();
var express = require('express');
var app = express();
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/hc81.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the chinook database.');
});


var PLC = {
    "ip": '10.0.1.220',
    "rack": 0,
    "slot": 2
};

class Params {
    constructor() {
        this.temperature = 0.0,
            this.wight = 0.0,
            this.datetime = 0
    }
};

var params = new Params();

s7client.ConnectTo(PLC.ip, PLC.rack, PLC.slot, function (err) {
    if (err) {
        return console.log(' >> Connection failed. Code #' + err + ' - ' + s7client.ErrorText(err));
    }
});
readData();


function readData() {
    s7client.DBRead(220, 84, 4, function (err, res) {
        if (err)
            return console.log(' >> DBRead failed. Code #' + err + ' - ' + s7client.ErrorText(err));
        params.temperature = res.readFloatBE();
    });
    s7client.DBRead(700, 0, 4, function (err, res) {
        if (err)
            return console.log(' >> ABRead failed. Code #' + err + ' - ' + s7client.ErrorText(err));
        params.wight = res.readFloatBE();
    });
    params.datetime = new Date();
    //dbTime = params.datetime.valueOf();
    db.run('INSERT INTO log VALUES(?,?,?)', [params.datetime.valueOf(), params.temperature, params.wight], function (err) {
        if (err) {
            return console.log(err.message);
        }
    });


}

var timerId = setInterval(function () {
    readData();
}, 1000);

module.exports = params;