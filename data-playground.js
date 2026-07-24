document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('#theme-toggle');
    const body = document.body;
    let charts = [];

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
            updateAllCharts();
        };
    }

    function getThemeColors() {
        const isLight = body.classList.contains('light-mode');
        return {
            text: isLight ? '#0f172a' : '#f1f5f9',
            grid: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
            main: getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim() || '#00f2fe',
            accent: getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#8b5cf6'
        };
    }

    const chartColors = (main, accent) => [
        main,
        accent,
        '#f59e0b',
        '#10b981',
        '#ef4444',
        '#ec4899'
    ];

    function initCharts() {
        const colors = getThemeColors();
        const palette = chartColors(colors.main, colors.accent);

        const campusCtx = document.getElementById('campusChart');
        const weatherCtx = document.getElementById('weatherChart');
        const todoCtx = document.getElementById('todoChart');
        const ecomCtx = document.getElementById('ecomChart');

        if (campusCtx) {
            charts.push(new Chart(campusCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Completed', 'In Progress', 'Pending Review', 'Overdue'],
                    datasets: [{
                        data: [142, 38, 15, 5],
                        backgroundColor: [palette[0], palette[1], palette[2], palette[4]],
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
            }));
        }

        if (weatherCtx) {
            charts.push(new Chart(weatherCtx, {
                type: 'radar',
                data: {
                    labels: ['UV Index', 'Temperature', 'Humidity', 'Wind Speed', 'Air Quality', 'Precipitation'],
                    datasets: [{
                        label: 'Weather Metrics',
                        data: [8.5, 34, 65, 22, 45, 30],
                        backgroundColor: palette[0] + '33',
                        borderColor: palette[0],
                        borderWidth: 2,
                        pointBackgroundColor: palette[0],
                        pointBorderColor: '#fff',
                        pointHoverRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100,
                            grid: { color: colors.grid },
                            ticks: { color: colors.text, backdropColor: 'transparent', font: { size: 10 } },
                            pointLabels: { color: colors.text, font: { size: 11 } }
                        }
                    }
                }
            }));
        }

        if (todoCtx) {
            charts.push(new Chart(todoCtx, {
                type: 'polarArea',
                data: {
                    labels: ['Work', 'Personal', 'Shopping', 'Health', 'Education'],
                    datasets: [{
                        data: [89, 52, 35, 28, 41],
                        backgroundColor: palette.slice(0, 5).map(c => c + 'CC'),
                        borderWidth: 1,
                        borderColor: colors.text + '22'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { color: colors.text, padding: 20, font: { size: 12 } } }
                    },
                    scales: {
                        r: {
                            grid: { color: colors.grid },
                            ticks: { display: false }
                        }
                    }
                }
            }));
        }

        if (ecomCtx) {
            charts.push(new Chart(ecomCtx, {
                type: 'bar',
                data: {
                    labels: ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books & Media'],
                    datasets: [{
                        label: 'Revenue ($)',
                        data: [12500, 9400, 7200, 5100, 3800],
                        backgroundColor: palette.slice(0, 5).map(c => c + 'CC'),
                        borderColor: palette.slice(0, 5),
                        borderWidth: 1,
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: colors.grid },
                            ticks: { color: colors.text, font: { size: 11 } }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: colors.text, font: { size: 11 } }
                        }
                    }
                }
            }));
        }
    }

    function updateAllCharts() {
        const colors = getThemeColors();
        const palette = chartColors(colors.main, colors.accent);

        charts.forEach((chart, i) => {
            const suffix = (i === 2 || i === 3) ? 'CC' : '';
            const bgColors = palette.slice(0, chart.data.datasets[0].data.length).map(c => c + suffix);
            chart.options.plugins.legend.labels.color = colors.text;
            chart.data.datasets[0].backgroundColor = bgColors;
            if (chart.config.type === 'radar') {
                chart.data.datasets[0].borderColor = palette[0];
                chart.data.datasets[0].backgroundColor = palette[0] + '33';
                chart.data.datasets[0].pointBackgroundColor = palette[0];
                chart.options.scales.r.grid.color = colors.grid;
                chart.options.scales.r.ticks.color = colors.text;
                chart.options.scales.r.pointLabels.color = colors.text;
            }
            if (chart.config.type === 'bar') {
                chart.data.datasets[0].borderColor = bgColors;
                chart.options.scales.y.grid.color = colors.grid;
                chart.options.scales.y.ticks.color = colors.text;
                chart.options.scales.x.ticks.color = colors.text;
            }
            if (chart.config.type === 'polarArea') {
                chart.options.scales.r.grid.color = colors.grid;
            }
            chart.update();
        });
    }

    setTimeout(initCharts, 300);

    // Cursor
    const initCursor = () => {
        const mainNode = document.querySelector(".cursor-node-main");
        const trailNode = document.querySelector(".cursor-node-trail");
        if (!mainNode || !trailNode || window.innerWidth <= 768) return;

        const coords = { x: 0, y: 0 };
        const trailCoords = { x: 0, y: 0 };
        const particles = [];
        const maxParticles = 30;

        window.addEventListener("mousemove", (e) => {
            coords.x = e.clientX;
            coords.y = e.clientY;
            createParticle(e.clientX, e.clientY);
        });

        function createParticle(x, y) {
            if (particles.length >= maxParticles) return;
            const p = document.createElement("div");
            p.className = "cursor-tail";
            const size = Math.random() * 6 + 4;
            p.style.width = size + "px";
            p.style.height = size + "px";
            p.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
            document.body.appendChild(p);
            particles.push({ el: p, opacity: 0.3, scale: 1, life: 1.0 });
        }

        const animate = () => {
            mainNode.style.transform = `translate3d(${coords.x - mainNode.offsetWidth / 2}px, ${coords.y - mainNode.offsetHeight / 2}px, 0)`;
            trailCoords.x += (coords.x - trailCoords.x) * 0.2;
            trailCoords.y += (coords.y - trailCoords.y) * 0.2;
            trailNode.style.transform = `translate3d(${trailCoords.x - trailNode.offsetWidth / 2}px, ${trailCoords.y - trailNode.offsetHeight / 2}px, 0)`;
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.life -= 0.02;
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

        document.querySelectorAll('a, button, .chart-card').forEach(el => {
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
});
