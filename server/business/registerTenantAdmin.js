var userDal = require("../dal/core-authentication-user");
var result = null;
var request = require("request");
var config = require('../../config/config');
const uuidOrganizationID = require('uuid');
let returnClass = require('../helper/returnClass').result


module.exports = {}