"use strict";

const changeTheme = document.getElementById("toggle-theme");
console.log(changeTheme);

const calculator = document.querySelector(".calculator");
console.log(calculator);

const display = document.querySelector(".display");

let change = 0; //Dark-Mode

changeTheme.addEventListener("click", function () {
  if (change === 0) {
    document.querySelector("body").style.background = "#a7a7a7";
    changeTheme.textContent = "☀️";
    change = 1;

    calculator.style.background = "#8f8f8f";
  } else {
    document.querySelector("body").style.background =
      "linear-gradient(to right, #434343, #000000)";

    changeTheme.textContent = "🌙";
    change = 0;

    calculator.style.background = "#1c1c1c";
  }
});

const btns = document.querySelectorAll(".btn");

console.log(btns);
let arr = [];
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    const value = btns[i].textContent;

    if (value === "=") {
      let result = eval(arr.join(""));
      display.textContent = "Iloveyou Isha";
      arr = [result.toString()];
      display.style.background = "green";
    } else if (value === "C") {
      arr.splice(0, arr.length);
      display.textContent = arr.join("");
    } else if (value === "⌫") {
      arr.pop();
      display.textContent = arr.join("");
    } else {
      arr.push(value);
      display.textContent = arr.join("");
      // console.log(arr);
    }
  });
}

// Key - event

let validKey = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];

document.addEventListener("keydown", function (event) {
  console.log(event.key);

  if (validKey.includes(event.key)) {
    arr.push(event.key);
    display.textContent = arr.join("");
  } else if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "/"
  ) {
    arr.push(event.key);
    display.textContent = arr.join("");
  } else if (event.key === "Enter") {
    let result = eval(arr.join(""));
    display.textContent = result;
    arr = [result.toString()];
  } else if (event.key === "Backspace") {
    arr.pop();
    display.textContent = arr.join("");
  }
});
