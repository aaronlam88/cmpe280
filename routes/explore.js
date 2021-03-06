"use strict";

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('explore');
});

router.post('/', function (req, res, next) {
    var params = {
        check: [],
        select: ""
    };

    // get check
    if (req.body.interests) {
        params.check.push(req.body.interests);
    }

    // get select
    if (req.body.destination) {
        params.select = req.body.destination;
    }
    res.render('explore-checked', { check: params.check, select: params.select });

});
module.exports = router;
