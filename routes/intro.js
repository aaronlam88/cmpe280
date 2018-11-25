"use strict";

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('intro2', { title: 'Explore' });
});

module.exports = router;