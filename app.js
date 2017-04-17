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
    image: String
});
var Campground = mongoose.model("Campground", campgroundSchema);


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
           res.render("campgrounds", {campgrounds:allCampgrounds});
       }
    });
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
});

app.post("/campgrounds", function (req, res) {
    Campground.create({
        name: req.body.name, image:req.body.image
    }, function (err, campground) {
        if(err){
            console.log(err)
        }else {
            console.log("NEWLY CREATED CAMPGROUND: ");
            console.log(campground);
        }
    });

    res.redirect("/campgrounds");
});

//port listening
app.listen('3000', function () {
   console.log("The YelpCamp server has started")
});
