var express =require('express');
var router = express.Router();

router.get("/",(req,res)=>{
    req.session.loggedIn = false;
    // req.session.email = null;
    res.render('index');
  });

  module.exports=router;