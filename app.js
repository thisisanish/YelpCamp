var express = require("express");// addinf express
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs"); // no need to write ejs


var campgrounds = [
    {name: "Castel Black", image: "https://pixabay.com/get/eb35b70b2df6033ed1584d05fb1d4e97e07ee3d21cac104496f1c17dafeeb3bb_340.jpg"},
    {name: "Kings Landing", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f1c17dafeeb3bb_340.jpg"},
    {name: "Winterfell", image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f1c17dafeeb3bb_340.jpg"},
    {name: "Castel Black", image: "https://pixabay.com/get/eb35b70b2df6033ed1584d05fb1d4e97e07ee3d21cac104496f1c17dafeeb3bb_340.jpg"},
    {name: "Kings Landing", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f1c17dafeeb3bb_340.jpg"},
    {name: "Winterfell", image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f1c17dafeeb3bb_340.jpg"},
    {name: "Castel Black", image: "https://pixabay.com/get/eb35b70b2df6033ed1584d05fb1d4e97e07ee3d21cac104496f1c17dafeeb3bb_340.jpg"},
    {name: "Kings Landing", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f1c17dafeeb3bb_340.jpg"},
    {name: "Winterfell", image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f1c17dafeeb3bb_340.jpg"}
]

app.get("/", function(req, res){
    res.render("landing")
    
});

app.get("/campgrounds", function(req, res){
    

    res.render("campgrounds", {campgrounds: campgrounds}); // passing the data to ejs
});

app.post("/campgrounds",function(req, res){
    // we need to get data from form and add to campground and also redirect to campground page
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground)
    //and redirect to /campgrounds
    res.redirect("/campgrounds");

});

app.get("/campgrounds/new", function(req, res){
    res.render("new")
    
})



app.listen(3000, function(){
    console.log("Server is running at port 3000");   
})


/*
optional for c9

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is up for C9/jondoe")
})
*/
