var express = require('express');
var router = express.Router();
// const userReg= require("../models/data")
var Person = require("../models/data")

// login page middleware
router.get('/login', function(req, res) {
  res.render('login');
});


router.post('/login', async function(req, res) {
  var userInfo = req.body;
  console.log(userInfo)
  if(!userInfo.email||!userInfo.password){
    res.render('login',{
      message:"Sorry, you provide wrong info"
    });

  }else{
    try {
      var user = await Person.findOne({email:userInfo.email});
      if(user){
        if(user.password === userInfo.password){
          console.log('Login successful');
          req.session.loggedIn = userInfo.email;
          res.cookie('name', 'userInfo.email');
          console.log('Cookies: ', req.cookies);
          req.session.email = req.body.email;
          res.render('home');
        } else {
          console.log('Wrong password');
          res.render('login',{
            message:"Wrong password"
          });
        }
      } else {
        console.log('User not found');
        res.render('login',{
          message:"User not found"
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  
});

// signup page middleware
router.get('/signup', function(req, res) {
  res.render('signup');
});
router.post('/signup',async(req, res)=>{
  var personInfo = req.body;
  if(!personInfo.name||!personInfo.email||!personInfo.password||!personInfo.repassword){
    res.render('signup',{
      message:"sorry,you provided wrong info"
    });
  }
  if(personInfo.password!=personInfo.repassword){
    res.render('signup',{
      passmessage:"Passwords doesn't match"
    });
  }
  else{
    var userInfo = req.body;
    var newPerson = await new Person({
      name:userInfo.name,
      email:userInfo.email,
      password:userInfo.password,
      repassword:userInfo.repassword
    });
    try {
      console.log(userInfo);
      await newPerson.save();
      console.log('Document added');
      req.session.loggedIn = newPerson.email;
      res.render('home');
    } catch (err) {
      console.log(err);
    }
  }
});




//adding user personal data
// router.get('/insert',(req,res)=>{
//   res.render('insert');
// })

// router.post('/insert',async(req,res)=>{
//  var addPersonalData = req.body;
//  console.log(addPersonalData); 
//  if (req.session.loggedIn) {
//   try {
//     // Find logged-in user and update their document with new personal data
//     await Person.updateOne({ email: req.session.loggedIn }, { $set: addPersonalData });
//     console.log('Document updated',req.session.loggedIn,);
//     res.render('personalData', { data: addPersonalData });
//   } catch (err) {
//     console.log(err);
//   }
// } else {
//   console.log('User not logged in');
// }
// });

// router.get('/personaldata',async(req,res)=>{
//   if (req.session.loggedIn) {
//     try {
//       let user = await Person.findOne({ email: req.session.loggedIn });
//       if(user){ // Find logged-in user and retrieve their personal data
//       let personalData = {
//         birthday: user.birthday,
//         phonenumber: user.phonenumber,
//         address: user.address,
//         // Add other personal data fields here
//       };
//       console.log('Personal data retrieved');

//       // Render personalData view and pass personal data as a variable
//       res.render('personalData', { data: personalData });
//     }else{
//       console.log("User not found")
//     }
//     } catch (err) {
//       console.log(err);
//     }
//   } else {
//     console.log('User not logged in');
//     res.redirect('/login');
//   }
// });
module.exports = router;
