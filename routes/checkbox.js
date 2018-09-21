"use strict";

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('checkbox');
});

router.post('/', function (req, res, next) {
    var params = {
        check: [],
        select: ""
    };

    // get check
    if (req.body.interests) {
        params.check = req.body.interests;
    }

    // get select
    if (req.body.destination) {
        params.select = req.body.destination;
    }
    res.render('postcheck', { check: params.check, select: params.select });

});
module.exports = router;
