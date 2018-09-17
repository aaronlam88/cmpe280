var express = require('express');
var router = express.Router();
var registerCtr = require('../controllers/server/clockCtr');

router.get('/', function (req, res, next) {
    res.render('clock');
});
router.post('/', function (req, res) {
    res.render('clock');
});
module.exports = router;