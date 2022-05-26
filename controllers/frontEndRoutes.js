const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');

  //home page
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

  //login page
  router.get("/login", async (req,res) => {
    res.render("login")
  });

  //dashboard
  router.get("/dashboard", async (req,res) => {
    const hbpost = await User.findByPk(req.session.user.id, {
      include:[Post, Comment]
    })
    console.log(hbpost)
    const logged_in= req.session.user?true:false
    res.render("dashboard", {
      logged_in,
      user:hbpost,
      posts:hbpost,
      username:req.session.user?.username
    })
  });

  module.exports = router;