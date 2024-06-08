const form=document.getElementById('signup-form')

form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const formData=new FormData();
   const username=document.getElementById('username').value;
   const password=document.getElementById('password').value;
   const fullname=document.getElementById('fullname').value;
   const fileInput=document.getElementById('profilepicture');
   if(username&&password&&fullname){
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
        if(data.message){
           window.location.href='./Homepage.html';
        }
    })
    .catch(error=>console.log('error has occured' , error))
   }
   else{
    window.alert('Name ,Username and Password are mandatory fields');
   }
})