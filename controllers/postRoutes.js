const express = require("express");
const router = express.Router();
const {User,Post,Comment} = require("../models/");

//find all posts
router.get("/", (req, res) => {
  Post.findAll({
    include:[User, Comment]
  })
    .then(allPosts => {
      res.json(allPosts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//find one post
router.get("/:id", (req, res) => {
  Post.findByPk(req.params.id,{
      include: [User, Comment]
  })
    .then(onePost => {
      res.json(onePost);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//create new post
router.post("/", (req, res) => {
  Post.create(req.body)
    .then(newPost => {
      req.body.post = {
        title:newPost.title,
        text:newPost.text
      }
      res.json(newPost);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//update post
router.put("/:id",(req,res)=>{
    Post.update(req.body,{
        where: {
            id: req.params.id
        }
    }).then (upPost => {
        res.json(upPost);
    }).catch (err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err});
    })
  })
  

//delete post
router.delete("/:id",(req,res)=>{
  Post.destroy({
      where: {
          id: req.params.id
      }
  }).then (delPost => {
      res.json(delPost);
  }).catch (err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err});
  })
})

module.exports = router;
