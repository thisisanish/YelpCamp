var express = require("express");
var router = express.Router();
var Campground = require("../models/campground")
var middleware = require("../middleware/")


// Campground Routes


// INDEX
router.get("/", function(req, res){    
    Campground.find({}, function(err, allcampgrounds){ //finds all campground
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds: allcampgrounds}); // passing the data to ejs
        }
    })

    
});
// CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    // we need to get data from form and add to campground and also redirect to campground page
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username:req.user.username
    }
    var newCampground = {name: name, price: price, image: image, description: desc, author: author}
    console.log(newCampground);
    
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
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new")
    
})
// Show
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){ 
        // finds campground with specific ID and returns that specific campground, along with "comments"
        if(err){
            console.log(err);            
        }else{
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })
    
})
// Edit 
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
        Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground})

        })    
})

// Update
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds")
        }else{
            res.redirect("/campgrounds/" +req.params.id )
        }
    })
})
// Destroy
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    console.log("noce");
    
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            
            res.redirect("/campgrounds")
        }else{
            req.flash("success", "Comment deleted")
            res.redirect("/campgrounds")
        }
    })
})



module.exports = router