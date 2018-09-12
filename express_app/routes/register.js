var express = require('express');
var router = express.Router();

var fs = require('fs');
var users = require('../json_objects/users.json');

router.get('/', function (req, res, next) {
    if (req.session.token) {
        res.render('profile', {username: req.session.username, token: req.session.token, message: "You already registered!"});
    } else {
        res.render('register');
    }
});


/* POST username and password*/
router.post('/', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    users[username] = password;
    var json = JSON.stringify(users, null, 4);

    fs.writeFile(__dirname + '/../json_objects/users.json', json, 'utf8', function (error) {
        if (error) {
            console.error(error);
            res.render('error', { error: error });
        } else {
            console.log(username + ' is added');
            res.redirect('/profile');
        }
    });
});

module.exports = router;