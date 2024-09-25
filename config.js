const mongoose = require("mongoose")
const connect = mongoose.connect("mongodb+srv://gzezo3304:5BkVzaOUyl67ZeqX@ace.q91q6.mongodb.net/?retryWrites=true&w=majority&appName=ACE")

connect.then(function(){
    console.log("Nice")
})
.catch(function(){
    console.log("fuck")
})
const loginSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required: true
    }
})
const collection = new mongoose.model("users", loginSchema)

module.exports = collection 
