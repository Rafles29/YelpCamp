var express = require('express');
var bodyParser = require('body-parser')
var app = express();

//camps
var camps = [
    {name: "Salmon Creek", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
    {name: "Granite Hill", image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
    {name: "Mountatin Goat's Rest", image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    res.render("landing");
});
app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", {campgrounds:camps});
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
});

app.post("/campgrounds", function (req, res) {
    console.log(req.body);
    camps.push({name: req.body.name,image:req.body.image});
    res.redirect("/campgrounds");
});

app.listen('3000', function () {
   console.log("The YelpCamp server has started")
});


