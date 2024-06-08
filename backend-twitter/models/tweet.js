const mongoose=require('mongoose');

const TweetSchema=new mongoose.Schema({
   tweetContent:{
    type:String,
    required:true,
   },
   createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
   },
   likes:{
    type:Number,
    required:false,
    default:0,
   },
},{timestamps:true});

const Tweet=mongoose.model('tweet',TweetSchema);

module.exports=Tweet;