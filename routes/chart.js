"use strict"
var express = require('express');
var router = express.Router();
var monk = require('monk');
var database = monk("mongodb://18.207.178.32:27017/cmpe280")
var collection = database.get('hotel_review');

// default route
router.get('/', function (req, res, next) {
//     var allData = []
//     collection.find({},{latitude:1, longitude:1}, () => {}).each(docs => {
//       allData.push({x: parseFloat(docs.latitude), y:parseFloat(docs.longitude)});
//     }).then(() => {
//       console.log('done!');
//     }).catch(err => {
//       console.log(err);
//     })
//

    // function sortByKey(array, key) {
    //     return array.sort(function(a, b) {
    //         var x = a[key]; var y = b[key];
    //         return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    //     });
    // }
    // var allData = {};
    // var arr = [];
    // collection.find({}, () => {}).each(docs => {
    //   var city = docs.city + ", " + docs.province + ", " + docs.postalCode;
    //   if(!(city in allData)) {
    //     allData[city] = 1;
    //   }
    //   else {
    //     allData[city] += 1;
    //   }
    // }).then(() => {
    //   for (var key in allData) {
    //     let temp = {"city": key, "count": allData[key]};
    //     arr.push(temp);
    //   }
    //   var t = sortByKey(arr, 'count').slice(0,11);
    //   database.get('chart_data').insert({"data":t , "id":2}).then(()=>{}).catch(err=>{
    //     console.log(err);
    //   });
    //   console.log('done!');
    // }).catch(err => {
    //   console.log(err);
    // });
    res.render('chart');
});

module.exports = router;
