"use strict";

var express = require('express');
var router = express.Router();
var us_map = require('../models/state-name.json')

/* GET home page. */
router.get('/state-name', function (req, res, next) {
    res.json(us_map);
});

module.exports = router;
