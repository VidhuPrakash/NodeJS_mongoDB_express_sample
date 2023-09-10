var express =require('express');
// const { addPersonalData } = require('../models/data');
var router = express.Router();


// homepage
router.get('/',(req,res)=>{
    if(req.session.loggedIn){
    res.render('home');}
    else{
        res.redirect('index');
    }
    // addPersonalData(req.body,(result)=>{
    //     res.render('ok')
    // })
});




module.exports = router;