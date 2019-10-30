var expect = require('chai').expect;
var sinon = require("sinon")
var bll = require("../../../server/business/UserListings")
var userDal = require("../../../server/dal/core-authentication-user");
var AD = require('../../AD/AD');


describe("User Listings", function () {

  describe("getUsers", function () {
    it('Should return an error if there are no parameters passed', () => {
      bll.getUsers(data, (err, msg) => {
        expect(err.message).to.contain("Parameter is not passed");
      })
      done();

    })
    it('Should return an error if parameter is null', () => {
      var data = null;
      bll.getUsers(data, (err, msg) => {
        expect(err.message).to.contain("Parameter cannot be null, Must be a filled object");
      })
      done();
    })

    it('Should return an error if parameter is boolean', () => {
      var data = true;
      bll.getUsers(data, (err, msg) => {
        expect(err.message).to.contain("Parameter cannot be a boolean , Must be an object");
      })
      done();
    })
    it('Should return an error if parameter is string', () => {
      var data = '';
      bll.getUsers(data, (err, msg) => {
        expect(err.message).to.contain("Parameter cannot be string , Must be an object");
      })
      done();

    })

    it('Should return an error if parameter is undefined', () => {
      var data = undefined;
      bll.getUsers(data, (err, msg) => {
        expect(err.message).to.contain("Parameter cannot be undefined, Must be a filled object");
      })
      done();

    })

    it('Should return an error if parameter is empty object', () => {
      var data = {};
      bll.getUsers(data, (err, msg) => {
        expect(err.message).to.equal("Parameter cannot be empty , Must be a filled object");
      })
      done();

    })

    it('Should return an error if organizationID is null ', () => {
      var data = {

        _organizationID: null,
        _action: 'filter',
        _indexLetter: '1',
        _pageNumber: '1'

      }
      bll.getUsers(data, (err, msg) => {
        expect(err.message).to.equal("OrganizationID cannot be null");
      })
      done();

    })

    it('Should return an error if organizationID is empty ', () => {
      var data = {

        _organizationID: '',
        _action: 'filter',
        _indexLetter: '1',
        _pageNumber: '1'

      }
      bll.getUsers(data, (err, msg) => {
        expect(err.message).to.equal("OrganizationID cannot be empty");
      })
      done();

    })

    it('Should return an error if organizationID is boolean ', () => {
      var data = {

        _organizationID: true,
        _action: 'filter',
        _indexLetter: '1',
        _pageNumber: '1'

      }
      bll.getUsers(data, (err, msg) => {
        expect(err.message).to.equal("OrganizationID cannot be a boolean");
      })
      done();

    })

    it('Should return an error if organizationID is undefined ', () => {
      var data = {

        _organizationID: undefined,
        _action: 'filter',
        _indexLetter: '1',
        _pageNumber: '1'

      }
      bll.getUsers(data, (err, msg) => {
        expect(err.message).to.equal("OrganizationID cannot be undefined");
      })
      done();

    })

    it('Should return an error if action is null ', () => {
      var data = {

        _organizationID: '1234657',
        _action: null,
        _indexLetter: '1',
        _pageNumber: '1'

      }
      bll.getUsers(data, (err, msg) => {
        expect(err.message).to.equal("action cannot be null");
      })
      done();

    })
    it('Should return an error if action is empty ', () => {
      var data = {

        _organizationID: '12345768',
        _action: '',
        _indexLetter: '1',
        _pageNumber: '1'

      }
      bll.getUsers(data, (err, msg) => {
        expect(err.message).to.equal("action cannot be empty");
      })
      done();

    })
    it('Should return an error if action is neither filter nor view ', () => {
      var data = {

        _organizationID: "null",
        _action: 'read',
        _indexLetter: '1',
        _pageNumber: '1'

      }
      bll.getUsers(data, (err, msg) => {
        expect(err.message).to.equal("action can either be 'filter' or 'view' ");
      })
      done();

    })
    it('Should return an error if action is boolean ', () => {
      var data = {

        _organizationID: "null",
        _action: true,
        _indexLetter: '1',
        _pageNumber: '1'

      }
      bll.getUsers(data, (err, msg) => {
        expect(err.message).to.equal("action cannot be boolean");
      })
      done();

    })
    it('Should return an error if action is undefined ', () => {
      var data = {

        _organizationID: '1234567678',
        _action: undefined,
        _indexLetter: '1',
        _pageNumber: '1'

      }
      bll.getUsers(data, (err, msg) => {
        expect(err.message).to.equal("action cannot be undefined");
      })
      done();

    })





    describe("getOrganizationUsersFiltered", () => {

      it("Should be called once", function (done) {
        var data = {

          _organizationID: '123456789',
          _action: 'filter',
          _indexLetter: '1',
          _pageNumber: '1'

        }
        var organization = sinon.stub(userDal, 'getOrganizationUsersFiltered')

        bll.getUsers(data, (err, msg) => { });
        sinon.assert.calledOnce(organization);
        organization.restore()
        done();
      })

      it("Should return filtered users if the action is filter and inputs are valid ", function (done) {
        var data = {

          _organizationID: '123456789',
          _action: 'filter',
          _indexLetter: '1',
          _pageNumber: '1'

        }
        var organization = sinon.stub(userDal, 'getOrganizationUsersFiltered')

        bll.getUsers(data, (err, msg) => { });
        sinon.assert.calledWithMatch(organization, data._organizationID, data._pageNumber, data._indexLetter);
        organization.restore()
        done();
      })
    })
    describe("getOrganizationUsers", () => {

      it("Should be called once", function (done) {
        var data = {

          _organizationID: '123456789',
          _action: 'view',
          _indexLetter: '1',
          _pageNumber: '1'

        }
        var organization = sinon.stub(userDal, 'getOrganizationUsers')

        bll.getUsers(data, (err, msg) => { });
        sinon.assert.calledOnce(organization);
        organization.restore()
        done();
      })

      it("Should return users if the action is view and inputs are valid ", function (done) {
        var data = {

          _organizationID: '123456789',
          _action: 'view',
          _indexLetter: '1',
          _pageNumber: '1'

        }
        var organization = sinon.stub(userDal, 'getOrganizationUsers')

        bll.getUsers(data, (err, msg) => { });
        sinon.assert.calledWithMatch(organization, data._organizationID, data._pageNumber);
        organization.restore()
        done();
      })
    })
  })


    describe("searchTennantUsers", function () {

      beforeEach(() => {
        // process.env
      })

      it('Should return an error if there are no params passed', () => {

        bll.searchTennantUsers((err, msg) => {
          expect(err.message).to.contain("no params passed");
          done();
        })
      })

      it("Should return error #4.1 if the organization id is empty ", function (done) {

        organizationId = '';
        userString = "asd";
        selectedUsers = "sdf";
        limit = 2;


        bll.searchTennantUsers(organizationId, userString, selectedUsers, limit, (err, msg) => {
          expect(err.message).to.equal("#4.1");
          done();
        })
      });
      it("Should return error #4.1 if the organization id is null ", function (done) {

        organizationId = null;
        userString = "asd";
        selectedUsers = "sdf";
        limit = 2;

        bll.searchTennantUsers(organizationId, userString, selectedUsers, limit, (err, msg) => {
          expect(err.message).to.equal("#4.1");
          done();
        })
      });
      it("Should return error #4.1 if the organization id is undefined ", function (done) {

        organizationId = undefined;
        userString = "asd";
        selectedUsers = "sdf";
        limit = 2;

        bll.searchTennantUsers(organizationId, userString, selectedUsers, limit, (err, msg) => {
          expect(err.message).to.equal("#4.1");
          done();
        })
      });
      it("Should return error #4.1 if the organization id is passed as a boolean ", function (done) {

        organizationId = true;
        userString = "asd";
        selectedUsers = "sdf";
        limit = 2;

        bll.searchTennantUsers(organizationId, userString, selectedUsers, limit, (err, msg) => {
          expect(err.message).to.equal("#4.1");
          done();
        })
      });



      it("Should return error #16.1.1 if the userString is null ", function (done) {

        organizationId = "12345678";
        userString = null;
        selectedUsers = "sdf";
        limit = 2;

        bll.searchTennantUsers(organizationId, userString, selectedUsers, limit, (err, msg) => {
          expect(err.message).to.equal("#16.1.1");
          done();
        })
      });

      it("Should return error #16.1.1 if the userString is empty ", function (done) {

        organizationId = "12345678";
        userString = '';
        selectedUsers = "sdf";
        limit = 2;

        bll.searchTennantUsers(organizationId, userString, selectedUsers, limit, (err, msg) => {
          expect(err.message).to.equal("#16.1.1");
          done();
        })
      });

      it("Should return error #16.1.1 if the userString is undefined ", function (done) {

        organizationId = "12345678";
        userString = undefined;
        selectedUsers = "sdf";
        limit = 2;

        bll.searchTennantUsers(organizationId, userString, selectedUsers, limit, (err, msg) => {
          expect(err.message).to.equal("#16.1.1");
          done();
        })
      });

      it("Should return error #16.1.1 if the userString is boolean ", function (done) {

        organizationId = "12345678";
        userString = true;
        selectedUsers = "sdf";
        limit = 2;

        bll.searchTennantUsers(organizationId, userString, selectedUsers, limit, (err, msg) => {
          expect(err.message).to.equal("#16.1.1");
          done();
        })
      });

      it("Should return an error if selectedUsers is null ", function (done) {

        organizationId = "12345678";
        userString = "asd";
        selectedUsers = null;
        limit = 2;

        bll.searchTennantUsers(organizationId, userString, selectedUsers, limit, (err, msg) => {
          expect(err.message).to.contain("Invalid Selected users");
          done();
        })
      });

      it("Should return an error if the selectedUsers is empty ", function (done) {

        organizationId = "12345678";
        userString = "asd";
        selectedUsers = "";
        limit = 2;

        bll.searchTennantUsers(organizationId, userString, selectedUsers, limit, (err, msg) => {
          expect(err.message).to.contain("Invalid Selected users");
          done();
        })
      });

      it("Should return an error if the selectedUsers is undefined ", function (done) {

        organizationId = "12345678";
        userString = "asd";
        selectedUsers = undefined;
        limit = 2

        bll.searchTennantUsers(organizationId, userString, selectedUsers, limit, (err, msg) => {
          expect(err.message).to.contain("Invalid Selected users");
          done();
        })
      });

      it("Should return an error if the selectedUsers is boolean ", function (done) {

        organizationId = "12345678";
        userString = "asd";
        selectedUsers = true;
        limit = 2

        bll.searchTennantUsers(organizationId, userString, selectedUsers, limit, (err, msg) => {
          expect(err.message).to.contain("Invalid Selected users");
          done();
        })
      });
      it("Should return error #16.1.2 if the limit is null ", function (done) {

        organizationId = "12345678";
        userString = "null";
        selectedUsers = "sdf";
        limit = null;

        bll.searchTennantUsers(organizationId, userString, selectedUsers, limit, (err, msg) => {
          expect(err.message).to.equal("#16.1.2");
          done();
        })
      });

      it("Should return error #16.1.2 if the limit is empty ", function (done) {

        organizationId = "12345678";
        userString = "null";
        selectedUsers = "sdf";
        limit = '';

        bll.searchTennantUsers(organizationId, userString, selectedUsers, limit, (err, msg) => {
          expect(err.message).to.equal("#16.1.2");
          done();
        })
      });

      it("Should return error #16.1.2 if the limit is undefined ", function (done) {

        organizationId = "12345678";
        userString = "undefined";
        selectedUsers = "sdf";
        limit = undefined;

        bll.searchTennantUsers(organizationId, userString, selectedUsers, limit, (err, msg) => {
          expect(err.message).to.equal("#16.1.2");
          done();
        })
      });

      it("Should return error #16.1.2 if the limit is boolean ", function (done) {

        organizationId = "12345678";
        userString = "true";
        selectedUsers = "sdf";
        limit = true;

        bll.searchTennantUsers(organizationId, userString, selectedUsers, limit, (err, msg) => {
          expect(err.message).to.equal("#16.1.2");
          done();
        })
      });


      it("Should return Tennant Users if inputs are valid ", function (done) {

        organizationId = '123456787';
        userString = "asd";
        selectedUsers = "sdf";
        limit = 2;

        var searchTennantUsers = sinon.stub(userDal, "searchTennantUsers");
        bll.searchTennantUsers(organizationId, userString, selectedUsers, limit, (err, msg) => { });

        sinon.assert.calledOnce(searchTennantUsers);
        searchTennantUsers.restore();
        done();
      });
      describe("getAllUsers",()=>{
        it("Should be called once", function (done) {
          organizationId = '123456787';
          userString = "asd";
          selectedUsers = "sdf";
          limit = 2;

          var users = sinon.stub(AD, 'getAllUsers');
          var groups = sinon.stub(AD,'getAllGroups');

          bll.searchTennantUsers(organizationId,userString,selectedUsers,limit, (err, msg) => { });
          sinon.assert.calledOnce(users);
          users.restore();
          groups.yields(null,true);
          done();
        })

        it("Should return users if inputs are valid", function (done) {
          organizationId = '123456787';
          userString = "asd";
          selectedUsers = "sdf";
          limit = 2;

          var users = sinon.stub(AD, 'getAllUsers');
          var groups = sinon.stub(AD,'getAllGroups');

          bll.searchTennantUsers(organizationId,userString,selectedUsers,limit, (err, msg) => {

          });
          sinon.assert.calledWithMatch(users,(err,msg)=>{});
          users.restore()
          groups.yields(null,true);
          done();
        })

      })
      describe("getAllGroups",()=>{
        it("Should be called once", function (done) {
          organizationId = '123456787';
          userString = "asd";
          selectedUsers = "sdf";
          limit = 2;

          users = sinon.stub(AD, 'getAllUsers').yields(null,[]);
          var groups = sinon.stub(AD,'getAllGroups');

          bll.searchTennantUsers(organizationId,userString,selectedUsers,limit, (err, msg) => { });
          sinon.assert.calledOnce(groups);
          groups.restore();
          done();
        })

        it("Should return groups if inputs are valid", function (done) {
          organizationId = '123456787';
          userString = "asd";
          selectedUsers = "sdf";
          limit = 2;

          users = sinon.stub(AD, 'getAllUsers').yields(null,[]);
          var groups = sinon.stub(AD,'getAllGroups');

          bll.searchTennantUsers(organizationId,userString,selectedUsers,limit, (err, msg) => {

          });
          sinon.assert.calledWithMatch(groups,(err,msg)=>{});
          groups.restore()
          done();
        })

      })
    });





    // describe("searchTennantUsers", function () {

    //     it("organizationID is Empty", function (done) {
    //        data = {
    //         "organizationId" : null,
    //         "userString":"asd",
    //         "selectedUsers" : "sdf",
    //         "limit":2

    //        }
    //        organizationId = null
    //         bll.searchTennantUsers(data, (err, msg) => {
    //             expect(err.message).to.equal("Invalid OrganizationId");
    //             done();
    //         })
    //     });

    //     it("userString", function (done) {
    //         data = {
    //             "organizationId" : '123-45677899-88',
    //             "userString":null,
    //             "selectedUsers" : "sdf",
    //             "limit":2

    //            }
    //         bll.searchTennantUsers(data, (err, msg) => {
    //             expect(err.message).to.equal("Invalid User");
    //             done();
    //         })
    //     });

    //     it("selectedUsers", function (done) {
    //         data = {
    //             "organizationId" : '123-45677899-88',
    //             "userString":"asd",
    //             "selectedUsers" : null,
    //             "limit":2

    //            }
    //         bll.searchTennantUsers(data, (err, msg) => {
    //             expect(err.message).to.equal("Invalid Selected users");
    //             done();
    //         })
    //     });

    //     it("Invalid Limit", function (done) {
    //         data = {
    //             "organizationId" : '123-45677899-88',
    //             "userString":"asd",
    //             "selectedUsers" : "sdf",
    //             "limit":null

    //            }
    //         bll.searchTennantUsers(data , (err, msg) => {
    //             expect(err.message).to.equal("Invalid Limit");
    //             done();
    //         })
    //     });

    //     it("searchTennantUsers", function (done) {
    //         data = {
    //             "organizationId" : '123-45677899-88',
    //             "userString":"asd",
    //             "selectedUsers" : "sdf",
    //             "limit":5

    //            }
    //            var UserData = sinon.stub(userDal, "searchTennantUsers").yields(null, data);
    //            UserData.restore()
    //            done();
    //     });
    // })


    describe('getAllOrganizationUsers', () => {

      it('Should return an error if the organizationId is not passed', () => {

        bll.getAllOrganizationUsers((err, msg) => {
          expect(err.message).to.contain("OrganizationId is not passed into parameter");

        })

      })

      it('Should return error #4.1 if the organizationId is null', () => {
        organizationId = null;

        bll.getAllOrganizationUsers(organizationId, (err, msg) => {
          expect(err.message).to.equal("#4.1");

        })

      })

      it('Should return error #4.1 if the organizationId is empty', () => {
        organizationId = '';

        bll.getAllOrganizationUsers(organizationId, (err, msg) => {
          expect(err.message).to.equal("#4.1");

        })

      })
      it('Should return error #4.1 if the organizationId is undefined', () => {
        organizationId = undefined;

        bll.getAllOrganizationUsers(organizationId, (err, msg) => {
          expect(err.message).to.equal("#4.1");

        })

      })
      it('Should return error #4.1 if the organizationId is boolean', () => {
        organizationId = true;

        bll.getAllOrganizationUsers(organizationId, (err, msg) => {
          expect(err.message).to.equal("#4.1");

        })

      })


      //    it('Should return a result if the organization id is passed', () => {
      it('Should call getAllOrganizationUsers once', (done) => {
        let organizationID = '123-45677899-88';
        var getAllOrganizationUsers = sinon.stub(userDal, "getAllOrganizationUsers");
        bll.getAllOrganizationUsers(organizationID, (err, msg) => { });
        sinon.assert.calledOnce(getAllOrganizationUsers);
        getAllOrganizationUsers.restore();
        done();
      });


      it('Should return all organization users if the organization id is passed', (done) => {
        let organizationID = '123-45677899-88';
        var getAllOrganizationUsers = sinon.stub(userDal, "getAllOrganizationUsers");
        bll.getAllOrganizationUsers(organizationID, (err, msg) => { });
        sinon.assert.calledWithMatch(getAllOrganizationUsers, organizationID);
        // getAllOrganizationUsers.restore();
        done();
      });



      // })

    })
});


