var mongoose = require("mongoose")
var Campground = require("./models/campground.js")

var data = [
    {name: "Castel Black", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350", description: "This is Seed Description"},
    {name: "Kings Landing", image: "https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?auto=compress&cs=tinysrgb&h=350", description: "This is Seed Description"},
    {name: "Winterfell", image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", description: "This is Seed Description"},
    {name: "Castel Black", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350", description: "This is Seed Description"},
    {name: "Kings Landing", image: "https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?auto=compress&cs=tinysrgb&h=350", description: "This is Seed Description"},
    {name: "Winterfell", image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", description: "This is Seed Description"},
    {name: "Castel Black", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350", description: "This is Seed Description"},
    {name: "Kings Landing", image: "https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?auto=compress&cs=tinysrgb&h=350", description: "This is Seed Description"},
    {name: "Winterfell", image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", description: "This is Seed Description"}
]

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log("err");
            
        }else{
            console.log("All Campground Removed");
            // adding
            data.forEach(function(seed){
                Campground.create(seed, function(err, data){
                    if(err){
                        console.log(err);
                        
                    }else{
                        console.log("Added new Seed Campground");
                        
                    };
                })
            })
            
        }// else ended


    });
    

}

module.exports = seedDB;