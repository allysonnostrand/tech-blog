const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');
// const sequilize = require("sequelize");

router.get("/", async (req, res) => {
    const hbpost = await Post.findAll({
      include:[User, Comment]
    })
    const mhbpost = hbpost.map(user=>user.get({plain:true}))
    console.log(mhbpost)
    const logged_in= req.session.user?true:false
    res.render("home",{
        logged_in,
        user:mhbpost,
        posts:mhbpost,
        username:req.session.user?.username
    })
  });

  router.get("/login", async (req,res) => {
    res.render("login")
  })
  
  module.exports = router;