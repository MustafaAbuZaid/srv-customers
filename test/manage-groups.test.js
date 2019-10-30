let expect = require('chai').expect;
let sinon = require("sinon");
var sandbox = require('sinon');


let manageGroups = require('../server/business/manage-groups');
let manageGroupsDal = require('../server/dal/core-authentication-groups');

describe("Direct assign users groupsto a group", () => {
  let getGroupById = sinon.stub(manageGroupsDal, 'getGroupById');
  let updateGroup = sinon.stub(manageGroupsDal, 'updateGroup');
  // it('should return error #2.6.7 if group id is null', (done) => {
  //   let obj = {
  //     groupId: null,
  //     orgId: null,
  //     usersAndGroups: {
  //       objectId: 'userEmail / groupId',
  //       isUser: true
  //     }
  //   };
  //   manageGroups.directAssignUsersGroupsToAgroup(obj, (err, msg) => {
  //     expect(msg.message).to.equal("#2.6.7");
  //     done();
  //   })
  // });
  // it('should return error #2.6.7 if group id is empty', (done) => {
  //   let obj = {
  //     groupId: null,
  //     orgId: null,
  //     usersAndGroups: {
  //       objectId: 'userEmail / groupId',
  //       isUser: true
  //     }
  //   };
  //   manageGroups.directAssignUsersGroupsToAgroup(obj, (err, msg) => {
  //     expect(msg.message).to.equal("#2.6.7");
  //     done();
  //   })
  // });

  // it('should return error #4.1 if Ogranization id is null', (done) => {
  //   let obj = {
  //     groupId: 'vv',
  //     orgId: null,
  //     usersAndGroups: {
  //       objectId: 'userEmail / groupId',
  //       isUser: true
  //     }
  //   };
  //   manageGroups.directAssignUsersGroupsToAgroup(obj, (err, msg) => {
  //     expect(msg.message).to.equal("#4.1");
  //     done();
  //   })
  // });
  // it('should return error #4.1 if Ogranization id is empty', (done) => {
  //   let obj = {
  //     groupId: 'aa',
  //     orgId: '',
  //     usersAndGroups: {
  //       objectId: 'userEmail / groupId',
  //       isUser: true
  //     }
  //   };
  //   manageGroups.directAssignUsersGroupsToAgroup(obj, (err, msg) => {
  //     expect(msg.message).to.equal("#4.1");
  //     done();
  //   })
  // });
  // it('should call get get Group By Id function', (done) => {
  //   let obj = {
  //     groupId: 'aa',
  //     orgId: 'sss',
  //     usersAndGroups: {
  //       objectId: 'userEmail / groupId',
  //       isUser: true
  //     }
  //   };
  //   manageGroups.directAssignUsersGroupsToAgroup(obj, (err, msg) => { });
  //   sinon.assert.calledWithMatch(getGroupById, obj.groupId);
  //   done();
  // });
  // it('should call get update Group function', (done) => {
  //   let obj = {
  //     groupId: '26fea08e-062f-42b0-8e54-321ad1b5b34b',
  //     orgId: 'df1c3eef-b92b-45b1-a2f6-6d925e62a9f6',
  //     usersAndGroups: {
  //       objectId: 'mhmdlotfy9@gmail.com',
  //       isUser: true
  //     }
  //   };
  //   getGroupById.yields(null, {});
  //   manageGroups.directAssignUsersGroupsToAgroup(obj, (err, msg) => {});
  //   sinon.assert.calledOnce(updateGroup);
  //   done();
  // });
});


///getGroupByName ==>
describe("Get Group By Name", () => {

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    // sandbox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })

  var getGroupByName = sinon.stub(manageGroupsDal, 'getGroupByName');

  it('should return error #2.6.2 if group name is Null or Empty', (done) => {
    manageGroups.getGroupByName('', '123', (err, msg) => {
      manageGroups.getGroupByName(null, '123', (err, msg) => {
        expect(err.message).to.equal("2.6.2");
        done();
      })
    })
  })

  it('should return error #4.1 if organization ID is Null or Empty', (done) => {
    manageGroups.getGroupByName('123', '', (err, msg) => {
      manageGroups.getGroupByName('123', null, (err, msg) => {
        expect(err.message).to.equal("#4.1");
        done();
      })
    })
  })

  it('should call getGroupByName from DB With no Error ', (done) => {
    //1. Arrange
    sandbox.replace(manageGroups, 'getGroupByName', function (groupName, organizationId, cb) {
      return cb(false, null);
    });

    //2. Act
    manageGroups.getGroupByName('test', '123', (err, res) => {
      //3. Expect
      expect(err).to.false;
      expect(res).to.null;
      done();
    })
  })

});


