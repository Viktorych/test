let express = require('express');
let router = express.Router();
let serveIndex = require('serve-index');
let fs = require("fs");
let plc = require("../plc");
const config = require('../config');
const path = require('path');
/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(plc.wight);
    res.render('index', {dates: plc.datetime, wight: plc.wight, temper: plc.temperature.toFixed(2)});
});
router.get('/plc', function (req, res, next) {
    //console.log(plc.wight);
    res.send({plc});
});
router.get('/graph', function (req, res, next) {
    res.render('graph', {title: 'Графики разливки'});
});
router.get('/trends', function (req, res, next) {
    res.render('trends', {title: 'Графики разливки'});
});
//const fs = require('fs');
router.get('/files', function (req, res, next) {
    let _data = [];

    fs.readdir(config.get("dataPath"), function (err, files) {
        files.forEach(function (item, i, arr) {
            //console.log(path.extname(item));
            if (path.extname(item) === ".csv") {
                console.log(item);
                _data.push({file: item});
            }
         });
        res.end(JSON.stringify({data: _data}));
    });
});



router.use('/ftp', express.static('data'), serveIndex('public/ftp', {'icons': true}));

router.get('/file/:name', function (req, res, next) {
//    console.log(req.params.name);
    let datasend = [];
    _path = config.get("dataPath") + req.params.name;
    console.log(_path);
    let array = fs.readFileSync(_path).toString().split('\n');
    let lasttime = 0.0;
    array.forEach(function (item, i, arr) {
        rov = item.toString().split(';');
        time = Math.round(parseFloat(rov[0].replace(",", ".")) + lasttime);
        if (!isNaN(time)) {
            //console.log(typeof time, time);
            datasend.push([time, parseInt(rov[1])]);
            lasttime = time;
        }

    });
    //console.log(array.toString());
    res.send({data: datasend});
});

module.exports = router;
