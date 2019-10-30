var middleWareBll = require('../server/oAuth/lisence-control-middleWare')
var cache = require('../server/cache')
let expect = require('chai').expect;
let sinon = require("sinon");

describe("Check license control validations", () => {
    let getAllOrganizationsIDAsync = sinon.stub(cache, 'getAllOrganizationsIDAsync');
    // it('should check license control values', (done) => {
    //     //     licenseControlBll.decryptHumanKey();
    //     //     sinon.assert.calledOnce(getEncryptedHumanKey);
    //          done();
    // });
});