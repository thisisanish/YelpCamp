var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground")
var Comment = require("../models/comment")

// ===========================
// Comments
// ===========================
router.get("/new", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            
        }else{
            res.render("comments/new", {campground: campground})
        }
    })   
})
// Comments Create
router.post("/", isLoggedIn, function(req, res){
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


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login")
    }
}

module.exports = router;