/**
 * @module LoginToPlatform
 */
var userDal = require("../dal/core-authentication-user");
var result = null;
let userUtil = require('../dal/utils/core-authentication-user-util');
let returnClass = require('../helper/returnClass').result;
module.exports = {
  /**  Login to platform function which allows user to login
   * @method LoginToPlatform
   * @param {string} email -the email of the user to login
   * @param {string} password -the password of the user to login
   * @returns {Error} Error -object of type error is returned in case of failure
   * @returns {Data} message -Message contains the error specification
  */
  LoginToPlatform: function (userLogin, callback, userInfo) {
    result = null;
    //userLogin = new userDal.User(userLogin);
    // login validation for user email and password
    // 1- check user email validation
    userLogin.email = userLogin.email.toLowerCase();
    var validEmail = emailValidator.validate(userLogin.email);
    if (!validEmail) {
      //result = new Error("Invalid Email");
      return callback(new returnClass(new Error("#2.9.2"), null));
    }
    // 2- check user password validation
    if (userLogin.password.length == 0 || userLogin.password == "") {
      // result = new Error("Invalid password");

      return callback(new returnClass(new Error("#2.9.5"), null));
    }
  },
  getUser: function (user, callback, userInfo) {
    result = null;
    userDal.FindEmail(user, (data) => {
      if (data.error) {
        return callback(data);
      } else {
        if (data.data) delete data.data.latestNotifications;
        return callback(data);
      }
    }, userInfo)
  },
  findUserAsync: async (username, userInfo) => {
    let getUser = await userUtil.findByEmail(username.toLowerCase(), userInfo);
    return (getUser);
  },
  logoOut: function (user, callback, userInfo) {
    result = null;
    userDal.FindEmail(user, function (data) {
      if (data.error)
        return callback(data);
      else {
        refreshTokenDAl.DeleteRefreshTokenByUserId(user.email, function (result) {

          return callback(result);

        }, userInfo);
      }
    }, userInfo)
  }
}
