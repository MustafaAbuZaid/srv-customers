var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;

var DbContext = {

};

DbContext.createCon = function (url, callback) {
  mongoClient.connect(url, function (err, db) {
    if (!err) {
      callback(db);
    }
  });
};

module.exports = DbContext;
