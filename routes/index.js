var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  if(req.session.loggedIn){
    res.render('home');}
    else{
      res.render('index');
    }
  
});
// router.get('/logout',function(req,res){
//   req.session.loggedIn=false;
//   res.redirect('index');
// });

module.exports = router;
