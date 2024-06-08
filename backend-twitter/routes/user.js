const express=require('express');
const mongoose=require('mongoose');
const User=require('../models/user');
const Tweet=require('../models/tweet');
const Comment=require('../models/comment');
const {tokengeneration,tokenverification}=require('../middlewares/auth');
const multer=require('multer');
const path=require('path');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'public','uploads'));
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});
const upload=multer({storage:storage});
const router=express.Router();

router.get('/profile',async(req,res)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader.split(' ')[1];
    if(token!=='null'){
        tokenverification(token)
        .then(user=>{
            return res.json({url:user.profileURL});
        })
        .catch(()=>{
            console.log('error occured could not get url');
        })
    }
    else{
        return res.json({error:"login is required"});
    }
})

router.post('/signin',async(req,res)=>{
    const {username,password}=req.body;
    try{
       const user= await User.findOne({username:username,password:password});
       if(!user){
         return res.json({error:'user not found'});
       }
       else{
        const token=tokengeneration(user);
         return res.json({token:`${token}`});
       }
    }catch(error){
        console.log(`error has occured ${error}`);
    }
})

router.post('/search',async(req,res)=>{
    const {username}=req.body;
    const user=await User.findOne({username:username});
   if(user){
    const TweetCollection=await Tweet.find({createdBy:user._id});
    return res.json({tweets:TweetCollection,username:user.username});
   }
   else{
    return res.json({error:'username entered is not valid'});
   }
})

router.post('/signup',upload.single('profilepicture'),async(req,res)=>{
    const {fullname,username,password}=req.body;
    await User.create({
      fullname,
      username,
      password,
      profileURL:`http://localhost:9002/uploads/${req.file.filename}`,
    });
  return res.json({'message':'user created'});
})

module.exports=router;