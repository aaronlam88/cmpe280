"use strict";

var express = require('express');
var router = express.Router();

var users = require('../json_objects/admin.json');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.username && req.session.token) {
        res.render('dashboard');
    } else {
        res.render('dashboard-login', { error: { message: "You need to login first!" } });
    }

});

/* POST get username and password from the form*/
router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if (users[username].password === password) {
        req.session.username = username;
        var token = Math.random().toString(36);
        req.session.token = token;
        res.render('dashboard', { username: username, token: token, user: users[username] });
    } else {
        res.render('error', { message: "Wrong username or password!" });
    }
});

module.exports = router;
