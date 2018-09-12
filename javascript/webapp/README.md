# Requirements
## npm & node
NPM and Node.js is required
Do `$ npm --version` to check for npm version (6.4.0)
Do `$ node --version` to check for node.js version (v10.5.0)
### Install npm and node.js for Mac
Install using brew `$ brew install node`

## webpack
This program need Webpack to bundle and serve the application
Do `$ webpack --version` to check for webpack version (4.16.4)
### Install webpack with npm
To install Webpack globally `$ npm install -g webpack webpack-cli`

## dependancies
To install dependancies `$ npm install`

## run
`$ npm start`

# For Developers
## To change port
You can change the port that the server run on by modify webpack.config.js->devServer.port

## To install new npm package
If package is used by components `$ npm install --save package-name`
If package is used by dev service `$npm install --save-dev package-name`

# Version v0.1
You will need to run `npm install`
The side now has 3 "pages": home, about, contact
Contact will require login to view
Just a proof of concept