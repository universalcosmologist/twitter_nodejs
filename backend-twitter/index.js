const express=require('express');

const mongoose=require('mongoose');

const cors =require('cors');

const multer=require('multer');

const User=require('./models/user');

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

const app=express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/twitter');

app.get('/',(req,res)=>{
   return  res.json({message:'hello from backend !'});
})

app.get('/api/data',(req,res)=>{
    return res.json({message:'hello from backend !'});
})

app.post('/user/signup',upload.single('profilepicture'),async(req,res)=>{
    console.log(req.file);
    console.log(req.body);
    const {fullname,username,password}=req.body;
    await User.create({
      fullname,
      username,
      password,
      profileURL:`http://localhost:9002/uploads/${req.file.filename}`,
    });
  return res.json({'message':'user created'});
})

const port=9002;
app.listen(port,()=>{
    console.log(`server started at port ${port}`);
});









