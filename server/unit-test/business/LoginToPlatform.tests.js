var expect = require('chai').expect;
var sinon = require("sinon")
var bll = require("../../business/LoginToPlatform")
var userDal = require("../../dal/core-authentication-user")




describe("Login To Platform", function () {
    
    describe("LoginToPlatform", function () {
        it("should validates email", function (done) {
            bll.LoginToPlatform({email:" lsim@oslso  ",password:"123" }, function (err, message) {
                expect(err).to.be.not.null;
                expect(message).to.equal("Invalid Email")
                done()
            })
        })

        
            it("should validates password", function (done) {
                bll.LoginToPlatform({email:"test@test.com",password:""}, function (err, message) {
                    expect(err).to.be.not.null;
                    expect(message).to.equal("Invalid password")
                    done()
                })
            })


    describe("getLoginedUser", function () {
        it("should check if user is registered", function (done) {
            var findByEmailAndPassword = sinon.stub(userDal, 'FindUserByUserEmailAndPassword')
            var user = {email:"test@test.com",password:"123"};
            bll.LoginToPlatform(user, function (err, message) {
                
                
            })
            findByEmailAndPassword.restore()
            sinon.assert.calledWithMatch(findByEmailAndPassword,user);
            done();
            
        })

        
            
       
        

    })
}) 

})