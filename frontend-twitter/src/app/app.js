const token=localStorage.getItem('token');
const logout =document.getElementById('logout');
const yourtweets=document.getElementById('yourtweets');
const searchform=document.getElementById('searchandread');
const image=document.querySelector('img');
const tweet_container=document.getElementById('tweet_container');
window.addEventListener('DOMContentLoaded',async(e)=>{
    if(!localStorage.getItem('token')){
        logout.innerText='Sign In';
        yourtweets.style.display='none';
    }
    if(localStorage.getItem('token')){
        const url='http://localhost:9002/user/profile';
       await fetch(url,{
          method:'GET',
          headers:{
              'Authorization':`Bearer ${token}`,
          },
        })
        .then(response=>response.json())
        .then(data=>{
            image.src=data.url;
        })
        .catch(error=>{
            console.log('error occured', error);
        })
    }
})

logout.addEventListener('click',(e)=>{
    if(logout.innerText==='Log Out'){
            localStorage.removeItem('token');
    }
})

searchform.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const username=document.getElementById('_username').value;
    const url='http://localhost:9002/user/search';

    await fetch(url,{
        method:'POST',
        headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json',
        },
        body:JSON.stringify({username}),
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.error){
            window.alert('entered username is non-existent !');
        }
        else{
            tweet_container.innerHTML=`<p style="color:white;">Posted by ${data.username}</p>`
            data.tweets.forEach(tweet => {
                const tweetHTML=`<div class="tweet">
                <p>${tweet.tweetContent}</p>
                <form id="reactform" class="symbols">
                 <button class="like" data-id="${tweet._id} type="submit" name="like">&hearts;</button>
                 <button class="comment" data-id="${tweet._id}" type="submit" name="comment">&#9729;</button>
                </form>
                </div>`
                tweet_container.innerHTML+=tweetHTML;
            });
        }
    })
    .catch();
    const commentboxes=document.getElementsByClassName('comment');
    Array.from(commentboxes).forEach((box)=>{
        box.addEventListener('click',(e)=>{
            e.preventDefault();
            window.location.href=`../tweet/comment.html?tweet=${e.target.dataset.id}`;
        })
    })

    const likeboxes=document.getElementsByClassName('like');
    Array.from(likeboxes).forEach((box)=>{
        box.addEventListener('click',(e)=>{
            e.preventDefault();
            window.location.href=`../tweet/like.html?tweet=${e.target.dataset.id}`;
        })
    })

})
