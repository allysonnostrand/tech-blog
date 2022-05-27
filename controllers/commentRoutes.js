const express = require("express");
const router = express.Router();
const {User,Post,Comment} = require("../models/");

//find all comments
router.get("/", (req, res) => {
  Comment.findAll({
    include:[User, Post]
  })
    .then(allComments => {
      res.json(allComments);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//find one comment
router.get("/:id", (req, res) => {
  Comment.findByPk(req.params.id,{
      include: [User, Post]
  })
    .then(oneComment => {
      res.json(oneComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//create new comment
router.post("/:id", (req, res) => {
 Comment.create({
        title:req.body.title,
        text:req.body.text,
        user_id:req.session.user.id,
        post_id:req.params.id
    }).then (newComment => {
      res.json(newComment);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//update comment
router.put("/:id",(req,res)=>{
    Comment.update(req.body,{
        where: {
            id: req.params.id
        }
    }).then (upComment => {
        res.json(upComment);
    }).catch (err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err});
    })
  })
  

//delete comment
router.delete("/:id",(req,res)=>{
  Comment.destroy({
      where: {
          id: req.params.id
      }
  }).then (delComment => {
      res.json(delComment);
  }).catch (err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err});
  })
})

module.exports = router;
