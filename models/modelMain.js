/*
 * GET user list page.
 */
module.exports.get_userlist = function(req, res) 
{
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, 
                    function(err, docs)
                    {
                        res.render('userlist', { "userlist" : docs });
                    });
};

/*
 * GET show user page.
 */
module.exports.get_showuser = function(req, res) 
{
    var uname = req.params.username;
    var db = req.db;
    var collection = db.get('usercollection');
    
    collection.find( { username : uname }, 
                     function(err, doc) 
                     {
                         if (err) {
                             res.send("Find failed.");
                         }
                         else {
                             res.render('showuser', 
                                        { title: 'Show User: ' + uname,
                                          mail: doc[0].email })
                         }
                     });
};

/*
 * POST add user page.
 */
module.exports.post_adduser = function(req, res) 
{
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes.
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection.
    var collection = db.get('usercollection');

    // Submit to the database.
    collection.insert( { "username" : userName,
                         "email" : userEmail },
                       function (err, doc) 
                       {
                           if (err) {
                               res.send("Insert failed.");
                           }
                           else {
                               // Forward to success page
                               res.redirect("userlist");
                           }
                       });
};

/*
 * POST delete user page.
 */
module.exports.post_deleteuser = function(req, res) 
{
    var uname = req.params.username;
    var db = req.db;
    var collection = db.get('usercollection');

    // Submit to the database.
    collection.remove( { "username" : uname },
                       function (err, doc) 
                       {
                           if (err) {
                               res.send("Delete failed.");
                           }
                           else {
                               res.send("Successfully deleted " + uname);
                           }
                       });
};