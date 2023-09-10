// middleware to create user model
    const mongoose = require("mongoose");

    const personSchema=mongoose.Schema({
        name:String,
        email:String,
        password:String,
        repassword:String,
        birthday:Date,
        phonenumber:String,
        address:String 
    });
    var Person = mongoose.model("person",personSchema);
    module.exports = Person//PersonalData
