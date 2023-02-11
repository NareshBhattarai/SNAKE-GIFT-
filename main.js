let playBoard=document.querySelector(".play-board");
let controls=document.querySelectorAll(".icon i");
let scoreElement=document.querySelector(".score");
let highScoreElement=document.querySelector(".high-score");

let gameOver=false;
let foodX,foodY;
let snakeX=5,snakeY=10;
let snakeBody=[];
let velocityX=0,velocityY=0;
let setIntervalid;
let score=0;


const changeFoodPosition=()=>{
  foodX=Math.floor(Math.random()*30)+1;
  foodY=Math.floor(Math.random()*30)+1;
}

const handleGameOver=()=>{
  clearInterval(setIntervalid);
  alert("Game Over, I LOVE YOU PUSPA♥️");
  location.reload();
}

const changeDirection=(e)=>{
  if(e.key==='ArrowUp' && velocityY !=1){
    velocityX=0;
    velocityY=-1;
  }else if(e.key==='ArrowDown' && velocityY !=-1 ){
    velocityX=0;
    velocityY=1;
  }else if(e.key==='ArrowLeft' && velocityX !=1){
    velocityX=-1;
    velocityY=0;
  }else if(e.key==='ArrowRight' && velocityX != -1){
    velocityX=1;
    velocityY=0;
    }
}
controls.forEach((key)=>{
  
  key.addEventListener('click',()=>{
    changeDirection({key:key.dataset.key})
    
  })
  
})


const initgame=()=>{
  if(gameOver) return handleGameOver();
  let htmlMarkup=`<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;
   
   if(snakeX===foodX && snakeY===foodY){
     changeFoodPosition();
     snakeBody.push([foodX,foodY]);
     score++;
    
 

  if(score > localStorage.getItem("highscore")){
    
    localStorage.setItem("highscore",score);
  }
    
    
     
     
     
 scoreElement.innerHTML=`Score: ${score}`
 
 
 
   }
   
   for(let i= snakeBody.length -1;i>0;i--){
     snakeBody[i]=snakeBody[i-1];
     
   }
   
   snakeBody[0]=[snakeX,snakeY];
   
   snakeX +=velocityX;
   snakeY +=velocityY;
   
   if(snakeX<= 0 || snakeX >30 || snakeY <=0 || snakeY>30){
     gameOver=true;
   }
   for(i=0;i< snakeBody.length;i++){
        htmlMarkup +=`<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
   }
   

   playBoard.innerHTML=htmlMarkup;
}

changeFoodPosition();
setIntervalid=setInterval(initgame,125);

document.addEventListener('keydown',changeDirection);

let nb=localStorage.getItem("highscore");
highScoreElement.innerHTML=`High Score: ${nb}`