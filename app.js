//dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//initial setting
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

//database
mongoose.connect("mongodb://localhost/yelp_camp");
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create({
    name: "Salmon Creek", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg", description:"This is a huge Salmon Creek. No water. Marvelous view!"
}, function (err, campground) {
    if(err){
        console.log(err)
    }else {
        console.log("NEWLY CREATED CAMPGROUND: ");
        console.log(campground);
    }
});*/


//routing
app.get("/", function (req, res) {
    res.render("landing");
});
app.get("/campgrounds", function (req, res) {

    Campground.find({}, function (err, allCampgrounds) {
       if(err) {
           console.log(err);
       }
       else {
           res.render("index", {campgrounds:allCampgrounds});
       }
    });
});

app.post("/campgrounds", function (req, res) {
    Campground.create({
        name: req.body.name, image:req.body.image, description:req.body.description
    }, function (err, campground) {
        if(err){
            console.log(err);
        }else {
            console.log("NEWLY CREATED CAMPGROUND: ");
            console.log(campground);
        }
    });

    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
});

app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if(err) {
            console.log(err);
        }else {
            res.render('show', {campground: foundCampground});
        }
    });

});

//port listening
app.listen('3000', function () {
   console.log("The YelpCamp server has started")
});
