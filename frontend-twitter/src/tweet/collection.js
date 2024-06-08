const displayusername=document.getElementById('displayusername');
const displaycollection=document.getElementById('displaycollection');
const token=localStorage.getItem('token');
window.addEventListener('DOMContentLoaded',async(e)=>{
  e.preventDefault();
  const url='http://localhost:9002/tweet/collection';
  await fetch(url,{
    method:'GET',
    headers:{
        'Authorization':`Bearer ${token}`,
    },
  })
  .then(response=>response.json())
  .then(data=>{
     displayusername.innerText=`hi , ${data.username} here is collection of all your tweets`;
     data.collection.forEach(tweet => {
        const tweetspan=document.createElement('span');
        tweetspan.textContent=`tweet created at -: ${tweet.createdAt} - ${tweet.tweetContent}`;
        displaycollection.appendChild(tweetspan);
     });
  })
  .catch(error=>{
    console.log('erro has occured', error);
  })
})