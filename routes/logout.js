var express = require('express');
var router = express.Router();

var users = require('../json_objects/users.json');

var username = undefined;
var password = undefined;
var token = undefined;

/* GET home page. */
router.get('/', function (req, res, next) {
    req.session.destroy();
    console.log('logout');
    res.redirect('/');
});

module.exports = router;