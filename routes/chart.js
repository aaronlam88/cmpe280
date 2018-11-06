"use strict"
var express = require('express');
var router = express.Router();
var monk = require('monk');
var database = monk("mongodb://18.207.178.32:27017/cmpe280")
var collection = database.get('hotel_review');

// default route
router.get('/', function (req, res, next) {
    // var allData = {};
    // var arr = [];
    // var cities = ["Alexandria","Newburgh","San Antonio","Biloxi","Waterville","Virginia Beach","West Yarmouth","New York","Long Beach","Las Vegas"];
    // collection.find({"city":{"$in": cities}}).each(docs => {
    //   var name = String(docs['city']);
    //   var score = docs['reviews_rating'];
    //   if(!(name in allData)) {
    //     allData[name] = [];
    //   }
    //   if(score !== '') {
    //     allData[name].push(score);
    //   }
    // }).then(() => {
    //   console.log(allData);
    //   for (var key in allData) {
    //     var sum = 0;
    //     var temp = allData[key];
    //     for (var i=0; i<temp.length; i++) {
    //       sum += parseFloat(temp[i]);
    //     }
    //     var avg = sum/temp.length;
    //     arr.push({"name": key, "score": avg});
    //   }
    //   database.get('chart_data').insert({"data":arr , "id":5}).then(()=>{}).catch(err=>{
    //     console.log(err);
    //   });
    // }).catch(err => {
    //   console.log(err);
    // });

    // collection.find({"city":{"$in": cities}}).each(docs => {
    //   var category = docs.categories;
    //   if (!(category in allData)) {
    //     allData[category] = 1;
    //   }
    //   else {
    //     allData[category] += 1;
    //   }
    // }).then(() => {
    //   for (var key in allData) {
    //       let temp = {"category": key, "count": allData[key]};
    //       arr.push(temp);
    //     }
    //
    //   database.get('chart_data').insert({"data":arr , "id":3}).then(()=>{}).catch(err=>{
    //       console.log(err);
    //     });
    //   console.log('done!');
    // }).catch((err) => {
    //   console.log(err);
    // });
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
    //   var bussiness = docs.name + ", " + docs.city + ", " + docs.province;
    //   var location = docs.latitude + ", " + docs.longitude;
    //   if(!(bussiness in allData)) {
    //     allData[bussiness] = {};
    //     allData[bussiness]['count'] = 1;
    //     allData[bussiness]['location'] = location;
    //   }
    //   else {
    //     allData[bussiness]['count']+= 1;
    //   }
    // }).then(() => {
    //   for (var key in allData) {
    //     let temp = {"bussiness": key, "count": allData[key]['count'], "location":allData[key]['location']};
    //     arr.push(temp);
    //   }
    //   var t = sortByKey(arr, 'count').slice(0,11);
    //   console.log(t);
    //   database.get('chart_data').insert({"data":t , "id":4}).then(()=>{}).catch((err) => {
    //     console.log(err);
    //   });
    // }).catch((err) => {
    //   console.log(err);
    // });
    //
    res.render('chart');
});

module.exports = router;
