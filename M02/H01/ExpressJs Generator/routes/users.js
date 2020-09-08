var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource <br> Ini Page Users');
});

router.get('/*fly$', function(req, res, next) {
  res.send('apa terserah');
});

module.exports = router;
