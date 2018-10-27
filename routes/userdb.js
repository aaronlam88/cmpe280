var express = require('express');
var router = express.Router();
var ctrlMain  = require("../controllers/client/cntrlMain");
var modelMain = require("../models/modelMain");

console.log("Router:"); console.log(router);

/*
 * GET home page.
 */

router.get('/', function (req, res, next) {
    res.render('ctrMain.home');
});

/*
 * GET user list page.
 */
router.get('/userlist', function (req, res, next) {
    res.render('modelMain.get_userlist');
});
/*
 * GET new user page.
 */
router.get('/newuser', function (req, res, next) {
    res.render('ctrlMain.get_newuser');
});

/*
 * POST add user page.
 */
router.post('/adduser', function (req, res) {
    res.render('modelMain.post_adduser');
});
/*
 * GET show user page.
 */
router.get('/userlist/:username', function (req, res, next) {
    res.render('modelMain.get_showuser');
});
/*
 * GET delete user page.
 */
router.get('/deleteuser/:username', function (req, res, next) {
    res.render('ctrlMain.get_deleteuser');
});
/*
 * POST delete user page.
 */
router.post('/deleteuser/:username', function (req, res) {
    res.render('modelMain.post_deleteuser');
});

module.exports = router;