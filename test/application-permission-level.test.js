let expect = require('chai').expect;
let sinon = require("sinon");
let appPerLevel = require('../server/business/application-permission-level')
let appPerLevelDal = require('../server/dal/security/application-permission-level')

//prepare -> act -> expect
describe("Get All Application Permision Levels by Organization Id", function () {
    let getAllActionPermissions = sinon.stub(appPerLevelDal, 'getAllActionPermissions');
    it('should return error #4.1 if org id is null', (done) => {
        let orgId = null;
        appPerLevel.getAllActionPermissions(orgId, (err, msg) => {
            expect(msg.message).to.equal("#4.1");
            done();
        })
    });

    it('should return error #4.1 if org id is empty', (done) => {
        let orgId = '';
        appPerLevel.getAllActionPermissions(orgId, (err, msg) => {
            expect(msg.message).to.equal("#4.1");
            done();
        })
    });

    it('should get all application permissions by organization id', (done) => {
        let orgId = "4d204d53-0705-48ec-a345-f25a83866777";
        appPerLevel.getAllActionPermissions(orgId, (err, msg) => { });
        sinon.assert.calledWithMatch(getAllActionPermissions, orgId);
        done();
    });
});


describe("Get All Application Permision Levels Predefined by Organization Id", function () {
    let getAllApplicationPermissionLevelPredefined = sinon.stub(appPerLevelDal, 'getAllApplicationPermissionLevelPredefined');
    it('should return error #4.1 if org id is null', (done) => {
        let orgId = null;
        appPerLevel.getAllApplicationPermissionLevelPredefined(orgId, (err, msg) => {
            expect(msg.message).to.equal("#4.1");
            done();
        })
    });

    it("should return error if org id is empty", function (done) {
        let orgId = "";
        appPerLevel.getAllApplicationPermissionLevelPredefined(orgId, (err, msg) => {
            expect(msg.message).to.equal("#4.1");
            done();
        })
    });

    it("should return all application permision levels Predefined", function (done) {
        let orgId = "4d204d53-0705-48ec-a345-f25a83866777";
        appPerLevel.getAllApplicationPermissionLevelPredefined(orgId, (err, msg) => { });
        sinon.assert.calledWithMatch(getAllApplicationPermissionLevelPredefined, orgId);
        done();

    });
});


describe("Get System Application Permision Levels by Organization Id", function () {
    let getSystemApplicationPermissionLevel = sinon.stub(appPerLevelDal, 'getSystemApplicationPermissionLevel')
    it("should return error if org id is null", function (done) {
        let orgId = null;
        appPerLevel.getSystemApplicationPermissionLevel(orgId, (err, msg) => {
            expect(msg.message).to.equal("#4.1");
            done();
        })
    });

    it("should return error if org id is empty", function (done) {
        var orgId = "";
        appPerLevel.getSystemApplicationPermissionLevel(orgId, (err, msg) => {
            expect(msg.message).to.equal("#4.1");
            done();
        })
    });

    it("should return all system application permision levels by orgId", function (done) {
        let orgId = "4d204d53-0705-48ec-a345-f25a83866777";
        appPerLevel.getSystemApplicationPermissionLevel(orgId, (err, msg) => { });
        sinon.assert.calledWithMatch(getSystemApplicationPermissionLevel, orgId);
        done();
    });
});


//getAllActionPermissions
describe("Get All Action Permisions", function () {
   // let getAllActionPermissions = sinon.stub(appPerLevelDal,'getAllActionPermissions')
    it("should return error if isActionPermission is null", function (done) {
        var isActionPermission = null;
        appPerLevel.getAllActionPermissions(isActionPermission, (err, data) => {
            expect(err).to.be.equal(null);
            done();
        })
    });

    it("should return all action permisions", function (done) {
        var isActionPermission = true;
        appPerLevel.getAllActionPermissions(isActionPermission, (err, data) => {})
        sinon.assert.called(getAllActionPermissions);
        done();
    });
});


// var ApplicationPermissionLevel = {
//     "isShareable": false,
//     "name": "Write",
//     "displayedName": {
//         "en": "Write"
//     },
//     "description": "lblRepositoryWritePLL",
//     "permissionAction": [],
//     "id": "0a61f30b-9847-4559-9941-bd50eccaaf54",
//     "creationDate": "2018-11-11T12:29:53.592Z",
//     "isArchived": false,
//     "isSystemPermission": true,
//     "isRepositoryPermission": false,
//     "isApplicationPermission": true,
//     "organizationId": "2a72ab75-a753-42ff-8782-2de3fd04542c",
//     "assignedUsersAndGroups": [],
// }




