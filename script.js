// 1. Dazzling Stars Generator
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

// 2. Neural Link Cursor Logic (FIXED)
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

// 3. UI Interactions (Header & BackToTop)
window.onscroll = () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    const backToTop = document.querySelector('#backToTop');
    backToTop.classList.toggle('active', window.scrollY > 500);

    // Section Highlighting
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        if(top >= offset && top < offset + sec.offsetHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + sec.getAttribute('id') + ']').classList.add('active');
            });
        }
    });
};

// 4. Libraries Init
new Typed('.typing-text', {
    strings: ['Data Scientist', 'Web Developer', 'ML Specialist', 'Santu'],
    typeSpeed: 100, backSpeed: 60, loop: true
});

ScrollReveal({ distance: '80px', duration: 2000, delay: 200 });
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.project-card, .skill-card, .contact form, .timeline-item', { origin: 'bottom' });

VanillaTilt.init(document.querySelectorAll(".project-card, .skill-card, .home-content, .timeline-content"), {
    max: 10, speed: 400, glare: true, "max-glare": 0.1,
});

// 5. Contact Form Logic (FIXED)
var form = document.getElementById("my-form");
form.addEventListener("submit", async function(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var btn = document.getElementById("submit-btn");

  status.innerHTML = "Sending...";
  status.className = "";
  btn.disabled = true;

  fetch(event.target.action, {
    method: 'POST',
    body: new FormData(event.target),
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    btn.disabled = false;
    if (response.ok) {
      status.innerHTML = "Message sent successfully to Swagat!";
      status.classList.add("success");
      form.reset();
    } else {
      status.innerHTML = "Oops! Problem sending message.";
      status.classList.add("error");
    }
  }).catch(error => {
    btn.disabled = false;
    status.innerHTML = "Oops! Problem sending message.";
    status.classList.add("error");
  });
});