var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
var config = require('../../config/config');



var mongoMasterUri = "mongodb://"+ config.get('db').server + ":" + config.get('db').port + "/" + config.get('db').authDb;


console.log(mongoMasterUri, 'master connection');
var mongoMasterConnection;

function authConnectionWithRetry(callback) {
  if (mongoMasterConnection)
    return callback(mongoMasterConnection);

  mongoose.createConnection(mongoMasterUri, {
    useNewUrlParser: true
  }).then(connection => {
    mongoMasterConnection = connection;
    return authConnectionWithRetry(callback);
  }).catch(err => {
    setTimeout(() => {
      console.log('Error while connecting to database , Retrying again');
      authConnectionWithRetry(callback);
    }, 10000);
  });
}


var TenantsConnections = {};

//Get the default connection
var db = mongoose.connection;
mongoose.Promise = global.Promise;


var Schema = mongoose.Schema;

var getTenantConnection = function (tannentObj, callback) {
  if (TenantsConnections[tannentObj.organizationID]) {
    if (TenantsConnections[tannentObj.organizationID].readyState == 1)
      return callback(false, TenantsConnections[tannentObj.organizationID]);
  }
}

module.exports = {
  mongoose,
  authDB: (callback) => {
    authConnectionWithRetry((conn) => {
      return callback(conn);
    })
  },
  getTenantConnection,
  Schema
};
