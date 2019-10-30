var config = require('../mongoose-db-context');

let CustomerModel


var Schema = config.Schema;

let CustomerSchema = new Schema({
  firstName: {
    type: String,
    //required: true
  },
  lastName: {
    type: String,
    //  required: true
  },
  password: {
    type: String
  },
  customername: {
    type: String,
    // required: true
  },
  id: { type: Number }

});


BindModel = (callback) => {
  config.authDB(mongoose => {
    CustomerModel = mongoose.model('customers',
      CustomerSchema,
      'customers');
    return callback(CustomerModel);
  });

}


module.exports = BindModel;
