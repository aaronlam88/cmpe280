"use strict";

var express = require('express');
var router = express.Router();

/* GET search page. */
router.get('/', function (req, res, next) {
    res.render('dashboard-tableau');
});

module.exports = router;
