"use strict"
var express = require('express');
var router = express.Router();
var monk = require('monk');
var database = monk("mongodb://18.207.178.32:27017/cmpe280")
var collection = database.get('hotel_review');

// default route
router.get('/', function (req, res, next) {
    // var allData = []
    // collection.find({},{latitude:1, longitude:1}, () => {}).each(docs => {
    //   allData.push({x: parseFloat(docs.latitude), y:parseFloat(docs.longitude)});
    // }).then(() => {
    //   console.log('done!');
    // }).catch(err => {
    //   console.log(err);
    // })
    //
    // var options = {
    //   type: 'scatter',
    //   data: {
    //     datasets: [{
    //       label: 'Scatter',
    //       data: allData
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       xAxes: [{
    //         type: 'linear',
    //         position: 'bottom'
    //       }]
    //     },
    //     responsive: false
    //   }
    // };

    res.render('chart');
});

module.exports = router;
