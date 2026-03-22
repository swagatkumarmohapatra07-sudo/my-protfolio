// 1. Mobile Menu Functionality
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// 2. Dazzling Stars Generator
const dazzle = document.querySelector(".dazzle-container");
for (let i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.className = "dazzle-star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = star.style.height = `${Math.random() * 2 + 1}px`;
    star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
    dazzle.appendChild(star);
}

// 3. Neural Link Cursor Logic (Desktop Only)
const mainNode = document.querySelector(".cursor-node-main");
const trailNode = document.querySelector(".cursor-node-trail");
const line = document.querySelector(".cursor-line");
let mX = 0, mY = 0, tX = 0, tY = 0;

if (window.innerWidth > 768) {
    window.addEventListener("mousemove", (e) => {
        mX = e.clientX; mY = e.clientY;
        mainNode.style.left = `${mX}px`;
        mainNode.style.top = `${mY}px`;
    });

    function animateLink() {
        tX += (mX - tX) * 0.15;
        tY += (mY - tY) * 0.15;
        trailNode.style.left = `${tX}px`;
        trailNode.style.top = `${tY}px`;
        line.setAttribute("x1", mX); line.setAttribute("y1", mY);
        line.setAttribute("x2", tX); line.setAttribute("y2", tY);
        requestAnimationFrame(animateLink);
    }
    animateLink();
}

// 4. Scrolling UI Logic
window.onscroll = () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    const backToTop = document.querySelector('#backToTop');
    backToTop.classList.toggle('active', window.scrollY > 500);

    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + sec.offsetHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// 5. Library Inits
new Typed('.typing-text', {
    strings: ['Data Scientist', 'Web Developer', 'Problem Solver', 'Santu'],
    typeSpeed: 100, backSpeed: 60, loop: true
});

ScrollReveal({ distance: '80px', duration: 2000, delay: 200 });
ScrollReveal().reveal('.home-content, .heading, .hero-features', { origin: 'top' });
ScrollReveal().reveal('.project-card, .skill-card, .contact form, .edu-card, .service-card, .timeline-item', { origin: 'bottom' });

// 6. Form Submission
var form = document.getElementById("my-form");
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
      status.innerHTML = "Submission error.";
    }
  });
});