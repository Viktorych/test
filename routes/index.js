var express = require('express');
var router = express.Router();
var serveIndex = require('serve-index');
var fs = require("fs");
var plc=require("../plc");
/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(plc.wight);
    res.render('index', {dates: plc.datetime, wight: plc.wight, temper: plc.temperature.toFixed(2)});
});
router.get('/plc', function (req, res, next) {
    console.log(plc.wight);
    res.send(JSON.stringify({data: plc}));
});
router.get('/graph', function (req, res, next) {
    res.render('graph', {title: 'Графики разливки'});
});
//const fs = require('fs');
router.get('/files', function (req, res, next) {
    var _data = [];
    fs.readdir('./data', function (err, files) {
        // "files" is an Array with files names
        //console.log(err);
        //console.log(files.toLocaleString());
        files.forEach(function (item, i, arr) {
            _data.push({file: item});
        });
        _files = JSON.stringify(files);
        //res.render('index', { title: _files });
        res.end(JSON.stringify({data: _data}));

    });


});

router.use('/ftp', express.static('data'), serveIndex('public/ftp', {'icons': true}));

router.get('/file/:name', function (req, res, next) {
//    console.log(req.params.name);
    var datasend = [];
    path = "data/" + req.params.name;
    var array = fs.readFileSync(path).toString().split('\n');
    var lasttime = 0.0;
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
