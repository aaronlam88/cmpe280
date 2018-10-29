"use strict";

// json to db
var express = require('express');
var router = express.Router();
var Database = require('../models/Database');
var users = require('../json_objects/mockUsers.json');
var db = new Database();

for (a in users) {
    console.log(a);
}
