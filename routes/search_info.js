var express = require('express');
var router = express.Router();
router.get('/2', function (req, res, next) {
    res.render("info2");
});
router.get('/3', function (req, res, next) {
    res.render("info3");
});

module.exports = router;
