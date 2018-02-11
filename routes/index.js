var express = require('express');
var router = express.Router();
var serveIndex = require('serve-index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const fs = require('fs');
router.get('/files', function(req, res, next) {
  var _files=null;
    fs.readdir('./public/ftp', function (err, files) {
        // "files" is an Array with files names
        //console.log(err);
        //console.log(files.toLocaleString());
        _files=JSON.stringify(files);
        res.render('index', { title: _files });

    });


});

router.use('/ftp', express.static('public/ftp'), serveIndex('public/ftp', {'icons': true}));


module.exports = router;
