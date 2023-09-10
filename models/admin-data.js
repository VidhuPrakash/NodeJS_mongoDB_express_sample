// middleware for admin model
const mongoose = require("mongoose");
const adminSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
});

var Admin = mongoose.model("TaskAdmin",adminSchema);
module.exports=Admin //adminData