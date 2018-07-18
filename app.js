var express = require("express"); // express framework
    app = express(), // as a function
    bodyParser = require("body-parser"), // used to parse body which is originally is I guess a string
    Campground = require("./models/campground.js") // module located in models
    mongoose = require("mongoose"), // Non SQL Database
    seedDB = require("./seeds.js"), // seed.js is used to seed the Database with predefined data so as the check and debug
    Comment = require("./models/comment.js"),// module located in models
    passport = require("passport"), // for authentication
    LocalStratergy = require("passport-local"), // for local authentication, other stratergy includes twitter, facebook, github
    User = require("./models/user.js"),// module located in models
    methodOverride = require("method-override"),
    flash = require("connect-flash");
    
    // requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")



//seedDB(); // initialize seedDB to remove all the data and fill with predefined data


// mongoose.connect("mongodb://localhost/yelp_camp_server"); // mongoose connected to a url
mongoose.connect("mongodb://anish:password1@ds239071.mlab.com:39071/yelpcamp_proto");
// console.log(process.env.databaseURL);




app.use(bodyParser.urlencoded({extended: true})); // just write this to use body parser
app.set("view engine", "ejs"); // no need to write ejs
app.use(express.static(__dirname + "/public")) // to be able to use files like css . public is the directory where we are storing those files
app.use(methodOverride("_method"))
// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Pugs are awesome!",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize()) // initiate Passport
app.use(passport.session()); // passport session
passport.use(new LocalStratergy(User.authenticate())) // remember when we use "local"
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());

// ----------
app.use(function(req, res, next){
    res.locals.currentUser = req.user; // whatever is with res.locals will be available to the templates
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next(); // important
}) // our own middle ware

app.use("/", indexRoutes)
app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)


// // listning
// app.listen(process.env.PORT || 3000, process.env.IP, function(){
//     console.log("Server is running at port 3000 or on process.env.PORT");   
// })

app.set( 'port', ( process.env.PORT || 5000 ));

// Start node server
app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
  });

/*
optional for c9

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is up for C9/jondoe")
})
*/
