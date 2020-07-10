const express = require("express");
const path = require("path");
const port = 2017;

const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app=express();

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));

var contact_list=[{name:"jabir",phone:"78456123"},{name:"ayisha",phone:"789456123"},{name:"muhsin",phone:"741852963"}];

app.get("/",function(req,res){
    Contact.find({},function(error,contact){
        if(error)
        {
            console.log("error in fetching contact");
            return;
        }
        return res.render("home",{title:"my contact list",contacts:contact});
    });
    
});

app.get("/second",function(req,res){
    return res.render("second",{title:"second page"});
});

app.post("/create-contact",function(req,res){
    // contact_list.push(req.body);
    Contact.create({name:req.body.name, phone:req.body.phone}, function(error,newcontact){
        if(error)
        {
            console.log("error in creating new contact");
            return;
        }
        return res.redirect("/");
    });
});

app.listen(port,function(err){
    if(err)
    {
        console.log("error",err);
        return;
    }
    console.log("server successfully up and running on port:",port);
    
});