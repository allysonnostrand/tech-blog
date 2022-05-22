const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');
const sequilize = require("sequelize");

router.get("/", async (req, res) => {
    const logged_in= req.session.user?true:false
    const hbpost = await Post.findAll({
      include:[User, Comment]
    })
    console.log(hbpost)
    res.render("home",{
        logged_in,
        user:hbpost,
        posts:hbpost
    })
  });

  module.exports = router;