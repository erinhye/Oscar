

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');
// const configg = require('./config');
// const nconf = require('nconf');
const http = require('http');


mongoose.Promise = global.Promise;
var mongoDB = mongoose.connect(config.db, {
  useMongoClient: true
});
mongoDB
.then(function (db) {
  console.log('mongodb has been connected');
})
.catch(function (err) {
  console.log('error while trying to connect with mongodb');
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();

module.exports = require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
