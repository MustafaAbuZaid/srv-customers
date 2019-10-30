const BindModel = require('../db/models/customers');
const returnClass = require('../helper/returnClass').result;
module.exports = {

  getAllCustomers: (callback) => {
    BindModel(customerModel => {
      customerModel.find({},
        function (err, result) {
          if (err) {
            return callback(new returnClass(err, null));
          }
          return callback(new returnClass(null, result.map(a => a.toObject())));
        });
    });
  },
  add: (user) => {
    return new Promise((resolve, reject) => {
      BindModel(customerModel => {

        var newUser = customerModel(user)
        newUser.save(
          (err, res) => {
            if (err) {
              resolve(new returnClass(err, null));
            }
            resolve(new returnClass(null, res));
          });
      });
    });

  },
  findByCustomerAndPassword: (customername, password, callback) => {
    return new Promise((resolve, reject) => {
      BindModel(customerModel => {

        customerModel.findOne({
          customername: customername,
          password: password
        },
          (err, res) => {
            if (err) {
              return callback(new returnClass(err, null));
            }
            else
              if (res) {
                return callback(new returnClass(null, res.toObject()));
              }
              else
                return callback(new returnClass(err, null));
          });
      });
    });
  },
  delete: (customername) => {
    BindModel(customerModel => {

      customerModel.remove({
        customername: customername
      }, (err, res) => {
        if (err) {
          return callback(new returnClass(err, null));
        }
        return callback(new returnClass(null, res));
      });
    });
  },
}


