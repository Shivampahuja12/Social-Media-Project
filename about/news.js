// --- STICKY NAVBAR SHADOW ON SCROLL ---
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        nav.classList.add("nav-fixed");
    } else {
        nav.classList.remove("nav-fixed");
    }
});


// --- DROPDOWN CATEGORY MENU ---
const dropdown = document.querySelector(".dropdown");
const dropdownTitle = dropdown.querySelector("h1");

// Create dropdown items dynamically
const menu = document.createElement("div");
menu.classList.add("dropdown-options");
menu.innerHTML = `
    <a href="#">Announcements</a>
    <a href="#">Product & Community</a>
    <a href="#">Life at Reddit</a>
    <a href="#">Policy & Safety</a>
`;
menu.style.display = "none";
dropdown.appendChild(menu);

dropdownTitle.addEventListener("click", () => {
    menu.style.display = menu.style.display === "none" ? "flex" : "none";
});


// --- SCROLL FADE-IN ANIMATION ---
const faders = document.querySelectorAll(".box, .section1, .dropdown, footer");

const appear = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

faders.forEach(el => appear.observe(el));


// --- SMOOTH SCROLL (Fixes page “jump” feeling) ---
document.documentElement.style.scrollBehavior = "smooth";



const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });