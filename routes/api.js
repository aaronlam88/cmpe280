"use strict";

var express = require('express');
var router = express.Router();

var users = require('../json_objects/mockUsers.json');

/* api   */
router.get('/mockusers', function (req, res, next) {
    if (req.session.username && req.session.token) {
        res.setHeader('Content-Type', 'application/json');
        res.send(users);
    } else {
        res.render('dashboard-login', { error: { message: "You need to login first!" } });
    }
});

module.exports = router;
