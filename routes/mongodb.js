"use strict";

var express = require('express');
var router = express.Router();

var Database = require('../models/Database');

// create a connection to database
var database = new Database();

// default route
router.get('/', function (req, res, next) {
    res.render('mongodb');
});

router.post('/createCollection', function (req, res, next) {
    var collection = req.body.collection;
    database.createCollection(res, collection);
});

// insert data into collection
router.post('/insert', function (req, res, next) {
    var collection = req.body.collection;
    var data = req.body.data;
    database.insert(res, collection, data);
});

// update data into collection
router.post('/update', function (req, res, next) {
    var collection = req.body.collection;
    var query = req.body.query;
    var data = req.body.data;
    database.update(res, collection, query, data);
});

// find data into collection
router.post('/find', function (req, res, next) {
    var collection = req.body.collection;
    var data = req.body.data;
    database.find(res, collection, data);
});

// find and remove data into collection
router.post('/findAndRemove', function (req, res, next) {
    var collection = req.body.collection;
    var data = req.body.data;
    database.findAndRemove(res, collection, data);
});

module.exports = router;
