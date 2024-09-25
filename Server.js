const express = require("express")
const path = require("path")
const app = express()
const bcrypt = require("bcrypt")
const collection = require("./config")
const bodyparser = require("body-parser")

app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static("public"));

app.get("/login", function(req, res){
    res.render("login")
})
app.get("/register", function(req, res){
    res.render("register", {error:" "})
})
app.post("/register", async (req, res) =>{
    const data = {
        username: req.body.username,
        password: req.body.password
    }
    
    let existinguser = await collection.findOne({username: data.username})
    if(existinguser){
        res.redirect("/register")
        res.render("register", {error: "User already exists. choose another username"})
    }else{
        let saltrounds = 10
        let passwordhash = await bcrypt.hash(data.password, saltrounds)
        data.password = passwordhash
        let userdata =  await collection.insertMany(data)
        console.log(userdata)
        res.redirect("/")
    }
})
app.get("/", function(req, res){
    res.render('home')
})
app.listen(4000, function(){ 
    console.log(`Server's started on port `)
})

