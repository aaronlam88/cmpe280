"use strict";

const MongoClient = require('mongodb').MongoClient;

// Default connection url
var _url = 'mongodb://18.207.178.32:27017';
// Default database Name
var _database = 'aaronDB';

/**
 * Constructor for Database
 * If you want to connect to a database other than the default, give a database in the param
 * If you want to connect to a different mongodb host other than the default, give the url in the param
 * @param {*} database database name that you want to connect to, default: 'aaronDB'
 * @param {*} url url used to connect to mongodb, default: 'mongodb://18.207.178.32:27017'
 */
function Database(database, url) {
    // Database Name
    _database = database || _database;
    // Connection url
    _url = url || _url;
}

Database.prototype.createCollection = function (collection) {
    if (!collection) {
        return { 'status': 'ERROR', 'message': 'Missing collection!' };
    }
    try {
        MongoClient.connect(_url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(_database);
            dbo.createCollection(collection, function (err, res) {
                if (err) throw err;
                console.log(`${collection} created!`);
                db.close();
            });
        });
        return { 'status': 'OK', 'message': `${collection} created!` };
    } catch (error) {
        return { 'status': 'ERROR', 'message': error };
    }
}

Database.prototype.insert = function (collection, data) {
    if (!collection) {
        return { 'status': 'ERROR', 'message': 'Missing collection!' };
    }
    try {
        MongoClient.connect(_url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(_database);
            dbo.collection(collection).insertMany(data, (err, res) => {
                if (err) throw err;
                var count = res.insertedCount;
                console.log(`${res.insertedCount} object(s) inserted into collection ${collection}`);
                db.close();
            });
        });
        return { 'status': 'OK', 'message': `inserted` };
    } catch (error) {
        return { 'status': 'ERROR', 'message': error };
    }
}

module.exports = Database;
