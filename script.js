// 1. Neural Data Link Cursor Logic
const mainNode = document.querySelector(".cursor-node-main");
const trailNode = document.querySelector(".cursor-node-trail");
const line = document.querySelector(".cursor-line");
let mX = 0, mY = 0, tX = 0, tY = 0;

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

// 2. Typing Animation
new Typed('.typing-text', {
    strings: ['Data Science Student', 'Web Developer', 'Problem Solver', 'Tech Enthusiast'],
    typeSpeed: 100, backSpeed: 60, backDelay: 1000, loop: true
});

// 3. Scroll Reveal
ScrollReveal({ distance: '80px', duration: 2000, delay: 200 });
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.project-card, .skill-card, .contact form', { origin: 'bottom' });

// 4. Section Highlighting
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
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
};

// 5. Vanilla Tilt Init
VanillaTilt.init(document.querySelectorAll(".project-card, .skill-card, .home-content, .contact form"), {
    max: 10, speed: 400, glare: true, "max-glare": 0.2,
});

// 6. Formspree AJAX Submission
var form = document.getElementById("my-form");
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  status.innerHTML = "Sending...";
  status.className = "";

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Message sent successfully to Swagat!";
      status.classList.add("success");
      form.reset();
    } else {
      status.innerHTML = "Oops! Problem submitting form";
      status.classList.add("error");
    }
  }).catch(error => {
    status.innerHTML = "Oops! Problem submitting form";
    status.classList.add("error");
  });
}
form.addEventListener("submit", handleSubmit);