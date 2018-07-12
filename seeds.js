var mongoose = require("mongoose")
var Campground = require("./models/campground.js")
var Comment = require("./models/comment")

var data = [
    {name: "Castel Black", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350", description: "This is a seed Description"},
    {name: "Kings Landing", image: "https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?auto=compress&cs=tinysrgb&h=350", description: "This is a seed Description"},
    {name: "Winterfell", image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", description: "This is a seed Description"},
    {name: "Castel Black", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350", description: "This is a seed Description"},
    {name: "Kings Landing", image: "https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?auto=compress&cs=tinysrgb&h=350", description: "This is a seed Description"},
    {name: "Winterfell", image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", description: "This is a seed Description"},
    {name: "Castel Black", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350", description: "This is a seed Description"},
    {name: "Kings Landing", image: "https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?auto=compress&cs=tinysrgb&h=350", description: "This is a seed Description"},
    {name: "Winterfell", image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", description: "This is a seed Description"}
]

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log("err");
            
        }else{
            console.log("All Campground Removed");
            // adding
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                        
                    }else{
                        console.log("Added new Seed Campground");
                        Comment.create({
                            text: "Goooood",
                            author: "Jon doe"
                        }, function(err, comment){
                            if (err) {
                                console.log(err);
                            } else {
                                
                                campground.comments.push(comment);
                                campground.save()
                                console.log("Created neew comment");
                                
                            }
                        })
                        
                    };
                })
            })
            
        }// else ended


    });
    

}

module.exports = seedDB;