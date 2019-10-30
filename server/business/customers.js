let customersDal = require('../dal/customers');
module.exports = {
    getAll(callback) {
        customersDal.getAllCustomers(
            (data) => {
                return callback(data);
            });
    },
    register: function (customer, callback) {
        //server validation
        var data = customer;
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        data.customername = data.customername.toLowerCase();
        var validLength = data.password.length >= 6;
        var validText = !format.test(data.password);
        if (validLength && validText)
            customersDal.add(data).then(
                (data) => {
                    return callback(data);
                });
        else
            return callback(new returnClass(new Error("Not valid data"), null));

    },
    delete: function (customer, callback) {
        customersDal.delete(customer.customername,
            (data) => {
                return callback(data);
            });
    },
    login: function (customer, callback) {
        var data = customer;
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        data.customername = data.customername.toLowerCase();
        var validLength = data.password.length >= 6;
        var validText = !format.test(data.password);
        if (validLength && validText)
            customersDal.findByCustomerAndPassword(customer.customername, customer.password,
                (data, err) => {
                    if (err) { return callback(err) }
                    else {
                        return callback(data);

                    }
                });
        else
            return callback("Not valid account");
    },
}