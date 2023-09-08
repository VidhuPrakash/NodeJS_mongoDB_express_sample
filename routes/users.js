var express = require('express');
var router = express.Router();
// const userReg= require("../models/data")
var Person = require("../models/data")

/* GET users listing. */
router.get('/login', function(req, res) {
  res.render('login');
});


router.post('/login', async function(req, res) {
  var userInfo = req.body;
  console.log(userInfo)
  if(!userInfo.email||!userInfo.password){
    res.render('show_message',{
      message:"Sorry, you provide wrong info", type:"error"
    });

  }else{
    try {
      var user = await Person.findOne({email:userInfo.email});
      if(user){
        if(user.password === userInfo.password){
          console.log('Login successful');
          req.session.loggedIn = true;
          req.session.email = req.body.email;
          res.render('home');
        } else {
          console.log('Wrong password');
          res.render('show_message',{
            message:"Wrong password", type:"error"
          });
        }
      } else {
        console.log('User not found');
        res.render('show_message',{
          message:"User not found", type:"error"
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  
});


router.get('/signup', function(req, res) {
  res.render('signup');
});
router.post('/signup',async(req, res)=>{
  var personInfo = req.body;
  console.log(personInfo);
  if(!personInfo.name||!personInfo.email||!personInfo.password||!personInfo.repassword){
    res.render('show_message',{
      message:"sorry,you provided wrong info",type:"error"
    });
  }else{
    var newPerson = await new Person({
      name:personInfo.name,
      email:personInfo.email,
      password:personInfo.password,
      repassword:personInfo.repassword
    });
    try {
      await newPerson.save();
      console.log('Document added');
      req.session.loggedIn = true;
      res.render('home');
    } catch (err) {
      console.log(err);
    }
  }
});




//adding user personal data
router.get('/insert',(req,res)=>{
  res.render('insert');
})

router.post('/insert',async(req,res)=>{
 var addPersonalData = req.body;
 console.log(addPersonalData); 
 if (req.session.loggedIn) {
  try {
    // Find logged-in user and update their document with new personal data
    await Person.updateOne({ email: req.session.email }, { $set: addPersonalData });
    console.log('Document updated',req.session.email,);
    res.render('personalData', { data: addPersonalData });
  } catch (err) {
    console.log(err);
  }
} else {
  console.log('User not logged in');
}
});

router.get('/personaldata',async(req,res)=>{
  if (req.session.loggedIn) {
    try {
      let user = await Person.findOne({ email: req.session.email });
      if(user){ // Find logged-in user and retrieve their personal data
      let personalData = {
        birthday: user.birthday,
        phonenumber: user.phonenumber,
        address: user.address,
        // Add other personal data fields here
      };
      console.log('Personal data retrieved');

      // Render personalData view and pass personal data as a variable
      res.render('personalData', { data: personalData });
    }else{
      console.log("User not found")
    }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('User not logged in');
    res.redirect('/login');
  }
});
module.exports = router;
