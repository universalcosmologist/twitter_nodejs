const token=localStorage.getItem('token');
const urlParams = new URLSearchParams(window.location.search);
const tweetid=urlParams.get('tweet');
const form=document.getElementById('commentform');
const messagedisplay=document.getElementById('messagedisplay');
const commentcontainer=document.getElementById('_container');
const header=document.getElementById('comment_title');


window.addEventListener('DOMContentLoaded',async(e)=>{
   const url='http://localhost:9002/tweet/loadcomments';

   await fetch(url,{
     method:'POST',
     headers:{
        'Authorization':`Bearer ${token}`,
        'Content-Type':'application/json',
     },
     body:JSON.stringify({tweetid}),
   })
   .then(response=>response.json())
   .then(data=>{
      if(data.comments){
        header.innerText=`Comments(${data.comments.length})`
        data.comments.forEach((comment,index)=> {
             commentcontainer.innerHTML+=`
             <div>${index+1})-${comment.commentcontent}</div>
             `
        });
      }
   })
   .catch((error)=>{
    console.log('error has occured ' ,error);
   })
   
})

form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const url='http://localhost:9002/tweet/comment';

    const commentcontent=document.getElementById('_content').value;
    await fetch(url,{
       method:'POST',
       headers:{
        'Authorization':`Bearer ${token}`,
        'Content-Type':'application/json',
        'Tweet-Id':`${tweetid}`,
       },
       body:JSON.stringify({commentcontent}),
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.message){
            document.getElementById('_content').value='';
            messagedisplay.textContent='Your comment was uploaded !';
        }
    })
    .catch(error=>{
        console.log('error has occured ' ,error);
    });
})