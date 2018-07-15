var express = require("express");
var router = express.Router();
var passport = require("passport")
var User = require("../models/user");

// Landing page
router.get("/", function(req, res){
    res.render("landing")
    
});


// ===========================
// AUTH ROUTES
// ===========================

// Register GET
router.get("/register", function(rew, res){
    res.render("register")
})

// Register POST
router.post("/register", function(req, res){
    //newUser is an object with everything but password which is later hashed
    var newUser = new User({username: req.body.username})
    // User.register registers a new user, and saves its details except password in database. req.body.password goes as other parameter where it probably gets hashed and salted so as to maintain security
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message)
            console.log(err);
            
            return res.render("register")
        }else{
            // passport.authenticate !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to Yelpcamp" + user.username)
                res.redirect("/campgrounds");
            })
        }
    })
})

// Login GET
router.get("/login", function(req, res){
    res.render("login")
})

// Login POST
router.post("/login", passport.authenticate("local", 
    {   
        successRedirect:"/campgrounds",
        failureRedirect:"/login"// redirects to /campground of success else would redirect to /login
    }),function(req, res){
}); 
// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("error", "Logged you out!")
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

module.exports = router;