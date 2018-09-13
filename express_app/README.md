Team: WebKeepers
Aaron Lam (008841625)
Fan Wu (012425660)
Jiehan Yao (011938706)
Qiyue Zhang (012550096)

# Requirements
This program is tested under the following conditions. If your environment is different, please use Google for help with errors
```
node --version ## v10.5.0
npm --version ## 6.4.0
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
npm run devinstall
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
├── node_modules
│   └── ...
├── package-lock.json
├── package.json
├── public
│   ├── checkbox.html
│   └── styles
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
- bin/www is the starting point for this app--> For catching error
- app.js is the entry point for this app
- routes/ handle routing endpoint and routing logic. Each JS file will attach to 1 endpoint and handle the routing logic for that endpoint. Avoid using a single route file to avoid git conflict/error, and make collaboration easier.
- views/ contain all the template files to render a webpage for an endpoint. Pug is used because Jade is now Pug.
- public/ contain CSS style and static pages

# Credit
This web app uses a CSS template from [https://templated.co/]
