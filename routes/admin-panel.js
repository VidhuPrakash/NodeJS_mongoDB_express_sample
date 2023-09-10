var express = require('express');
var router = express.Router();
const userReg= require("../models/admin-data");  
const Admin = require('../models/admin-data');
const async = require('hbs/lib/async');


// admin-login
router.get('/',(req,res)=>{
    res.render('admin-login');
});
router.post('/',async(req,res)=>{
    // res.render('admin-login');
    var adminfo = req.body;
    console.log(adminfo)
    if(!adminfo.email||!adminfo.password){
        res.render('show_message',{
          message:"Sorry, you provide wrong info", type:"error"
        });
    
      }else{
        try{
            var admin = await Admin.findOne({email:adminfo.email});
            if(admin){
                if(admin.password === adminfo.password){
                    console.log('Login successful');
                    req.session.AdminIn = true;
                    res.cookie('name', 'adminfo.email');
                    console.log('Cookies: ', req.cookies);
                    req.session.email = req.body.email;
                    res.redirect('admin');
                  } else {
                    console.log('Wrong password');
                    res.render('show_message',{
                        message:"Wrong password",type:"error"
                    });
            }
        }else{
                console.log("Admin not found");
                res.render("show_message",{
                    message:"You are not Admin!!!! This incident will be reported",type:"error"
                });
        }
      }catch(err){
        console.log(err);
      }
    }
});

//admin register
router.get('/adm-reg',(req,res)=>{
    res.render('admin-register')
});
router.post('/adm-reg',async(req,res)=>{
    var admInfo = req.body;
  console.log(admInfo);
  if(!admInfo.email||!admInfo.password||!admInfo.repassword){
    res.render('show_message',{
      message:"sorry,you provided wrong info",type:"error"
    });
  }else{
    var newAdmin = await new Admin({
        email:admInfo.email,
        password:admInfo.password,
        repassword:admInfo.repassword
    });
    try{
        await newAdmin.save();
        console.log('Admin added');
        req.session.AdminIn = true;
        res.redirect('admin');
    }catch(err){
        console.log(err);
    }
}

});
module.exports =router;