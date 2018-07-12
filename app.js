var express = require("express");
    app = express(),
    bodyParser = require("body-parser"),
    Campground = require("./models/campground.js")
    mongoose = require("mongoose");


    
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); // no need to write ejs




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


// var campgrounds = [
//     {name: "Castel Black", image: "https://pixabay.com/get/eb35b70b2df6033ed1584d05fb1d4e97e07ee3d21cac104496f1c17dafeeb3bb_340.jpg"},
//     {name: "Kings Landing", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f1c17dafeeb3bb_340.jpg"},
//     {name: "Winterfell", image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f1c17dafeeb3bb_340.jpg"},
//     {name: "Castel Black", image: "https://pixabay.com/get/eb35b70b2df6033ed1584d05fb1d4e97e07ee3d21cac104496f1c17dafeeb3bb_340.jpg"},
//     {name: "Kings Landing", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f1c17dafeeb3bb_340.jpg"},
//     {name: "Winterfell", image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f1c17dafeeb3bb_340.jpg"},
//     {name: "Castel Black", image: "https://pixabay.com/get/eb35b70b2df6033ed1584d05fb1d4e97e07ee3d21cac104496f1c17dafeeb3bb_340.jpg"},
//     {name: "Kings Landing", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f1c17dafeeb3bb_340.jpg"},
//     {name: "Winterfell", image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f1c17dafeeb3bb_340.jpg"}
// ]

app.get("/", function(req, res){
    res.render("landing")
    
});
// INDEX
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("index", {campgrounds: allcampgrounds}); // passing the data to ejs
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
    res.render("new")
    
})
// Show
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            
        }else{
            res.render("show", {campground: foundCampground})
        }
    })
    
})

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
