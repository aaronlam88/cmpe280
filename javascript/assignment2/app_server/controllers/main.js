var registeredUsers = [];

module.exports.loggedIn = function (req, res, next) {
    console.log("Checking if logged in:");
    if (req.session.user) {
        // Proceed if the user is logged in.
        console.log("Logged in: "); console.log(req.session.user);
        next();
    }
    else {
        console.log("Not logged in");
        res.send("You must first log in.");
    }
};

/*
 * GET home page.
 */
module.exports.index = function (req, res, next) {
    res.render('index', { title: 'Authentication Demo' });
    console.log('Cookies: ', req.cookies);
};

/*
 * GET registration page.
 */
module.exports.get_register = function (req, res) {
    res.render('register',
        { message: "Please register!" });
};

/*
 * POST registration page.
 */
module.exports.post_register = function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.status("400");
        res.send("Invalid details!");
    }
    else {
        // Create an array of users with matching usernames.
        var matches = registeredUsers.filter(function (user) {
            return user.username === req.body.username;
        });

        // If there is a match, the user has already registered.
        if (matches.length > 0) {
            res.render('register', { message: "User already registered!" });
        }

        // Register a new user.
        else {
            var newUser = {
                username: req.body.username,
                password: req.body.password
            };
            registeredUsers.push(newUser);
            console.log("New user:"); console.log(newUser);
            console.log("Registered users:"); console.log(registeredUsers);
            res.redirect('/login');
        }
    }
};

/*
 * GET login page.
 */
module.exports.get_login = function (req, res) {
    res.render('login', { message: "Please log in!" });
};

/*
 * POST login page.
 */
module.exports.post_login = function (req, res) {
    console.log("Registered users:"); console.log(registeredUsers);
    console.log("Logging in: " + req.body.username + "/" + req.body.password);

    // Create an array of users with matching credentials.
    var matches = registeredUsers.filter(function (user) {
        return (user.username === req.body.username)
            && (user.password === req.body.password);
    });

    console.log("Matching credentials: "); console.log(matches);

    if (matches.length === 0) {
        res.render('login', { message: "Invalid credentials!" });
    }
    else {
        // The user is logged in for this session.
        req.session.user = matches[0];
        console.log("Sucessfully logged in:");
        console.log(req.session.user.username);

        res.render('loggedin',
            { name: req.session.user.username });
    }
};

/*
 * GET logout page.
 */
module.exports.get_logout = function (req, res) {
    console.log("Logging out:");

    if (req.session.user) {
        var name = req.session.user.username;
        console.log(name);

        req.session.destroy(function () {
            console.log(name + " logged out.");
        });

        res.send(name + " is now logged out.");
    }
    else {
        console.log("Nobody is currently logged in!");
        res.send("Nobody is currently logged in!");
    }
};

/*
 * GET protected page.
 */
module.exports.get_protected = function (req, res) {
    res.render('protected', { name: req.session.user.username });
};