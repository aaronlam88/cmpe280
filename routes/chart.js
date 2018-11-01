"use strict"
const Monk = require('monk');
var express = require('express');
var router = express.Router();
var collection = Monk("//18.207.178.32:27017/cmpe280");

// default route
router.get('/', function (req, res, next) {
    var data = [];
    // collection.get('hotel_review').find({},{longitude:0, latitude:1}).each = function(docs) {
    //   long.push(parseInt(docs.longitude));
    //   console.log(docs);
    // }
    console.log('asdf');
    collection.get('hotel_review').find({},{longitude:0, latitude:1}).each((doc, {close,pause,resume}) => {
      data.push(doc);
    }).then(() => {
      console.log('done');
      console.log(data);
    });

    res.render('chart', {'data' : data});
});

module.exports = router;
