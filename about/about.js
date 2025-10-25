// -------------- NAVBAR SHADOW ON SCROLL --------------
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        nav.style.boxShadow = "0px 2px 10px rgba(0,0,0,0.15)";
        nav.style.backgroundColor = "white";
    } else {
        nav.style.boxShadow = "none";
        nav.style.backgroundColor = "transparent";
    }
});


// // -------------- HOVER UNDERLINE EFFECT --------------
// const transitionParents = document.querySelectorAll(".transition-parent");

// transitionParents.forEach(parent => {
//     const underline = parent.querySelector(".transition");
//     parent.addEventListener("mouseenter", () => {
//         underline.style.width = "100%";
//         underline.style.transition = "width 0.3s ease";
//         underline.style.color = "black";
//     });

//     parent.addEventListener("mouseleave", () => {
//         underline.style.width = "0";
//         underline.style.transition = "width 0.3s ease";
//     });
// });


// -------------- NUMBER COUNTER ANIMATION --------------
function animateCounter(element, target) {
    let current = 0;
    const speed = 100; // lower = faster

    const update = () => {
        const increment = Math.ceil(target / speed);
        if (current < target) {
            current += increment;
            element.innerText = current + "+";
            requestAnimationFrame(update);
        } else {
            element.innerText = target + "+";
        }
    };
    update();
}

const counters = document.querySelectorAll(".box h2");
let started = false;

window.addEventListener("scroll", () => {
    const section3 = document.querySelector(".section3");
    const sectionTop = section3.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight && !started) {
        started = true;
        counters.forEach(counter => {
            const target = Number(counter.getAttribute("data-target"));
            animateCounter(counter, target);
        });
    }
});


// -------------- SMOOTH SCROLL FOR "Visit reddix" BUTTONS --------------
document.querySelectorAll(".navbutton").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const text = "The heart of the internet";
    const speed = 100; // typing speed in ms

    let i = 0;
    const heading = document.getElementById("typewriter");
    heading.textContent = ""; // start empty

    function typeEffect() {
        if (i < text.length) {
            heading.textContent += text.charAt(i);
            i++;
            setTimeout(typeEffect, speed);
        }
    }

    typeEffect();
});


  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });