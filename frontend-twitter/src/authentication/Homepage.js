const signinform=document.getElementById('signin-form');
const showsignup=document.getElementById('take_tosignup');

signinform.addEventListener('submit',async (e)=>{
    e.preventDefault();

    const username=document.getElementById('username').value;
    const password=document.getElementById('password').value;
    const url='http://localhost:9002/user/signin'
     
    await fetch(url,{
         method:'POST',
         headers:{
            'Content-Type':'application/json'
         },
         body:JSON.stringify({username,password})
    })
    .then(response=>response.json())
    .then(data=>{
       if(data.error){
         window.alert('login failed , enter correct username or password');
       }
       else{
        localStorage.setItem('token',data.token);
        window.location.href='../app/app.html';
       }
    })
    .catch(error=>{
        console.log('error occured');
    })
})

showsignup.addEventListener('submit',async(e)=>{
    e.preventDefault();
    window.location.href='./signup.html';
})