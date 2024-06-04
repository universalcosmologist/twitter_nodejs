const formData=new FormData();
const form=document.getElementById('signup-form')

form.addEventListener('submit',async(e)=>{
    e.preventDefault();
   const username=document.getElementById('username').value;
   const password=document.getElementById('password').value;
   const fullname=document.getElementById('fullname').value;
   const fileInput=document.getElementById('profilepicture');
     formData.append('fullname',fullname);
     formData.append('profilepicture',fileInput.files[0]);
     formData.append('username',username);
     formData.append('password',password);
     const url='http://localhost:9002/user/signup';

     await fetch(url,{
       method:'POST',
       header:{
        'Content-Type':'multipart/form-data'
       },
       body:formData
     })
     .then(response=>response.json())
     .then(data=>{
        console.log(data);
     })
     .catch(error=>console.log('error has occured'))
})