let expect = require('chai').expect;
let sinon = require("sinon");
let licenseControlDal = require('../server/dal/license-control');
let licenseControlBll = require('../server/business/license-control');


describe("Get license control validations", () => {
    let getEncryptedHumanKey = sinon.stub(licenseControlDal, 'getEncryptedHumanKey');
    it('should get license control values', (done) => {
        licenseControlBll.decryptHumanKey();
        sinon.assert.calledOnce(getEncryptedHumanKey);
        done();
    });
});