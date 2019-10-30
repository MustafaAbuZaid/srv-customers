var config = require('../../db/mongoose-db-context');
var OrganizationDetailsDBModel = require('../../db/models/organization-details')
let returnClass = require('../../helper/returnClass').result;
var organization_details = function () { };

organization_details.getOrganizationDetails = function (tanentObject, callback) {
  config.getTenantConnection(tanentObject, function (err, dbConn) {
    OrganizationDetailsDBModel.BindModel(dbConn, function (Model) {
      Model.findOne({}, function (err, organization_detailObj) {
        if (err) {
          return callback(new returnClass(err, null));
        }
        return callback(new returnClass(null, organization_detailObj.toObject()));
      });
    });
  });
};

organization_details.getOrganizationDetailsJson = function (tanentObject, callback) {
  config.getTenantConnection(tanentObject, function (err, dbConn) {
    OrganizationDetailsDBModel.BindModel(dbConn, function (Model) {
      Model.findOne({}, function (err, organization_detailObj) {
        if (err) {
          return callback(new returnClass(err, null));
        }
        return callback(new returnClass(null, organization_detailObj.toObject()));
      });
    });
  });
};

organization_details.getOrganizationDetailsJsonAsync =  (tanentObject) => {
  return new Promise((resolve, reject) => {
    try {
      config.getTenantConnection(tanentObject, function (err, dbConn) {
        OrganizationDetailsDBModel.BindModel(dbConn, function (Model) {
          Model.findOne({}, function (err, organization_detailObj) {
            resolve(new returnClass(err, organization_detailObj.toObject()));
          });
        });
      });
    } catch (error) {
      reject(new returnClass(error, null));
    }

  });

}



organization_details.saveOrganizationDetails = function (tanentObject, organizationObject, callback) {
  config.getTenantConnection(tanentObject, function (err, dbConn) {
    OrganizationDetailsDBModel.BindModel(dbConn, function (Model) {
      if (organizationObject.logoUpdated || organizationObject.logoUpdated == 'true') {
        Model.findOneAndUpdate({ id: organizationObject.id }, {
          $set:
          {
            companyName: organizationObject.companyName,
            companyLogoUrl: organizationObject.companyLogoUrl
          }
        }, { new: true }, function (err, result) {
          if (err) {
            return callback(new returnClass(err, null));
          }
          return callback(new returnClass(null, result));
        });
      } else {

        Model.findOneAndUpdate({ id: organizationObject.id }, {
          $set:
          {
            companyName: organizationObject.companyName
          }
        }, { new: true }, function (err, result) {
          if (err) {
            return callback(new returnClass(err, null));
          }
          return callback(new returnClass(null, result));
        });
      }
    });
  });
};

module.exports = organization_details;