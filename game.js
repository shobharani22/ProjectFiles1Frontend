const question=document.getElementById('question');
const choices=Array.from(document.getElementsByClassName("choice-text"));
const questioncountertext=document.getElementById("questionCounter")
const scoretext=document.getElementById('score');
let currentquestion={};
let aceptinganswer=false;
let score=0;
let questioncounter=0;
let availablequestion=[];
let questions=[];
fetch("question.json").then(res=>{
    console.log(res)
    return res.json();
}).then(loadquestions=>{
    console.log(loadquestions);
    questions=loadquestions;
    startgame();
})
.catch(err=>{
    console.log(err);
});
const correct_bonus=10;
const max_question=4;
startgame=()=>{
    questioncounter=0;
    score=0;
    availablequestion=[...questions];
    console.log(availablequestion)
    getnewquestion();
};
getnewquestion=()=>{
    if(availablequestion.length===0  || questioncounter>=max_question){
        localStorage.setItem('mostRecentscore',score);
        return window.location.assign("./end.html");
    }
    questioncounter++;
    questioncountertext.innerHTML = questioncounter+"/"+max_question;
    
   const questionindex= Math.floor(Math.random()*availablequestion.length);
   currentquestion=availablequestion[questionindex];
   question.innerText=currentquestion.question;
choices.forEach(choice=>{
    const number=choice.dataset['number'];
    choice.innerText=currentquestion["choice"+number]
})
availablequestion.splice(questionindex,1);
aceptinganswer=true;

};
choices.forEach(choice=>{
    choice.addEventListener("click",e=>{
        if(!aceptinganswer)return;
        aceptinganswer=false;
        const selectedChoice=e.target;
        const selectedanswer=selectedChoice.dataset["number"];
        const classtoapply=selectedanswer==currentquestion.answer ?"correct":"incorrect";

        if(classtoapply==="correct")
            incrementscore(correct_bonus);
        
        selectedChoice.parentElement.classList.add(classtoapply);
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classtoapply);
            getnewquestion();
        },4000);
         
    });
});
incrementscore=(num)=>{
    score=score+num;
   scoretext.innerText=score;
}

