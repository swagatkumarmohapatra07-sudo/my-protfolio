// 1. Mobile Menu Functionality
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// 2. Theme Toggle & Persistent Memory
const themeToggle = document.querySelector('#theme-toggle');
const body = document.body;

// Load saved theme from browser storage
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    themeToggle.classList.replace('bx-moon', 'bx-sun');
}

themeToggle.onclick = () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        themeToggle.classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('theme', 'dark');
    }
};

// 3. Tech Clock & Dynamic Greeting Logic
function updateClock() {
    const clock = document.getElementById("live-clock");
    const greeting = document.getElementById("dynamic-greeting");
    if (!clock || !greeting) return;

    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
    
    const hr = now.getHours();
    if (hr < 12) greeting.textContent = "Good Morning";
    else if (hr < 18) greeting.textContent = "Good Afternoon";
    else greeting.textContent = "Good Evening";
}
setInterval(updateClock, 1000);
updateClock(); // Initial call

// 4. Dazzling Stars Generator
const dazzle = document.querySelector(".dazzle-container");
if (dazzle) {
    for (let i = 0; i < 50; i++) {
        const star = document.createElement("div");
        star.className = "dazzle-star";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = star.style.height = `${Math.random() * 2 + 1}px`;
        star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
        dazzle.appendChild(star);
    }
}

// 6. Scrolling UI Logic (Sticky Header & Active Links)
window.onscroll = () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    const backToTop = document.querySelector('#backToTop');
    if (backToTop) backToTop.classList.toggle('active', window.scrollY > 500);

    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');
    
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + sec.offsetHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const targetLink = document.querySelector('header nav a[href*=' + id + ']');
                if (targetLink) targetLink.classList.add('active');
            });
        }
    });

    // Close mobile menu on scroll
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// 7. Library Initializations (Typed.js & ScrollReveal)
new Typed('.typing-text', {
    strings: ['Data Analyst .', 'Full-Stack Web Developer .', 'Problem Solver .', 'Quick learner .'],
    typeSpeed: 100, backSpeed: 60, loop: true
});

const sr = ScrollReveal({ distance: '80px', duration: 2000, delay: 200 });
sr.reveal('.home-content, .heading, .hero-features', { origin: 'top' });
sr.reveal('.project-card, .skill-category-box, .contact form, .timeline-item, .edu-card, .service-card', { 
    origin: 'bottom', 
    interval: 200 
});

// 8. Contact Form Submission Logic (AJAX)
var form = document.getElementById("my-form");
if (form) {
    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        var status = document.getElementById("my-form-status");
        status.innerHTML = "Sending...";
        
        fetch(event.target.action, {
            method: 'POST',
            body: new FormData(event.target),
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                status.innerHTML = "Success! Message sent.";
                status.classList.add("success");
                form.reset();
            } else {
                status.innerHTML = "Oops! Submission error.";
            }
        }).catch(error => {
            status.innerHTML = "Connection error. Please try again.";
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu, Theme, Stars, and Cursor logic remains the same...

    // 2. Functional Formspree Logic
    const form = document.getElementById("my-form");
    const status = document.getElementById("my-form-status");
    const submitBtn = document.getElementById("submit-btn");

    if (form) {
        form.addEventListener("submit", async function(event) {
            event.preventDefault();
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = "Sending...";
            status.innerHTML = "";

            const formData = new FormData(event.target);

            fetch(event.target.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    status.innerHTML = "Success! Message sent to Swagat's Gmail.";
                    status.className = "success";
                    form.reset();
                } else {
                    status.innerHTML = "Oops! Problem sending message.";
                    status.className = "error";
                }
            }).catch(error => {
                status.innerHTML = "Connection error. Try again.";
                status.className = "error";
            }).finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = "Send Message";
            });
        });
    }

    // 3. Tech Clock & Typing logic remains same...
});
const starField = document.getElementById("star-field");
const starCount = 120; // Total stars

for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    
    // Random Position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 3 + 2;

    if (Math.random() > 0.8) {
        star.className = "bg-star large";
        const size = Math.random() * 3 + 3; // 3px to 6px
        star.style.width = star.style.height = `${size}px`;
    } else {
        star.className = "bg-star small";
        const size = Math.random() * 2 + 1; // 1px to 3px
        star.style.width = star.style.height = `${size}px`;
    }

    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.setProperty('--duration', `${duration}s`);
    
    starField.appendChild(star);
}
document.addEventListener('DOMContentLoaded', () => {
    const mainNode = document.querySelector(".cursor-node-main");
    const trailNode = document.querySelector(".cursor-node-trail");
    const line = document.querySelector(".cursor-line");

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    // Only run on Desktop (screens wider than 768px)
    if (mainNode && window.innerWidth > 768) {
        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Instantly move the main point using GPU acceleration
            mainNode.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)`;
        });

        function animateCursor() {
            // Smooth "Lag" effect for the trail
            trailX += (mouseX - trailX) * 0.15;
            trailY += (mouseY - trailY) * 0.15;

            if (trailNode) {
                trailNode.style.transform = `translate3d(calc(${trailX}px - 50%), calc(${trailY}px - 50%), 0)`;
            }

            // Draw the connecting line
            if (line) {
                line.setAttribute("x1", mouseX);
                line.setAttribute("y1", mouseY);
                line.setAttribute("x2", trailX);
                line.setAttribute("y2", trailY);
            }

            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }
});
