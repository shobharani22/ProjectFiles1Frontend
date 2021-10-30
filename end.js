const username=document.getElementById("Username");
const savebutton=document.getElementById("button");
const mostRecentscore=localStorage.getItem('mostRecentscore');
 const finalscoreinput=document.getElementById("finalscore");
finalscoreinput.innerText=mostRecentscore;
savehighscore=e=>{
     e.preventDefault();
    
}
 username.addEventListener('keyup',function(){
     savebutton.disabled=!username.value;
   }
   )