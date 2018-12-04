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

//index
router.get('/userlist', function (req, res, next) {
    var collection = 'test';
    var data = {};
    database._database.get(collection).find(data, {},
                            function(err,result){
                                res.render('userlist', { "userlist" : result });
                            });
    //database.find(res, collection, data);
    //res.render('userlist');

});
// show
router.get('/userlist/:username', function (req, res, next) {
    var collection = 'test';
    var username = req.params.username;
    var data = {
        username: username
    };
    database._database.get(collection).find(data, 
                            function(err, doc) 
                            {
                            if (err) {
                            res.send("Find failed.");
                            }
                            else {
                                res.render('showuser', 
                                     { title: 'Show User: ' + username,
                                        password: doc[0].password })
                            }
                            });
});
//new
router.get('/newuser',function(req, res) 
{
    res.render('newuser', { "title": 'Add New User' });
});

//edit
router.get('/edituser/:username', function (req, res, next) {

    res.render('edituser', { "title": ' Edit User' });

});

//create
router.post('/adduser', function (req, res, next) {
    var collection = 'test';
    var username = req.body.username;
    var password = req.body.password;
    var data = {
        username: username,
        password: password
    };
    database._database.get(collection).insert(data, 
        function(err, doc) 
        {
        if (err) {
        res.send("Insert failed.");
        }
        else {
            res.redirect("userlist");
        }
        });
});

// TODO: Display form to edit a user

//update
router.post('/updateuser', function (req, res, next) {
    var collection = 'test';
    var username = req.body.username;
    var password = req.body.password;
    var query = {
        username: username
    };
    var data = {
        username: username,
        password: password
    };
    database._database.get(collection).update(query, { $set: data }, { "multi": true },
     function (error, result) {
        if (error) {
            res.send("Update failed.");
        }
        else {
            // Forward to success page
            res.redirect("userlist");
           }
    });
});


//destory
router.get('/deleteuser/:username', function (req, res, next) {
    var collection = 'test';
    var username = req.params.username;

    var data = {
        username: username
    }
    database._database.get(collection).remove( { "username" : username },
    function (err, doc) 
    {
        if (err) {
            res.send("Delete failed.");
        }
        else {
            res.send("Successfully deleted " + username);
        }
    });
});

module.exports = router;
