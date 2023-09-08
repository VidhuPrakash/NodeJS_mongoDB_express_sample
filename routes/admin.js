var express = require('express');
var router = express.Router();
const userReg= require("../models/data")

router.get('/', async(req, res)=> {
    const users = await userReg.find() 
    res.render('admin', { users });
    console.log(users)
  });

  module.exports = router;