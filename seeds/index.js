const sequelize = require("../config/connection")
const {User,Post,Comment} = require("../models")

const user = [{
    username: "test",
    password: "password"
},
{
    username: "test2",
    password: "password"
},
{
    username: "test3",
    password: "password"
}]

const post = [{
    title: "this is a test",
    text: "this is a test text for the test",
    user_id: "1"
},
{
    title: "this is another test",
    text: "this is another test text for the test",
    user_id: "2"
},
{
    title: "this is again another test",
    text: "this is again another test text for the test",
    user_id: "3"
}]

const comment = [{
    text: "yeah this is a comment",
    post_id: 1,
    user_id: 3
},
{
    text: "yeah this is another comment",
    post_id: 2,
    user_id: 2
},
{
    text: "yeah this is again another comment",
    post_id: 3,
    user_id: 1
}]

const feedSeed = async () => {
    await sequelize.sync({force:true})
    try{
        await User.bulkCreate(user);
        await Post.bulkCreate(post);
        await Comment.bulkCreate(comment);
    } catch (err){
        console.log(err);
    }
}

feedSeed();