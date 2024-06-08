const form=document.getElementById('posttweet');
const token=localStorage.getItem('token');
form.addEventListener('submit',async(req,res)=>{
    const tweetcontent=document.getElementById('textarea').value;
    const url='http://localhost:9002/tweet/post';
    await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
             'Authorization':`Bearer ${token}`,
        },
        body:JSON.stringify({tweetcontent}),
    })
    .then(response=>response.json())
    .then(data=>{
        if (data.error) {
            window.alert('you need to login first');
          } 
          else if (data.message) {
               window.location.href='../app/app.html';
          }
    })
    .catch(error=>{
        console.log(`error occured ${error}`)
    });
})