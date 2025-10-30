"use strict";


const joinBtns = document.querySelectorAll(".join");



// join -> joined
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


// mode switch hoo raha hai yaha pe 
const modeSwitch = document.querySelector(".nightMode");

document.addEventListener('DOMContentLoaded', function() {
  const nightModeToggle = document.querySelector('.nightMode');
  
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'light' || (!currentTheme && !prefersDarkScheme.matches)) {
    enableLightMode();
  } else {
    document.body.classList.remove('light-mode');
  }
  
  nightModeToggle.addEventListener('click', function() {
    if (document.body.classList.contains('light-mode')) {
      disableLightMode();
    } else {
      enableLightMode();
    }
  });
  
  function enableLightMode() {
    document.body.classList.add('light-mode');

    nightModeToggle.src = `sun.png`;
    nightModeToggle.style.filter = 'invert(0.4)';
    localStorage.setItem('theme', 'light');
  }
  
  function disableLightMode() {
    document.body.classList.remove('light-mode');
    nightModeToggle.src = `moon.png`;
    nightModeToggle.style.filter = 'invert(0.8)'; 
    localStorage.setItem('theme', 'dark');
  }
});






