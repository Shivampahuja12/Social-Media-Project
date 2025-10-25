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


// document.addEventListener("DOMContentLoaded", function () {
//     const text = "Empowering communities";
//     const speed = 100; // typing speed in ms

//     let i = 0;
//     const heading = document.getElementById("typewriter");
//     heading.textContent = ""; // start empty

//     function typeEffect() {
//         if (i < text.length) {
//             heading.textContent += text.charAt(i);
//             i++;
//             setTimeout(typeEffect, speed);
//         }
//     }

//     typeEffect();
// });


// ================== 1. STOP PAGE FROM JUMPING TO TOP ON REFRESH ==================
history.scrollRestoration = "manual";


// ================== 2. TYPEWRITER EFFECT ==================
const text = "Empowering communities";
const heading = document.getElementById("typewriter");
let i = 0;

function typeWriter() {
    if (i < text.length) {
        heading.innerHTML = text.substring(0, i + 1);
        i++;
        setTimeout(typeWriter, 80);
    }
}
typeWriter();


// ================== 3. SMOOTH SCROLL FOR NAV LINKS ==================
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");

        // If the link is not "#" then scroll smoothly
        if (href !== "#" && href.startsWith("#")) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// ================== 4. NAVBAR STAYS FIXED ON TOP AFTER SCROLL ==================
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        nav.classList.add("nav-fixed");
    } else {
        nav.classList.remove("nav-fixed");
    }
});


// ================== 5. FADE-IN ANIMATION ON SCROLL ==================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll("section, .cardtop1, .cardtop2, .cardtop3, .cardbottom1, .cardbottom2")
    .forEach(el => observer.observe(el));


const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});