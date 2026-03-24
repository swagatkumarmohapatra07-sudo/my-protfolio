document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle & Memory
    const themeToggle = document.querySelector('#theme-toggle');
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        if (themeToggle) themeToggle.classList.replace('bx-moon', 'bx-sun');
    }

    if (themeToggle) {
        themeToggle.onclick = () => {
            document.body.classList.toggle('light-mode');
            if (document.body.classList.contains('light-mode')) {
                themeToggle.classList.replace('bx-moon', 'bx-sun');
                localStorage.setItem('theme', 'light');
            } else {
                themeToggle.classList.replace('bx-sun', 'bx-moon');
                localStorage.setItem('theme', 'dark');
            }
        };
    }

    // 2. Neural Link Cursor Logic
    const mainNode = document.querySelector(".cursor-node-main");
    const trailNode = document.querySelector(".cursor-node-trail");
    const line = document.querySelector(".cursor-line");
    let mX = 0, mY = 0, tX = 0, tY = 0;

    if (window.innerWidth > 768 && mainNode) {
        window.addEventListener("mousemove", (e) => {
            mX = e.clientX; mY = e.clientY;
            mainNode.style.left = `${mX}px`;
            mainNode.style.top = `${mY}px`;
        });

        function animateCursor() {
            tX += (mX - tX) * 0.15;
            tY += (mY - tY) * 0.15;
            if (trailNode) {
                trailNode.style.left = `${tX}px`;
                trailNode.style.top = `${tY}px`;
            }
            if (line) {
                line.setAttribute("x1", mX); line.setAttribute("y1", mY);
                line.setAttribute("x2", tX); line.setAttribute("y2", tY);
            }
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

    // 3. Tech Clock
    function updateClock() {
        const clock = document.getElementById("live-clock");
        if (clock) clock.textContent = new Date().toLocaleTimeString();
    }
    setInterval(updateClock, 1000);

    // 4. Form Submission Logic
    const form = document.getElementById("my-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const status = document.getElementById("my-form-status");
            status.innerHTML = "Success! Message sent.";
            form.reset();
        });
    }

    // 5. Typing Animation
    new Typed('.typing-text', {
        strings: ['Data Analyst', 'Full-Stack Developer', 'Problem Solver'],
        typeSpeed: 100, backSpeed: 60, loop: true
    });
});