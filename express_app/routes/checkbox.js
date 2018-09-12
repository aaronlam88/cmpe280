
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

    console.log(req.body);

    // get check
    if (req.body.music) {
        params.check.push(req.body.music);
    } else if (req.body.ancient) {
        params.check.push(req.body.ancient);
    } else if (req.body.romantic) {
        params.check.push(req.body.romantic);
    } else if (req.body.popular) {
        params.check.push(req.body.popular);
    } else if (req.body.beaches) {
        params.check.push(req.body.beaches);
    }

    // get select
    if (req.body.destination) {
        params.select = req.body.destination;
    }
    console.log(params);
    res.render('postcheck', {check: params.check, select: params.select});

});
module.exports = router;
