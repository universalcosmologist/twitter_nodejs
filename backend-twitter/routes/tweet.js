const express=require('express');
const mongoose=require('mongoose');
const User=require('../models/user');
const Tweet=require('../models/tweet');
const Comment=require('../models/comment');
const {tokengeneration,tokenverification}=require('../middlewares/auth');
const router=express.Router();

router.post('/loadcomments',async(req,res)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader.split(' ')[1];
    const {tweetid}=req.body;
    const tweetid_inmongooseobject=new mongoose.Types.ObjectId(tweetid);
    if(token!=='null'){
       const comments=await Comment.find({createdFor:tweetid_inmongooseobject});
       return res.json({comments});
    }
    else{
        return res.json({error:"login is required"});
    }
})

router.get('/like',async(req,res)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader.split(' ')[1];
    const tweetid=req.headers['tweet-id'];
    const tweetid_inmongooseobject=new mongoose.Types.ObjectId(tweetid);
    if(token!=='null'){
        const tweet=await Tweet.findById(tweetid_inmongooseobject);
        await Tweet.updateOne({_id:tweet._id},{likes:tweet.likes+1});
    }
    else{
        return res.json({error:"login is required"});
    }
})

router.get('/collection',async(req,res)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader.split(' ')[1];
    if(token!=='null'){
        tokenverification(token)
        .then(async function(user){
           const collection=await Tweet.find({createdBy:user._id});
           return res.json({collection:collection,username:user.username});

        }).catch(()=>{
            console.log('error here couldnot get username');
        })
    }
    else{
        console.log('user was not logged in');
    }
})

router.post('/post',async (req, res) => {
    const { tweetcontent } = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
  
    if (token !== 'null') {
      try {
        const user = await tokenverification(token);
        const tweet = await Tweet.create({
          tweetContent: tweetcontent,
          createdBy: user._id,
        });
        return res.json({ message: "tweet created" });
      } catch (error) {
        console.log('error has occured in creating tweet');
      }
    } else {
      return res.json({ error: "login is required" });
    }
  })

router.post('/comment',async(req,res)=>{
    const {commentcontent}=req.body;
    const authHeader=req.headers['authorization'];
    const token=authHeader.split(' ')[1];
    const tweetid=req.headers['tweet-id'];
    const tweetid_inmongooseobject=new mongoose.Types.ObjectId(tweetid);
    if(token!=='null'){
        tokenverification(token)
        .then(async function(user){
            await Comment.create({
                commentcontent:commentcontent,
                createdBy:user._id,
                createdFor:tweetid_inmongooseobject,
            })
            return res.json({message:'comment has been created'});
        })
        .catch(()=>{
            console.log('error in creating comment');
        })
    }
    else{
         return res.json({error:'login is required'});
    }
})

module.exports=router;