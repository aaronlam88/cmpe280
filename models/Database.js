"use strict";

const MongoClient = require('mongodb').MongoClient;

// Default connection url
var _url = 'mongodb://18.207.178.32:27017';
// Default database name
var _databaseName = 'cmpe280';
// Database
var _database = undefined;

class Database {

    /**
     * If you want to connect to a database other than the default, give a databaseName in the param
     * If you want to connect to a different mongodb host other than the default, give the url in the param
     * @param {string} databaseName database name, default: 'cmpe280'
     * @param {string} url mongodb url, default: 'mongodb://18.207.178.32:27017'
     */
    constructor(databaseName, url) {
        // Database Name
        _databaseName = databaseName || _databaseName;
        // Connection url
        _url = url || _url;
        // connect to database
        MongoClient.connect(_url, { useNewUrlParser: true }, function (error, database) {
            if (error) {
                console.log(error);
                throw error;
            }
            _database = database.db(_databaseName);
        });
    }

    /**
     * create new collection if collection is not existed in current database
     * @param {object} respond Express.respond object, use to respond to a request
     * @param {string} collection name of the collection
     */
    createCollection(respond, collection) {
        if (!collection) {
            respond.json({ 'status': 'ERROR', 'message': 'Missing collection!' });
        }
        try {
            _database.createCollection(collection, function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                console.log(`collection [${collection}] is created!`);
                // you can do respond.render(view, data) here
                respond.json({
                    status: 'OK',
                    message: `collection [${collection}] is created!`,
                    data: []
                });
            });
        }
        catch (error) {
            respond.json({ 'status': 'ERROR', 'message': error });
        }
    }

    /**
     * insert data into collection
     * @param {object} respond Express.respond object, use to respond to a request
     * @param {string} collection name of the collection
     * @param {Array} data an array of json object 
     */
    insert(respond, collection, data) {
        if (!collection) {
            respond.json({ 'status': 'ERROR', 'message': 'Missing collection!' });
        }
        try {
            _database.collection(collection).insertMany(data, function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                console.log(`${result.insertedCount} object(s) inserted into collection [${collection}]`);

                // you can do respond.render(view, data) here
                respond.json({
                    status: 'OK',
                    message: `${result.insertedCount} object(s) inserted into collection [${collection}]`,
                    data: result
                });
            });
        }
        catch (error) {
            respond.json({ 'status': 'ERROR', 'message': error });
        }
    }

    find(respond, collection, data) {
        if (!collection) {
            respond.json({ 'status': 'ERROR', 'message': 'Missing collection!' });
        }

        try {
            _database.collection(collection).find(data).toArray(function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                console.log(result);
                // you can do respond.render(view, data) here
                respond.json({
                    status: 'OK',
                    message: `find ${JSON.stringify(data)} in collection [${collection}]`,
                    data: result
                });
            });
        }
        catch (error) {
            respond.json({ 'status': 'ERROR', 'message': error });
        }
    }

    findAndRemove(respond, collection, data) {
        if (!collection) {
            respond.json({ 'status': 'ERROR', 'message': 'Missing collection!' });
        }

        try {
            _database.collection(collection).findAndRemove(data, function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                console.log(result);
                // you can do respond.render(view, data) here
                respond.json({
                    status: 'OK',
                    message: `findAndRemove ${JSON.stringify(data)} in collection [${collection}]`,
                    data: result
                });
            });
        }
        catch (error) {
            respond.json({ 'status': 'ERROR', 'message': error });
        }
    }

    update(respond, collection, query, data) {
        if (!collection) {
            respond.json({ 'status': 'ERROR', 'message': 'Missing collection!' });
        }

        try {
            _database.collection(collection).update(query, { $set: data }, function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                console.log(result);
                // you can do respond.render(view, data) here
                respond.json({
                    status: 'OK',
                    message: `update ${JSON.stringify(query)} in collection [${collection}]`,
                    data: result
                });
            });
        }
        catch (error) {
            respond.json({ 'status': 'ERROR', 'message': error });
        }
    }
}

module.exports = Database;
