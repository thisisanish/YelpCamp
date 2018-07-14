var express = require("express"); // express framework
    app = express(), // as a function
    bodyParser = require("body-parser"), // used to parse body which is originally is I guess a string
    Campground = require("./models/campground.js") // module located in models
    mongoose = require("mongoose"), // Non SQL Database
    seedDB = require("./seeds.js"), // seed.js is used to seed the Database with predefined data so as the check and debug
    Comment = require("./models/comment.js"),// module located in models
    passport = require("passport"), // for authentication
    LocalStratergy = require("passport-local"), // for local authentication, other stratergy includes twitter, facebook, github
    User = require("./models/user.js");// module located in models


seedDB(); // initialize seedDB to remove all the data and fill with predefined data
mongoose.connect("mongodb://localhost/yelp_camp"); // mongoose connected to a url
app.use(bodyParser.urlencoded({extended: true})); // just write this to use body parser
app.set("view engine", "ejs"); // no need to write ejs
app.use(express.static(__dirname + "/public")) // to be able to use files like css . public is the directory where we are storing those files
app.use(function(req, res, next){
    res.locals.currentUser = req.user; // whatever is with res.locals will be available to the templates
    next(); // important
}) // our own middle ware
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


// Campground.create({
//     name: "Castel Black",
//     image: "https://pixabay.com/get/eb35b70b2df6033ed1584d05fb1d4e97e07ee3d21cac104496f1c17dafeeb3bb_340.jpg",
//     description: "This is awesomeee!!!"
// }, function(err, campground){
//     if(err){
//         console.log("error dude");
//         console.log(err);    
//     }else{
//         console.log(campground);
        
//     }
// });



// Landing page
app.get("/", function(req, res){
    res.render("landing")
    
});
// INDEX
app.get("/campgrounds", function(req, res){    
    Campground.find({}, function(err, allcampgrounds){ //finds all campground
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user}); // passing the data to ejs
        }
    })

    
});
// CREATE
app.post("/campgrounds",function(req, res){
    // we need to get data from form and add to campground and also redirect to campground page
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    // Creating a campground and save it to a database
    Campground.create(newCampground, function(err, newground){
        if(err){
            console.log("An Error!");
            console.log(err);
        }else{
            console.log("New Ground");
            console.log(newground);     
        }
    })

    //and redirect to /campgrounds
    res.redirect("/campgrounds");

});
// NEW
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new")
    
})
// Show
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){ 
        // finds campground with specific ID and returns that specific campground, along with "comments"
        if(err){
            console.log(err);            
        }else{
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })
    
})

// ===========================
// Comments
// ===========================
app.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            
        }else{
            res.render("comments/new", {campground: campground})
        }
    })   
})

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    console.log("this is post route");
    
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log("error");
            
            res.redirect("/campground")
        }else{
            Comment.create(req.body.comment, function(err, comment){ // create a comment
                if(err){
                    console.log("error");
                    
                }else{
                    console.log("almost there");
                    
                    campground.comments.push(comment) // push the new comment in campground.comments.
                    campground.save(); // and save
                    res.redirect("/campgrounds/" + campground._id) // and redirect back to show page
                }
            })
            
        }
    })
})


// ===========================
// AUTH ROUTES
// ===========================

// Register GET
app.get("/register", function(rew, res){
    res.render("register")
})

// Register POST
app.post("/register", function(req, res){
    //newUser is an object with everything but password which is later hashed
    var newUser = new User({username: req.body.username})
    // User.register registers a new user, and saves its details except password in database. req.body.password goes as other parameter where it probably gets hashed and salted so as to maintain security
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register")
        }else{
            // passport.authenticate !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            passport.authenticate("local")(req, res, function(){
                res.redirect("/campgrounds");
            })
        }
    })
})

// Login GET
app.get("/login", function(req, res){
    res.render("login")
})

// Login POST
app.post("/login", passport.authenticate("local", 
    {   
        successRedirect:"/campgrounds",
        failureRedirect:"/login"// redirects to /campground of success else would redirect to /login
    }),function(req, res){
}); 

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds")
})
//remember the syntax
// Middleware

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login")
    }
}


// listning
app.listen(3000, function(){
    console.log("Server is running at port 3000");   
})



/*
optional for c9

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is up for C9/jondoe")
})
*/
