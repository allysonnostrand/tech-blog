const express = require("express");
const router = express.Router();
const {User,Post,Comment} = require("../models/");
const bcrypt  = require("bcrypt");

//find all
router.get("/", (req, res) => {
  User.findAll({
    include:[Post, Comment]
  })
    .then(allUsers => {
      res.json(allUsers);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//find one
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id,{
      include: [Post, Comment]
  })
    .then(oneUser => {
      res.json(oneUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//signup
router.post("/", (req, res) => {
  User.create(req.body)
    .then(newUser => {
      req.session.user = {
        id:newUser.id,
        username:newUser.username
      }
      res.json(newUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//login
router.post("/login", (req, res) => {
  User.findOne({
    where:{
    username:req.body.username
  }
}).then(foundUser=>{
    if(!foundUser){
      return res.status(400).json({msg:"wrong login credentials"})
    }
    if(bcrypt.compareSync(req.body.password,foundUser.password)){
      req.session.user = {
        id:foundUser.id,
        username:foundUser.username
      }
      return res.json(foundUser)
    } else {
      return res.status(400).json({msg:"wrong login credentials"})
    }
  }).catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//logout
router.get("/logout",(req,res)=>{
  req.session.destroy();
  res.json({msg:"logged out!"});
})

module.exports = router;