///getGroupById ==>
describe("Get Group By Id", () => {

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  })
  afterEach(() => {
    sandbox.restore()
  })


  it('should return error #2.6.2 if group id is Null or Empty', (done) => {
    manageGroups.getGroupById('', '123', (err, msg) => {
      manageGroups.getGroupById(null, '123', (err, msg) => {
        expect(err.message).to.equal("2.6.2");
        done();
      })
    })
  })

  it('should return error #4.1 if organization ID is Null or Empty', (done) => {
    manageGroups.getGroupById('123', '', (err, msg) => {
      manageGroups.getGroupById('123', null, (err, msg) => {
        expect(err.message).to.equal("#4.1");
        done();
      })
    })
  })

  it('should call getGroupById from DB With no Error ', (done) => {
    //1. Arrange
    sandbox.replace(manageGroups, 'getGroupById', function (groupName, organizationId, cb) {
      return cb(false, null);
    });

    //2. Act
    manageGroups.getGroupById('test', '123', (err, res) => {
      //3. Expect
      expect(err).to.false;
      expect(res).to.null;
      done();
    })
  })

});


///getAllSystemAndCustomGroups ==>
describe("get All System And Custom Groups By organization Id", () => {

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('should return error #4.1 if organization ID is Null or Empty', (done) => {
    manageGroups.getAllSystemAndCustomGroups(null, (err, msg) => {
      manageGroups.getAllSystemAndCustomGroups('', (err, msg) => {
        expect(err.message).to.equal("#4.1");
        done();
      })
    })
  })

  it('should call getAllSystemAndCustomGroups from DB With no Error ', (done) => {
    //1. Arrange
    sandbox.replace(manageGroups, 'getAllSystemAndCustomGroups', function (organizationId, cb) {
      return cb(false, null);
    });

    //2. Act
    manageGroups.getAllSystemAndCustomGroups('123', (err, res) => {
      //3. Expect
      expect(err).to.false;
      expect(res).to.null;
      done();
    })
  })

})


///getGroupsByListOfName ==>
describe("Get Groups By List Of Names and organization id", () => {

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should return error #2.6.2 if groups names is Null or length not zero', (done) => {
    manageGroups.getGroupsByListOfName([], '123', (err, msg) => {
      manageGroups.getGroupsByListOfName(null, '123', (err, msg) => {
        expect(err.message).to.equal("2.6.2");
        done();
      })
    })
  })

  it('should return error #4.1 if organization ID is Null or Empty', (done) => {
    manageGroups.getGroupsByListOfName(['test'], '', (err, msg) => {
      manageGroups.getGroupsByListOfName(['test'], null, (err, msg) => {
        expect(err.message).to.equal("#4.1");
        done();
      })
    })
  })

  it('should call getGroupsByListOfName from DB With no Error ', (done) => {
    //1. Arrange
    sandbox.replace(manageGroups, 'getGroupsByListOfName', function (groupName, organizationId, cb) {
      return cb(false, null);
    });

    //2. Act
    manageGroups.getGroupsByListOfName(['test'], '123', (err, res) => {
      //3. Expect
      expect(err).to.false;
      expect(res).to.null;
      done();
    })
  })

});

///getAllGroups ==>
describe("get All Groups By organization Id", () => {

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('should return error #4.1 if organization ID is Null or Empty', (done) => {
    manageGroups.getAllGroups(null, (err, msg) => {
      manageGroups.getAllGroups('', (err, msg) => {
        expect(err.message).to.equal("#4.1");
        done();
      })
    })
  })

  it('should call getAllGroups from DB With no Error ', (done) => {
    //1. Arrange
    sandbox.replace(manageGroups, 'getAllGroups', function (organizationId, cb) {
      return cb(false, null);
    });

    //2. Act
    manageGroups.getAllGroups('123', (err, res) => {
      //3. Expect
      expect(err).to.false;
      expect(res).to.null;
      done();
    })
  })

})
