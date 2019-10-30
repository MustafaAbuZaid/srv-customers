// Get dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// Get our API routes
const api = require('./server/routes/custom/api');
const customerLocal = require('./server/routes/local/customers');

let routesHandler = require('./server/routes-handler');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  if (req.headers.authorization)
    global['AccessToken'] = req.headers.authorization;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.set('images', path.join(__dirname, 'images'));
global.imagesPath = app.get('images');

new routesHandler(app);

// Set our api routes
app.use('/api/customers', customerLocal);
// Catch all other routes and return the index file
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'dist/index.html')); });
app.use('/api', api);


module.exports = app;