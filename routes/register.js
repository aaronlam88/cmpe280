"use strict";

var express = require('express');
var router = express.Router();

var fs = require('fs');
var users = require('../json_objects/users.json');

var registerCtr = require('../controllers/server/registerCtr');

router.get('/', function (req, res, next) {
    if (req.session.username && req.session.token) {
        var username = req.session.username
        res.render('profile', { username: username, token: req.session.token, user: users[username], message: "You already registered!" });
    } else {
        res.render('register');
    }
});


/* POST username and password*/
router.post('/', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var phone = req.body.phone;

    // should not rely on front end to check the data
    // double check the data in back end
    var result = registerCtr.validate(req.body);
    if (!result.pass) {
        var error = {
            status: 'Register Error',
            stack: result.errorMessage
        };

        return res.render('error', { error: error });
    }

    users[username] = {
        password: password,
        email: email,
        phone: phone
    }

    var json = JSON.stringify(users, null, 4);

    fs.writeFile(__dirname + '/../json_objects/users.json', json, 'utf8', function (error) {
        if (error) {
            res.render('error', { error: error });
        } else {
            res.redirect('/profile');
        }
    });
});

module.exports = router;
