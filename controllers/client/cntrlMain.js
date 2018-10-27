"use strict";
var cntrlMain = (function () {
/*
 * GET home page.
 */
    function home(req, res){
        res.render('indexdb', { "title": 'MongoDB-Express Demo' });
    };


/*
 * GET new user page.
 */
    function get_newuser(req, res){
        res.render('newuser', { "title": 'Add New User' });
    };

/*
 * GET delete user page.
 */
    function get_deleteuser(req, res){
        var uname = req.params.username;
        res.render('deleteuser', { "username" : uname} );
    }; 
})();