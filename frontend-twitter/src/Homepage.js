const signinform=document.getElementById('signin-form');
const showsignup=document.getElementById('take_tosignup');

signinform.addEventListener('submit',async (e)=>{
    e.preventDefault();

    const email=document.getElementById('username').value;
    const password=document.getElementById('password').value;
    const url='http://localhost:9002/user/signin'
     
    await fetch(url,{
         method:'POST',
         headers:{
            'Content-Type':'application/json'
         },
         body:JSON.stringify({email,password})
    })
    .then(response=>response.json())
    .then(data=>console.log(data))
    .catch(error=>{
        console.log('error occured');
    })
})

showsignup.addEventListener('submit',async(e)=>{
    e.preventDefault();
    location.href='signup.html';
})