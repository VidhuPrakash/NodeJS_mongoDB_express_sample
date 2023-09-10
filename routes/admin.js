var express = require('express');
var router = express.Router();
const userReg= require("../models/data");  


//adminpage showing user data
router.get('/', async(req, res)=> {
    try{
     let userRegList;
     if (req.query.results) {
       userRegList = JSON.parse(decodeURIComponent(req.query.results));
     } else {
       userRegList = await userReg.find({}).lean();
     }
     if (!userRegList || userRegList.length === 0) {
       return res.render('admin',{Nouser:"No user found",admin:true,});
     }
     res.render('admin',{userRegList,admin:true});
    }catch(err){
     console.error(err);
     res.status(500).send('An error occurred while retrieving the users.');
    }
   });
   

  router.post('/delete', async (req, res) => {
    try {
        console.log("id:",req.body._id)
        await userReg.findByIdAndDelete(req.body._id);
      res.redirect('/admin');
    } catch (err) {
      console.log(err);
      res.status(500).send({message: err.message});
    }
  });

  router.post('/update', async (req, res) => {
    try {
      const { _id, name, email } = req.body;
      await userReg.findByIdAndUpdate(_id, { name, email });
      res.redirect('/admin');
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  });


  router.post('/search', async (req, res) => {
    try {
        const query = req.body.search;
        const results = await userReg.find({ name: query });
        res.redirect('/admin?results=' + encodeURIComponent(JSON.stringify(results)));
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while performing the search.');
    }
});


  
  module.exports = router;