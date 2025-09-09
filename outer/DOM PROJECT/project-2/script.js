"use strcit";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const clsBtn = document.querySelector(".close-modal");
const opnBtns = document.querySelectorAll(".show-modal");

const close = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const open = function () {
  // console.log(opnBtns[i].textContent);
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

for (let i = 0; i < opnBtns.length; i++) {
  opnBtns[i].addEventListener("click", open);
}

clsBtn.addEventListener("click", close);

overlay.addEventListener("click", close);

// Key press

document.addEventListener("keydown", function (event) {
  if (event.key == "Escape") {
    if (!modal.classList.contains("hidden")) {
      close();
    }
  }
});
