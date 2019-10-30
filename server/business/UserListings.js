var core_authentication_user = require('../dal/core-authentication-user');
var AD = require("../AD/AD");
let returnClass = require('../helper/returnClass').result;
var config = require('../../config/config');
var manage_groups = require('./manage-groups')
module.exports = {
  getUsers: function (data, callback, userInfo) {
    var _organizationID = data._organizationID;
    var _action = data._action;
    var _indexLetter = data._indexLetter;
    var _pageNumber = data._pageNumber;

    if (_action == "view") {
      core_authentication_user.getOrganizationUsers(_organizationID, _pageNumber, function (results) {
        return callback(results);
      }, userInfo);
    } else if (_action == "filter") {
      core_authentication_user.getOrganizationUsersFiltered(_organizationID, _pageNumber, _indexLetter, function (results) {
        return callback(results);
      }, userInfo);
    }

  },
  searchTennantUsers: function (organizationId, userString, selectedUsers, limit, callback, userInfo) {
    if (organizationId == null || organizationId == '') {
      return callback(new returnClass(new Error("#4.1"), null));
    }

    if (userString == null || userString == '') {
      return callback(new returnClass(new Error("#16.1.1"), null));
    }
    if (limit == null || limit == '') {
      return callback(new returnClass(new Error("#16.1.2"), null));
    }
    let data = {
      organizationId: organizationId,
      userString: userString,
      selectedUsers: selectedUsers,
      resultLimit: limit
    }
    if (config.get('ad').is_ad_env === true) {
      arrayUsers = []
      AD.getAllUsers(users => {
        if (users.error) {
          return callback(users);
        }
        for (let index = 0; index < users.data.length; index++) {
          const element = users.data[index];
          obj = {
            "email": element.userPrincipalName,
            "isDeleted": false,
            "isUser": true,
          }
          if (selectedUsers.length > 0) {
            if (element.userPrincipalName.toLowerCase() != selectedUsers[0].toLowerCase()) {

              arrayUsers.push(obj)
            }
          } else {
            arrayUsers.push(obj)
          }
        }

        AD.getAllGroups(groups => {
          if (groups.error) {
            return callback(groups)
          }
          for (let indexs = 0; indexs < groups.data.length; indexs++) {
            const elements = groups.data[indexs];
            obj = {
              "email": elements.cn,
              "isDeleted": false,
              "isUser": false,
            }
            arrayUsers.push(obj)

          }
          let filteredArray = arrayUsers.filter(a => a.email.toLowerCase().indexOf(userString.toLowerCase()) != -1)
          return callback(null, filteredArray);
        }, userInfo)
      }, userInfo)
    }
    else {
      core_authentication_user.searchTennantUsers(data, function (results) {
        if (results.error) {
          return callback(results);
        }
        else {
          arrayUsers = []
          results = results.data
          for (let index = 0; index < results.length; index++) {
            const element = results[index];
            obj = {
              "email": element.email,
              "isDeleted": false,
              "isUser": true,
            }
            if (selectedUsers.length > 0) {
              if (element.email.toLowerCase() != selectedUsers[0].toLowerCase()) {

                arrayUsers.push(obj)
              }
            } else {
              arrayUsers.push(obj)
            }
          }
          results = arrayUsers.filter(a => a.email.toLowerCase().indexOf(userString.toLowerCase()) != -1)
        }

        manage_groups.getAllGroups(organizationId, function (resultsGroups,erro) {
          if (erro) {
            return callback(err, err);
          } else {
            for (let indexs = 0; indexs < resultsGroups.length; indexs++) {
              const elements = resultsGroups[indexs];
              obj = {
                "email": elements.name,
                "isDeleted": false,
                "isUser": false,
              }
              arrayUsers.push(obj)
            }
          }
          results = arrayUsers.filter(a => a.email.toLowerCase().indexOf(userString.toLowerCase()) != -1)
          // for (let indexs = 0; indexs < resultsGroups.length; indexs++) {
          //   const elements = resultsGroups[indexs];
          //   results.push(elements)
          // }

          return callback(new returnClass(null, results));
        }, userInfo)
      }, userInfo);
    }
  },

  useresSearchActiveAndNotActive: (organizationId, userString, selectedUsers, selectedGroupsToShareWith, limit, callback, userInfo) => {



    if (organizationId == null || organizationId == '') {
      return callback(new returnClass(new Error("#4.1"), null));
    }

    if (userString == null || userString == '') {
      return callback(new returnClass(new Error("#16.1.1"), null));
    }

    if (limit == null || limit == '') {
      return callback(new returnClass(new Error("#16.1.2"), null));
    }
    let data = {
      organizationId: organizationId,
      userString: userString,
      selectedUsers: selectedUsers,
      resultLimit: limit
    }


    if (config.get('ad').is_ad_env === true) {
      arrayUsers = []
      AD.getAllUsersContains(userString, users => {
        if (users.data != null) {
          for (let index = 0; index < users.data.length; index++) {
            const element = users.data[index];
            if (element.userPrincipalName.toLowerCase() != selectedUsers[0].toLowerCase()) {

              obj = {
                "email": element.userPrincipalName,
                "isDeleted": false,
                "isUser": true,
              }

              arrayUsers.push(obj)
            }
          }
        }

        AD.getAllGroupsContains(userString, groups => {

          if (groups.data != null) {
            for (let indexs = 0; indexs < groups.data.length; indexs++) {
              const elements = groups.data[indexs];
              // objgroup = filterGroups.find(a => a.name == elements.cn)

              obj = {
                "email": elements.cn,
                "isDeleted": false,
                "isUser": false,
              }
              arrayUsers.push(obj)

            }
          }


          if (arrayUsers.length > 0) {
            if (selectedUsers.length > 0) {
              for (let index = 0; index < arrayUsers.length; index++) {
                let i = selectedUsers.find(a => a === arrayUsers[index].email.toLowerCase());
                if (i != undefined) {
                  arrayUsers.splice(index, 1);
                }

              }
            }
          }

          if (arrayUsers.length > 0) {
            if (selectedGroupsToShareWith.length > 0) {
              for (let index = 0; index < arrayUsers.length; index++) {
                let i = selectedGroupsToShareWith.find(a => a === arrayUsers[index].email.toLowerCase());
                if (i != undefined) {
                  arrayUsers.splice(index, 1);
                }

              }
            }
          }


          return callback(new returnClass(null, arrayUsers));
        }, userInfo)
      }, userInfo)
    }
    else {

      core_authentication_user.useresSearchActiveAndNotActive(data, (results) => {
        if (results.error) {
          return callback(results);
        }
        manage_groups.getAllGroups(organizationId, (resultsGroups) => {
          if (resultsGroups.error) {
            return callback(resultsGroups);
          }
          for (let indexs = 0; indexs < resultsGroups.data.length; indexs++) {
            const elements = resultsGroups.data[indexs];
            results.data.push(elements)
          }

          if (results.data.length > 0) {
            for (let index = 0; index < results.data.length; index++) {
              let i = selectedGroupsToShareWith.find(a => a === results.data[index].id);
              if (i != undefined) {
                results.data.splice(index, 1);
              }

            }

            for (let index = 0; index < results.data.length; index++) {
              let i = selectedGroupsToShareWith.find(a => a === results.data[index].name);
              if (i != undefined) {
                results.data.splice(index, 1);
              }

            }

          }
          results.data = results.data.filter(a => a.status != "Deactivated")
          return callback(results);
        }, userInfo)
      }, userInfo);
    }
  },


  getUser: function (email, callback, userInfo) {
    if (email == null || email == '') {
      //return callback(new Error("Invalid email"), null);
      return callback(new returnClass(new Error("#16.1.3"), null));
    }
    var user = { email: email }
    core_authentication_user.FindEmail(user, function (results) {
      return callback(results);
    }, userInfo);
  },

  getAllOrganizationUsers: function (organizationID, callback, userInfo) {
    if (organizationID == null || organizationID == '') {
      return callback(new returnClass(new Error("#4.1"), null));
    }
    core_authentication_user.getAllOrganizationUsers(organizationID, function (results) {
      return callback(results);
    }, userInfo);
  },

  // get number of active and invited users
  getNumberOfActiveAndInvitedUsers: async (organizationID, userInfo) => {
    if (organizationID == null || organizationID == '') {
      return returnClass(null, null);
    }
    let results = await core_authentication_user.getNumberOfActiveAndInvitedUsers(organizationID, userInfo);
    return results;

  }
}
