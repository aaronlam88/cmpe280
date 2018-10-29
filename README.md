# Team __WebKeepers__
* Aaron Lam (008841625)
* Fan Wu (012425660)
* Jiehan Yao (011938706)
* Qiyue Zhang (012550096)

# Git Repository
[https://github.com/aaronlam88/cmpe280]

# Website
[http://54.176.230.26:3000/]

# Versions
## Assignment 5
* __Branch:__ assignment5 (git checkout assignment5)
* __Feature:__
    * Update package.json --> add mongodb and monk npm packages
    * Clean up code for unused features from Assignment4
    * Add MongoDB feature (/mongodb)
        * Allow user to do insert/find/remove/update on mongodb using web interface
## Assignment 4
* __Branch:__ assignment4 (git checkout assignment4)
* __Feature:__
    * Update package.json --> use npx to run nodemon (use local nodemon instead of global, make `npm run devinstall` optional)
    * Bug fix for login/logout, register
    * Add demo from jquery-ui
        * Draggable
        * Resize
    * Add demo from jquery
        * jquery get request from backend (/dashboard)
## Assignment 3
* __Branch:__ assignment3 (git checkout assignment3)
* __Feature:__ 
    * Add client-side JavaScript form validation (/register)
    * Add client-side JavaScript canvas animation (/clock, /home)
## Assignment 2
* __Branch:__ assignment2 (git checkout assignment2)
* __Feature:__
    * Initial project setup
    * Prototype with register, login, search features (/register, /profile, /search)

# Requirements
This program is tested under the following conditions. If your environment is different, please use Google for help with errors
```
node --version ## v10.5.0
npm --version ## 6.4.0
## OS macOS High Sierra
```
# For Normal User
## Install
```
npm install
```
## Run
```
npm start
```

# For Developer
## Install
```
npm install
```

## To run with hot reload
```
npm run devstart
```

## To run without hot reload
```
npm start
```

# Web app
The web app will run on port 3000 or your process.env.PORT. To access the web app, go to [localhost:3000]

# Note
For demo purpose: username and password are stored as plain text under json_objects/users.json. This practice is not recommended and highly discouraged
Some page will return an error (ex. 404) and error stack. This is intentional. This is used to test error handling as well as help to debug error during development parse. Printing error stack on the return should be disabled in production.

# App Structure
```
express_app/
├── README.md
├── app.js
├── bin
│   └── www
├── json_objects
│   └── users.json
├── models
│   ├── Database.js
│   └── template.js
├── node_modules
│   └── ...
├── package-lock.json
├── package.json
├── public
│   ├── checkbox.html
│   └── styles
├── controllers
│   ├── client
│   │   └── common
│   │       └── app.js
│   └── server
├── routes
│   ├── about.js
│   ├── checkbox.js
│   ├── demo.js
│   ├── index.js
│   ├── logout.js
│   ├── profile.js
│   ├── register.js
│   ├── search.js
│   └── users.js
└── views
    ├── about.pug
    ├── checkbox.pug
    ├── error.pug
    ├── index.pug
    ├── layout.pug
    ├── login.pug
    ├── postcheck.pug
    ├── profile.pug
    ├── register.pug
    └── search.pug
```
- __bin/www__ is the starting point for this app
- __app.js__ is the entry point for this app
- __routes/__ handle routing endpoint and routing logic. Each JS file will attach to 1 endpoint and handle the routing logic for that endpoint. Avoid using a single route file to avoid git conflict/error, and make collaboration easier.
- __controllers/client/__ contain all the JavaScript files for front-end, **this directory is _PUBLIC_**
- __controllers/client/common__ contain all common JavaScript librarys for client side, **this directory is _PUBLIC_**
- __controllers/server/__ contain all the JavaScript files for back-end
- __views/__ contain all the template files to render a webpage for an endpoint. Pug is used because Jade is now Pug.
- __public/__ contain CSS style and static pages, **this directory is _PUBLIC_**
- __models/__ contain models for database

# Credit
This web app uses a CSS template from [https://templated.co/]
