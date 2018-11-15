"use strict";

var express = require('express');
var router = express.Router();

var Database = require('../models/Database');
var users = require('../json_objects/mockUsers.json');

// create a connection to database
var database = new Database();
/* api   */
router.get('/mockusers', function (req, res, next) {
    if (req.session.username && req.session.token) {
        res.setHeader('Content-Type', 'application/json');
        res.send(users);
    } else {
        res.render('dashboard-login', { error: { message: "You need to login first!" } });
    }
});

router.get('/userlist', function (req, res, next) {
    var collection = 'test';
    var data = {};
    database.find(res, collection, data);
});

router.get('/userlist/:username', function (req, res, next) {
    var collection = 'test';
    var username = req.params.username;
    var data = {
        username: username
    };
    database.find(res, collection, data);
});

router.get('/newuser', function (req, res, next) {
    var collection = 'test';
    var username = req.body.username;
    var password = req.body.password;
    var data = {
        username: username,
        password: password
    };
    database.find(res, collection, data);
});

// TODO: Display form to edit a user
router.get('/edituser/:username', function (req, res, next) {

});

router.post('/adduser', function (req, res, next) {
    var collection = 'test';
    var username = req.body.username;
    var password = req.body.password;
    var data = [];
    data.push({
        username: username,
        password: password
    });
    database.insert(res, collection, data);
});

router.post('/updateuser/:username', function (req, res, next) {
    var collection = 'test';
    var username = req.params.username;
    var password = req.body.password;
    var query = {
        username: username
    };
    var data = {
        username: username,
        password: password
    };
    database.update(res, collection, query, data);
});

router.get('/deleteuser/:username', function (req, res, next) {
    var collection = 'test';
    var username = req.params.username;
    var data = {
        username: username
    }
    database.findAndRemove(res, collection, data);
});

module.exports = router;
