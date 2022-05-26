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
      include:[Post]
    })
    console.log(hbpost)
    const hbsdata = hbpost.get({plain:true})
    console.log(hbsdata)
    const logged_in= req.session.user?true:false
    res.render("dashboard", {
      logged_in,
      user:hbsdata,
      posts:hbsdata.posts,
      username:req.session.user?.username
    })
  });

  //dashboard
  router.get("/dashboard/:id", async (req,res) => {
    const hbpost = await Post.findByPk(req.params.id, {})
    console.log(hbpost)
    const logged_in= req.session.user?true:false
    res.render("editPost", {
      logged_in,
      user:hbpost,
      posts:hbpost.posts,
      username:req.session.user?.username
    })
  });

  module.exports = router;