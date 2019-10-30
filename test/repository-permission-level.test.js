let expect = require('chai').expect;
let sinon = require("sinon");
let repositoryPermissionBll = require('../server/business/repository-permission-level');
let repositoryPermissionDal = require('../server/dal/security/repository-permission-level');
let permissionMapDal = require('../server/dal/permissionLevel');


describe("Get All Repository Permision Levels by Organization Id", () => {
    let getPermissionById = sinon.stub(repositoryPermissionDal, 'getAllRepositoryPermissionLevel');
    it('should return error #4.1 if org id is null', (done) => {
        let orgId = null;
        repositoryPermissionBll.getAllRepositoryPermissionLevel(orgId, (err, msg) => {
            expect(msg.message).to.equal("#4.1");
            done();
        })
    });

    it('should return error #4.1 if org id is empty', (done) => {
        let orgId = '';
        repositoryPermissionBll.getAllRepositoryPermissionLevel(orgId, (err, msg) => {
            expect(msg.message).to.equal("#4.1");
            done();
        })
    });

    it('should get all permissions by organization id', (done) => {
        let orgId = "4d204d53-0705-48ec-a345-f25a83866777";
        repositoryPermissionBll.getAllRepositoryPermissionLevel(orgId, (err, msg)=>{});
            sinon.assert.calledWithMatch(getPermissionById, orgId);
            done();
    });
});


describe("Get All Repository Permision Levels without permissions by Organization Id", () => {
    let getPermissionByIdWithoutPermission = sinon.stub(repositoryPermissionDal, 'getSystemAndAllRepositoryPermissionLevel');
    it('should return error #4.1 if org id is null', (done) => {
        let orgId = null;
        repositoryPermissionBll.getAllRepositoryPermissionLevelWithoutPermissions(orgId, (err, msg) => {
            expect(msg.message).to.equal("#4.1");
            done();
        })
    });

    it('should return error #4.1 if org id is empty', (done) => {
        let orgId = '';
        repositoryPermissionBll.getAllRepositoryPermissionLevelWithoutPermissions(orgId, (err, msg) => {
            expect(msg.message).to.equal("#4.1");
            done();
        })
    });

    it('should get all permissions without permissions by organization id', (done) => {
        let orgId = "4d204d53-0705-48ec-a345-f25a83866777";
        repositoryPermissionBll.getAllRepositoryPermissionLevelWithoutPermissions(orgId, (err, msg)=>{});
            sinon.assert.calledWithMatch(getPermissionByIdWithoutPermission, orgId);
            done();
    });
});


describe("Get All System Repository Permission Level by Organization Id", () => {
    let getSystemRepositoryPermissionLevel = sinon.stub(repositoryPermissionDal, 'getSystemRepositoryPermissionLevel');
    it('should return error #4.1 if org id is null', (done) => {
        let orgId = null;
        repositoryPermissionBll.getSystemRepositoryPermissionLevel(orgId, (err, msg) => {
            expect(msg.message).to.equal("#4.1");
            done();
        })
    });

    it('should return error #4.1 if org id is empty', (done) => {
        let orgId = '';
        repositoryPermissionBll.getSystemRepositoryPermissionLevel(orgId, (err, msg) => {
            expect(msg.message).to.equal("#4.1");
            done();
        })
    });

    it('should get all system permissions by organization id', (done) => {
        let orgId = "4d204d53-0705-48ec-a345-f25a83866777";
        repositoryPermissionBll.getSystemRepositoryPermissionLevel(orgId, (err, msg)=>{});
            sinon.assert.calledWithMatch(getSystemRepositoryPermissionLevel, orgId);
            done();
    });
});

describe("Get All Repository Permission Level by Action Id", () => {
    let getAllRepositoryPermissionLevelByPermissionIds = sinon.stub(repositoryPermissionDal, 'getAllRepositoryPermissionLevelByPermissionIds');
    let getPermissionsByActionId = sinon.stub(permissionMapDal, 'getPermissionsByActionId'); 
    it('should return error #4.1 if action id is null', (done) => {
        let orgId = null;
        let actionId = null;
        repositoryPermissionBll.getAllRepositoryPermissionLevelsByActionId(orgId, actionId, (err, msg) => {
            expect(msg.message).to.equal("#4.1");
            done();
        })
    });

    it('should return error #4.1 if action id is empty', (done) => {
        let orgId = "";
        let actionId = "";
        repositoryPermissionBll.getAllRepositoryPermissionLevelsByActionId(orgId, actionId, (err, msg) => {
            expect(msg.message).to.equal("#4.1");
            done();
        })
    });

    //TO BE CONTINUED
    it('should get all repository permissions by action id', (done) => {
        let orgId = "4d204d53-0705-48ec-a345-f25a83866777";
        let actionId = "4d204d53-0705-48ec-a345-f25a83866777";
        repositoryPermissionBll.getAllRepositoryPermissionLevelsByActionId(orgId, actionId, (err, msg)=>{});
            sinon.assert.calledWithMatch(getPermissionsByActionId, actionId);
            //sinon.assert.calledWithMatch(getAllRepositoryPermissionLevelByPermissionIds, orgId);
            done();
    });


    it('should get all repository permissions by action id', (done) => {
        let orgId = "4d204d53-0705-48ec-a345-f25a83866777";
        let actionId = "4d204d53-0705-48ec-a345-f25a83866777";
        repositoryPermissionBll.getAllRepositoryPermissionLevelsByActionId(orgId, actionId, (err, msg)=>{});
            //sinon.assert.calledWithMatch(getPermissionsByActionId, actionId);
            sinon.assert.calledWithMatch(getAllRepositoryPermissionLevelByPermissionIds, orgId);
            done();
    });
});