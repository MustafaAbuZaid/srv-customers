var expect = require('chai').expect;
var sinon = require("sinon")
var bll = require("../../business/registerTenantAdmin")
var userDal = require("../../dal/core-authentication-user");



describe("Register Tenant Admin", function () {
    describe("getAllCountries", function () {
        it("getAllCountries should return countries with no errors", function (done) {
           // var country = sinon.stub(userDal, 'getAllCountries')
           // var user = {firstname:"test", lastname: "test", company:"slosls",email:"lsim@oslso.net", phone:"2525",country:{name:"Egypt",code:"+20"}}
            bll.getAllCountries(function (err, countries) {
                expect(err).to.be.undefined;
                expect(countries).length.to.be.greaterThan(0);
            })
           // country.restore()
           // sinon.assert.calledWithMatch(country,user)
            done();
                    
        })
    })

    describe("registerTenantAdmin", function () {
        it("should validates firstname", function (done) {
            bll.registerTenantAdmin({ }, function (err, message) {
                expect(err).to.be.not.null;
                expect(message).to.equal("Invalid First name")
                done()
            })
          
           
        })
                     

        it("should validates lastname", function (done) {
            bll.registerTenantAdmin({firstname:"test" }, function (err, message) {
                expect(err).to.be.not.null;
                expect(message).to.equal("Invalid Last name")
                done()
            })
           
        })

        it("should validates company", function (done) {
            bll.registerTenantAdmin({firstname:"test", lastname: "test" }, function (err, message) {
                expect(err).to.be.not.null;
                expect(message).to.equal("Invalid Company name")
                done()
            })
           
        })

        it("should validates purchasedProducts", function (done) {
            bll.registerTenantAdmin({firstname:"test", lastname: "test", company:"slosls"}, function (err, message) {
                expect(err).to.be.not.null;
                expect(message).to.equal("Invalid User Selected Products")
                done()
            })
           
        })
        
        it("should validates email", function (done) {
            bll.registerTenantAdmin({firstname:"test", lastname: "test", company:"slosls",email:" lsim@oslso  ", purchasedProducts:"hfvhgcgdc" }, function (err, message) {
                expect(err).to.be.not.null;
                expect(message).to.equal("Invalid Email")
                done()
            })
        })

        it("should validates phone", function (done) {
            bll.registerTenantAdmin({firstname:"test", lastname: "test", company:"slosls",email:" lsim@oslso.net  ", phone:"  ", purchasedProducts:"hfvhgcgdc"  }, function (err, message) {
                expect(err).to.be.not.null;
                expect(message).to.equal("Invalid Phone number")
                done()
            })
        })

        it("should validates country", function (done) {
            bll.registerTenantAdmin({firstname:"test", lastname: "test", company:"slosls",email:" lsim@oslso.net  ", phone:"2525", purchasedProducts:"hfvhgcgdc" }, function (err, message) {
                expect(err).to.be.not.null;
                expect(message).to.equal("Invalid Country")
                done()
            })
        })

        it("should check if user exists", function (done) {
           // var findEmail = sinon.stub(userDal, 'FindEmail');
            var user = {firstname:"test",
             lastname: "test",
              company:"slosls",
              email:"lsim@oslso.net",
               phone:"2525", purchasedProducts:"hfvhgcgdc" ,country:{name:"Egypt",code:"+20"}}
            bll.registerTenantAdmin(user, function (err, message) {


            })
            //findEmail.restore()
           // sinon.assert.calledWithMatch(findEmail,{email:"lsim@oslso.net"});

            done();
            
        })

        it("should add user to database", function (done) {
          //  sinon.stub(userDal,"FindEmail").yields()
         //   var addNewUser = sinon.stub(userDal, 'AddNewUser')
            var user = {firstname:"test", lastname: "test", company:"slosls",email:"lsim@oslso.net", phone:"2525",country:{name:"Egypt",code:"+20"}}
            bll.registerTenantAdmin(user, function (err, message) {    
            })
            
           // addNewUser.restore()
           // sinon.assert.calledWithMatch(addNewUser,user)
            done();       
        })
    })
})