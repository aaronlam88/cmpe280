var express = require('express');
var router = express.Router();

/* GET search page. */
router.get('/', function (req, res, next) {
  console.log(req.session);
  res.render('search');
});

module.exports = router;
