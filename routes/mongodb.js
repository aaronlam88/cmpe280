"use strict";

var express = require('express');
var router = express.Router();

var Database = require('../models/Database');

var help = {
    '[GET] /createCollection?collection=...': 'create a new collection in the database',
    '[GET] /insert?collection=...&data=[{...}]': 'insert data into the collection [not recommended]',
    '[POST] /insert': 'insert object {"collection": ..., data: [{...}] } in the post body into the collection [recommended]'
};
var collectionFieldError = {
    status: 'collection field error',
    stack: 'Require: collection field must be a string'
};
var insertDataFieldError = {
    status: 'data field error',
    stack: 'Require: data field must be an Array of JSON objects'
};
var findDataFieldError = {
    status: 'data field error',
    stack: 'Require: data field must be of JSON type object and NOT Array'
};
var updateQueryFieldError = {
    status: 'query field error',
    stack: 'Require: new field must be of JSON type object and NOT Array'
};
var updateDataFieldError = {
    status: 'data field error',
    stack: 'Require: data field must be of JSON type object and NOT Array'
};

// create a connection to database
var database = new Database();

// default route
router.get('/', function (req, res, next) {
    database.find("user", res);
});

router.post('/createCollection', function (req, res, next) {
    var collection = req.body.collection;
    if (typeof collection !== 'string') {
        return res.render('error', { error: collectionFieldError });
    }
    database.createCollection(res, collection);
});

// insert data into collection
/**
router.get('/insert', function (req, res, next) {
    var collection = req.query.collection;
    if (typeof collection !== 'string') {
        return res.render('error', { error: collectionFieldError });
    }
    var data = JSON.parse(req.query.data || "[]");
    if (!Array.isArray(data) || data.length === 0) {
        return res.render('error', { error: insertDataFieldError });
    }
    database.insert(res, collection, data);
});
*/

router.post('/insert', function (req, res, next) {
    var collection = req.body.collection;
    if (typeof collection !== 'string') {
        return res.render('error', { error: collectionFieldError });
    }
    var data = req.body.data;
    // if (!Array.isArray(data) || data.length === 0) {
    //     return res.render('error', { error: insertDataFieldError });
    // }
    database.insert(res, collection, data);
});

// update data into collection

/**
router.get('/update', function (req, res, next) {
    var collection = req.query.collection;
    if (typeof collection !== 'string') {
        return res.render('error', { error: collectionFieldError });
    }
    var query = JSON.parse(req.query.query || "{}");
    if (typeof query !== 'object' || query.length === 0) {
        return res.render('error', { error: updateQueryFieldError });
    }
    var data = JSON.parse(req.query.data || "{}");
    if (typeof data !== 'object' || data.length === 0) {
        return res.render('error', { error: updateDataFieldError });
    }
    database.update(res, collection, query, data);
});
*/

router.post('/update', function (req, res, next) {
    var collection = req.body.collection;
    if (typeof collection !== 'string') {
        return res.render('error', { error: collectionFieldError });
    }
    var query = req.body.query;
    if (typeof query !== 'object' || query.length === 0) {
        return res.render('error', { error: updateQueryFieldError });
    }
    var data = req.body.data;
    if (typeof data !== 'object' || data.length === 0) {
        return res.render('error', { error: updateDataFieldError });
    }
    database.update(res, collection, query, data);
});

// find data into collection

/**
router.get('/find', function (req, res, next) {
    var collection = req.body.collection;
    if (typeof collection !== 'string') {
        return res.render('error', { error: collectionFieldError });
    }
    var data = req.body.data;
    // var data = JSON.parse(req.query.data || "{}");
    // if (typeof data !== 'object' || Array.isArray(data)) {
    //     return res.render('error', { error: findDataFieldError });
    // }
    database.find(res, collection, data);
});
*/

router.post('/find', function (req, res, next) {
    var collection = req.body.collection;
    if (typeof collection !== 'string') {
        return res.render('error', { error: collectionFieldError });
    }
    var data = req.body.data;
    if (typeof data !== 'object' || Array.isArray(data)) {
        return res.render('error', { error: findDataFieldError });
    }
    database.find(res, collection, data);
});

// find and remove data into collection

/**
router.get('/findAndRemove', function (req, res, next) {
    var collection = req.query.collection;
    if (typeof collection !== 'string') {
        return res.render('error', { error: collectionFieldError });
    }
    var data = JSON.parse(req.query.data || "{}");
    if (typeof data !== 'object' || Array.isArray(data) || data.length === 0) {
        return res.render('error', { error: findDataFieldError });
    }
    database.findAndRemove(res, collection, data);
});
*/

router.post('/findAndRemove', function (req, res, next) {
    var collection = req.body.collection;
    if (typeof collection !== 'string') {
        return res.render('error', { error: collectionFieldError });
    }
    var data = req.body.data;
    if (typeof data !== 'object' || Array.isArray(data) || data.length === 0) {
        return res.render('error', { error: findDataFieldError });
    }
    database.findAndRemove(res, collection, data);
});

module.exports = router;
