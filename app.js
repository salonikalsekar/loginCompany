var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var path = require("path");
var mongo = require("mongodb");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/logindata");
var db = mongoose.connection;
var expressValidator= require("express-validator");


var routes= require('./routes/index');
var users= require('./routes/users');

//init app

var app= express();


//view engine


app.set('views', path.join(__dirname,'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set ('view engine' , 'handlebars');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());



//set static 


app.use(express.static(path.join(__dirname, 'public')));




app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave: true
}));


//passport init
app.use(passport.initialize());
app.use(passport.session());

// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



app.use(flash());

app.use(function(req,res,next){
    res.locals.success_msg= req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    res.locals.user= req.user || null;
    next();
});

var configRoutes = require("./routes");
configRoutes(app);


app.listen(3000, () => {
    console.log("We have got a server");
    console.log("Your routes will be running on http://localhost:3000");
}); 