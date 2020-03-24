var express = require('express');
var router = express.Router();
var formidable = require('formidable');

const multer = require('multer');
const upload = multer();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.post('/uploadimg',upload.any(), function(req, res, next) {
  var name = "upload/"+ new Date().getTime() + ".jpg";
  

  fs.writeFile(name, req.files[0].buffer, (err) => {
    if (err) {
        console.log('Error: ', err);
        res.status(500).send('An error occurred: ' + err.message);
    } else {
        res.status(200).send('ok');
    }
});

});

module.exports = router;
