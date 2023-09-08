// var db=require("../config/connection")

// module.exports={
//     addPersonalData:(PerData,callback)=>{
//         console.log(PerData);
//         db.get().collection('user_personal_data').insertOne(PerData).then((data)=>{
//             callback(true);
//         })
//     }
// }
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

// const userDataSchema = mongoose.Schema({
//     birthday:Date,
//     phonenumber:String,
//     address:String
// })

var Person = mongoose.model("person",personSchema);
// var PersonalData = mongoose.model("personaldata",userDataSchema);
module.exports = Person//PersonalData







 //     function(err, Person){
  //     if(err)
  //        res.render('show_message', {message: "Database error", type: "error"});
  //     else
  //        res.render('show_message', {
  //           message: "New person added", type: "success", person: personInfo});
  //  }
   