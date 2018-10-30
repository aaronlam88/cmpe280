var monk = require('monk');
const fs = require('fs');
var etl = require('etl');

var db = monk('mongodb://18.207.178.32:27017/cmpe280');
var collection = db.get('etl');

var parse = require('csv-parse')

fs.createReadStream('toProcess.csv')
  .pipe(etl.csv())
  .pipe(etl.collect(1000))
  .pipe(etl.collection.insert(collection))
  .promise()
  .then( () => console.log('done'), e => console.log('error',e));
