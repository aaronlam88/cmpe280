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
    if (req.body.music) {
        params.check.push(req.body.music);
    }
    if (req.body.ancient) {
        params.check.push(req.body.ancient);
    }
    if (req.body.romantic) {
        params.check.push(req.body.romantic);
    }
    if (req.body.popular) {
        params.check.push(req.body.popular);
    }
    if (req.body.beaches) {
        params.check.push(req.body.beaches);
    }

    // get select
    if (req.body.destination) {
        params.select = req.body.destination;
    }

    res.render('postcheck', { check: params.check, select: params.select });

});
module.exports = router;
