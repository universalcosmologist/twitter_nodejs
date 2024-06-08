const mongoose=require('mongoose');

const CommentSchema=new mongoose.Schema({
    commentcontent:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    createdFor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'tweet',
    },
},{timestamps:true});

const Comment=mongoose.model('comment',CommentSchema);

module.exports=Comment;