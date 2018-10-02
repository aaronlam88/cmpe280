"use strict";

var express = require('express');
var router = express.Router();

var users = require('../json_objects/mockUsers.json');

/* GET home page. */
router.get('/', function (req, res, next) {
    // if (req.session.username && req.session.username === username && req.session.token && req.session.token === token) {
    if(true) {
        res.setHeader('Content-Type', 'application/json');
        res.send(users);
    } else {
        res.render('dashboard-login', { error: { message: "You need to login first!" } });
    }
});

module.exports = router;
