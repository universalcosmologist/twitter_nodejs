const jwt=require('jsonwebtoken');
const User=require('../models/user');
const secret='figdp28%';

function tokengeneration(user){
   const payload={
    username:user.username,
   };
   const token=jwt.sign(payload,secret);
   return token;
}

async function tokenverification(token){
   try{
    const payload=jwt.verify(token,secret);
    const user=await User.findOne({username:`${payload.username}`});
    return user;
   }catch(error){
    console.log('user cant be found');
   }
}

module.exports={
    tokengeneration,
    tokenverification,
}
