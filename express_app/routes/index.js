var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.debug(req.session);
  res.render('index', { title: 'TripWiser' });
});

module.exports = router;
