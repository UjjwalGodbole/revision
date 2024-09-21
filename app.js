const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const Listing = require("../revision/models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Revision");
}

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log("err");
})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.set(express.urlencoded({extended:true}));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs",ejsmate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.static('public'));


//home route
app.get("/",async(req,res)=>{
    const alllisting = await Listing.find({});
    res.render("listings/home.ejs",{alllisting});
})

app.get("/all",async(req,res)=>{
    const alllisting = await Listing.find({});
    res.render("listings/all.ejs",{alllisting});
})

//listing route
app.get("/listings",async(req,res)=>{
    const alllisting = await Listing.find({});
    res.render("listings/index.ejs",{alllisting});
})

//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//create route
app.post("/listings",async(req,res)=>{
    const newlisting = new Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
})

//show route
app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    const listing =await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//update route
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
})

//delete route
app.delete("/listings/:id",async(req,res)=>{
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
})

app.listen(8080,()=>{
    console.log("server is listening");
})