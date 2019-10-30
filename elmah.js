var elmah = require("elmah.io"); // first you have to require the module
var express = require("express");
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());


app.get('/hello',function(req,res,next) {
    res.send("Oh no, an error happened")
	//if there is a error then pass it to next error handler.
	next(new Error('Database Error'));  // for example we just hit the error in accessing database so we are sending database error
})
app.post('/hello',function(req,res,next) {
	/*
		Logical code
	 */

	//if there is a error then pass it to next error handler.
	next(new Error(`Can't connect to database`));  // for example we just hit the error in accessing database so we are sending database error
})


//this function handles 404 error which is if some page is not found
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*
This method will invode if there is error. (eg. database, not found etc..)
Add .auto() middle ware at the end of the express. (before default error handler if there is one)
also add logId, application, serverVariables and version as object in elmah.auto() method
 */
app.use(elmah.auto({logId:"487e7c5e-fcc3-4098-b27c-f53773619379",
		application:"elmah.io node app",
		version: "1.42.0"
}));