// --- Utility: Throttle ---
function throttle(func, limit) {
    let lastFunc, lastRan;
    return function() {
        const context = this, args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Core Elements
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const themeToggle = document.querySelector('#theme-toggle');
    const body = document.body;
    const header = document.querySelector('header');
    const backToTop = document.querySelector('#backToTop');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    const typingText = document.querySelector('.typing-text');
    const form = document.getElementById("my-form");
    const status = document.getElementById("my-form-status");
    const submitBtn = document.getElementById("submit-btn");
    const nodeContainer = document.getElementById('neural-nodes');
    const mainNode = document.querySelector(".cursor-node-main");
    const trailNode = document.querySelector(".cursor-node-trail");

    // 2. Mobile Menu
    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        };
    }

    // 3. Theme Memory & Toggle
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        if (themeToggle) themeToggle.classList.replace('bx-moon', 'bx-sun');
    }

    if (themeToggle) {
        themeToggle.onclick = () => {
            body.classList.toggle('light-mode');
            if (body.classList.contains('light-mode')) {
                themeToggle.classList.replace('bx-moon', 'bx-sun');
                localStorage.setItem('theme', 'light');
            } else {
                themeToggle.classList.replace('bx-sun', 'bx-moon');
                localStorage.setItem('theme', 'dark');
            }
            if (typeof updateChartThemes === 'function') updateChartThemes();
        };
    }

    // 4. Clock & Greeting
    function updateClock() {
        const clockElem = document.getElementById("live-clock");
        const greetingElem = document.getElementById("dynamic-greeting");
        if (!clockElem || !greetingElem) return;
        const now = new Date();
        clockElem.textContent = now.toLocaleTimeString();
        const hr = now.getHours();
        if (hr < 12) greetingElem.textContent = "Good Morning";
        else if (hr < 18) greetingElem.textContent = "Good Afternoon";
        else greetingElem.textContent = "Good Evening";
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 5. Throttled Scroll Logic
    const handleScroll = throttle(() => {
        if (header) header.classList.toggle('sticky', window.scrollY > 100);
        if (backToTop) backToTop.classList.toggle('active', window.scrollY > 500);
        if (menuIcon && navbar) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        }
    }, 100);
    window.addEventListener('scroll', handleScroll);

    // Navigation Active Link Observer
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(id)) link.classList.add('active');
                });
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(sec => navObserver.observe(sec));

    // 6. Typings & Reveal
    if (typingText) {
        new Typed('.typing-text', {
            strings: ['Data Analyst .', 'Full-Stack Web Developer .', 'Problem Solver .', 'Quick learner .'],
            typeSpeed: 100, backSpeed: 60, loop: true
        });
    }

    const sr = ScrollReveal({ distance: '60px', duration: 1500, delay: 200, mobile: false });
    sr.reveal('.home-content, .heading, .hero-features', { origin: 'top' });
    sr.reveal('.project-card, .skill-category-box, .contact form, .timeline-item, .edu-card, .service-card, .chart-card', { 
        origin: 'bottom', interval: 100 
    });

    // 7. Data Playground Charts
    let sgpaChart, projectChart;

    function getThemeColors() {
        const isLight = body.classList.contains('light-mode');
        return {
            text: isLight ? '#0f172a' : '#f1f5f9',
            grid: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
            main: getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim() || '#00f2fe',
            accent: getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#8b5cf6'
        };
    }

    function initCharts() {
        const ctxSgpa = document.getElementById('sgpaChart');
        const ctxProject = document.getElementById('projectChart');
        if (!ctxSgpa || !ctxProject) return;

        const colors = getThemeColors();

        sgpaChart = new Chart(ctxSgpa, {
            type: 'line',
            data: {
                labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4 (Proj)'],
                datasets: [{
                    label: 'SGPA',
                    data: [8.84, 8.91, 9.18, 9.25],
                    borderColor: colors.main,
                    backgroundColor: 'rgba(0, 242, 254, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: colors.main,
                    pointBorderColor: '#fff',
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { min: 8.0, max: 10.0, grid: { color: colors.grid }, ticks: { color: colors.text } },
                    x: { grid: { display: false }, ticks: { color: colors.text } }
                }
            }
        });

        projectChart = new Chart(ctxProject, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Pending', 'In-Review'],
                datasets: [{
                    data: [85, 10, 5],
                    backgroundColor: [colors.main, colors.accent, 'rgba(255,255,255,0.1)'],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { color: colors.text, padding: 20, font: { size: 12 } } }
                },
                cutout: '70%'
            }
        });
    }

    window.updateChartThemes = function() {
        if (!sgpaChart || !projectChart) return;
        const colors = getThemeColors();
        sgpaChart.options.scales.y.ticks.color = colors.text;
        sgpaChart.options.scales.y.grid.color = colors.grid;
        sgpaChart.options.scales.x.ticks.color = colors.text;
        sgpaChart.data.datasets[0].borderColor = colors.main;
        sgpaChart.data.datasets[0].pointBackgroundColor = colors.main;
        sgpaChart.update();
        projectChart.options.plugins.legend.labels.color = colors.text;
        projectChart.data.datasets[0].backgroundColor = [colors.main, colors.accent, 'rgba(255,255,255,0.1)'];
        projectChart.update();
    };
    
    setTimeout(initCharts, 500);

    // 8. AJAX Contact Form
    if (form) {
        form.addEventListener("submit", async function(event) {
            event.preventDefault();
            if (submitBtn) {
                submitBtn.innerHTML = "Sending...";
                submitBtn.disabled = true;
            }
            try {
                const response = await fetch(event.target.action, {
                    method: 'POST',
                    body: new FormData(event.target),
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    if (status) status.innerHTML = "Success! Message sent.";
                    form.reset();
                } else {
                    if (status) status.innerHTML = "Oops! Submission error.";
                }
            } catch (error) {
                if (status) status.innerHTML = "Connection error.";
            } finally {
                if (submitBtn) {
                    submitBtn.innerHTML = "Send Message";
                    submitBtn.disabled = false;
                }
            }
        });
    }

    // 9. Premium Isolated Particle Tail Cursor (High-Performance)
    const initCursor = () => {
        const mainNode = document.querySelector(".cursor-node-main");
        const trailNode = document.querySelector(".cursor-node-trail");
        if (!mainNode || !trailNode || window.innerWidth <= 768) return;

        const coords = { x: 0, y: 0 };
        const trailCoords = { x: 0, y: 0 };
        const particles = [];
        const maxParticles = 30; // Maximum allowed on screen at once

        window.addEventListener("mousemove", (e) => {
            coords.x = e.clientX;
            coords.y = e.clientY;
            
            // Only spawn if moving significant distance to save performance
            createParticle(e.clientX, e.clientY);
        });

        function createParticle(x, y) {
            if (particles.length >= maxParticles) return;
            
            const p = document.createElement("div");
            p.className = "cursor-tail";
            // Match the existing style but make it dynamic
            const size = Math.random() * 6 + 4;
            p.style.width = size + "px";
            p.style.height = size + "px";
            p.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
            document.body.appendChild(p);
            
            particles.push({
                el: p,
                opacity: 0.3,
                scale: 1,
                life: 1.0
            });
        }

        const animate = () => {
            // Main Node (Instant)
            mainNode.style.transform = `translate3d(${coords.x - mainNode.offsetWidth / 2}px, ${coords.y - mainNode.offsetHeight / 2}px, 0)`;
            
            // Trail Node (Gentle Lag)
            trailCoords.x += (coords.x - trailCoords.x) * 0.2;
            trailCoords.y += (coords.y - trailCoords.y) * 0.2;
            trailNode.style.transform = `translate3d(${trailCoords.x - trailNode.offsetWidth / 2}px, ${trailCoords.y - trailNode.offsetHeight / 2}px, 0)`;

            // Update Particle Trail
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.life -= 0.02; // Fade speed
                p.scale -= 0.015;
                p.opacity -= 0.01;

                if (p.life <= 0 || p.scale <= 0) {
                    p.el.remove();
                    particles.splice(i, 1);
                } else {
                    p.el.style.opacity = p.opacity;
                    p.el.style.transform = p.el.style.transform.split(' scale')[0] + ` scale(${p.scale})`;
                }
            }
            
            requestAnimationFrame(animate);
        };
        animate();

        // Hover Effect Logic
        document.querySelectorAll('a, button, .project-card, .skill-card, .chart-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                mainNode.classList.add('cursor-hover');
                trailNode.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                mainNode.classList.remove('cursor-hover');
                trailNode.classList.remove('cursor-hover');
            });
        });
    };
    initCursor();

    // 10. Statistics Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 100;
    const startCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-target'));
                const isDecimal = counter.getAttribute('data-decimal') === 'true';
                const prefix = counter.getAttribute('data-prefix') || '';
                const suffix = counter.getAttribute('data-suffix') || '';
                const updateCount = () => {
                    let currentText = counter.innerText.replace(/[^0-9.]/g, '');
                    const count = parseFloat(currentText) || 0;
                    const inc = target / speed;
                    if (count < target) {
                        let current = count + inc;
                        counter.innerText = isDecimal ? prefix + Math.min(current, target).toFixed(2) + suffix : prefix + Math.ceil(current) + suffix;
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = prefix + target + suffix;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    };
    const counterObserver = new IntersectionObserver(startCounters, { root: null, threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));

    // 11. Hero Section Enhancements (Neural Nodes & Parallax)
    if (nodeContainer) {
        for (let i = 0; i < 15; i++) {
            const node = document.createElement('div');
            node.className = 'neural-node';
            const size = Math.random() * 4 + 2;
            node.style.cssText = `width:${size}px;height:${size}px;position:absolute;background:${i%2===0?'var(--main-color)':'var(--accent-color)'};border-radius:50%;top:${Math.random()*100}%;left:${Math.random()*100}%;opacity:0.4;box-shadow:0 0 10px ${i%2===0?'var(--main-color)':'var(--accent-color)'};`;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            node.style.animation = `floatNode ${duration}s ease-in-out ${delay}s infinite alternate`;
            nodeContainer.appendChild(node);
        }
    }

    const home = document.querySelector('.home');
    const homeInfo = document.querySelector('.home-info');
    const homeImg = document.querySelector('.home-img');
    if (home && homeInfo && homeImg && window.innerWidth > 768) {
        home.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const moveX = (clientX - centerX) / 25;
            const moveY = (clientY - centerY) / 25;
            homeInfo.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            homeImg.style.transform = `translate3d(${-moveX * 1.5}px, ${-moveY * 1.5}px, 0)`;
        });
    }

    const magButtons = document.querySelectorAll('.btn');
    magButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0)`;
        });
    });
});

// 12. Global styles for animations
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes floatNode {
        from { transform: translate(0, 0); }
        to { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px); }
    }
`;
document.head.appendChild(animationStyle);
