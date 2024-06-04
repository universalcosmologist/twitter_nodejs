const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profileURL:{
        type:String,
        required:false,
        default:'http://localhost:9002/uploads/default_profile_2.webp',
    }
},{timestamps:true});

const User=mongoose.model('user',UserSchema);

module.exports=User;