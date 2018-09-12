var express = require('express');
var router = express.Router();
var ctrlMain = require("../controllers/main");

/*
 * GET home page.
 */
router.get('/', ctrlMain.index);

/*
 * GET registration page.
 */
router.get('/register', ctrlMain.get_register);

/*
 * POST registration page.
 */
router.post('/register', ctrlMain.post_register);

/*
 * GET login page.
 */
router.get('/login', ctrlMain.get_login);

/*
 * POST login page.
 */
router.post('/login', ctrlMain.post_login);

/*
 * GET logout page.
 */
router.get('/logout', ctrlMain.get_logout);

/*
 * GET protected page.
 */
router.get('/protected', ctrlMain.loggedIn, ctrlMain.get_protected);

module.exports = router;