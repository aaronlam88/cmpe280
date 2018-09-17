var express = require('express');
var router = express.Router();
var clockCtr = require('../controllers/server/clockCtr');

router.get('/', function (req, res, next) {
    res.render('clock');
    
});
router.post('/', function (req, res) {
    setInterval(clockCtr, 1000);
    res.render('clock');
});
module.exports = router;



