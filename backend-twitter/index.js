const express=require('express');

const cors =require('cors');

const mongoose=require('mongoose');

const user_router=require('./routes/user');

const tweet_router=require('./routes/tweet');

mongoose.connect('mongodb://127.0.0.1:27017/twitter');

const app=express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/user',user_router);
app.use('/tweet',tweet_router);

const port=9002;
app.listen(port,()=>{
    console.log(`server started at port ${port}`);
});









