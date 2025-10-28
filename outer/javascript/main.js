"use strict";


const joinBtns = document.querySelectorAll(".join");

for(let i = 0 ; i < joinBtns.length ; i++){
    joinBtns[i].addEventListener("click" , function(){
        console.log(joinBtns[i])
        if(joinBtns[i].textContent === "join"){
            joinBtns[i].textContent = "joined";
    
        }else{
            joinBtns[i].textContent = "join";
        }
    
    })
}


const likeBtns = document.querySelector(".likeBtns");

likeBtns.addEventListener("click" , function(){

    console.log(likeBtns.src)

    likeBtns.src = "Social-Media-Project/FEwMoreImages/heart.png";

    console.log(likeBtns.src)

})
