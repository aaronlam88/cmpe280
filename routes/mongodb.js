"use strict";

var express = require('express');
var router = express.Router();

var Database = require('../models/Database');

var help = {
    '[GET] /createCollection?collection=...' : 'create a new collection in the database',
    '[GET] /insert?collection=...&data=[{...}]' : 'insert data into the collection [not recommended]',
    '[POST] /insert' : 'insert object {"collection": ..., data: [{...}] } in the post body into the collection [recommended]'
};
// default route
router.get('/', function (req, res, next) {
    res.json(help);
});

var database = new Database();
router.get('/createCollection', function (req, res, next) {
    var collection = req.query.collection;
    res.json(database.createCollection(collection));
});

router.get('/insert', function (req, res, next) {
    var collection = req.query.collection;
    var data = JSON.parse(req.query.data);
    res.json(database.insert(collection, data));
});

router.post('/insert', function (req, res, next) {
    var collection = req.body.collection;
    var data = req.body.data;
    res.json(database.insert(collection, data));
});

module.exports = router;