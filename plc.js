let snap7 = require('node-snap7');
let s7client = new snap7.S7Client();
let express = require('express');
const config = require('./config');
let db = require("./db");

class Params {
    constructor() {
        this.temperature = 0.0,
        this.wight = 0.0,
        this.datetime = 0
    }
};

let params = new Params();
const PLC = config.get("plc");
s7client.ConnectTo(PLC.ip, PLC.rack, PLC.slot, function (err) {
    if (err) {
        return console.log(' >> Connection failed. Code #' + err + ' - ' + s7client.ErrorText(err));
    }
});
//readData();


function readData() {
    s7client.DBRead(220, 84, 4, function (err, res) {
        if (err)
             console.log(' >> DBRead failed. Code #' + err + ' - ' + s7client.ErrorText(err));
        params.temperature = res.readFloatBE();
    });
    s7client.DBRead(700, 0, 4, function (err, res) {
        if (err)
            console.log(' >> ABRead failed. Code #' + err + ' - ' + s7client.ErrorText(err));
        params.wight = res.readFloatBE();
    });
    params.datetime = new Date();

    db.run('INSERT INTO log VALUES(?,?,?)', [params.datetime.valueOf(), params.temperature, params.wight], function (err) {
        if (err) {
            //return console.log(err.message);
        }

    });

    //console.log(params.datetime.valueOf(), params.temperature, params.wight);
}

let timerId = setInterval(function () {
    readData();
}, 1000);

module.exports = params;