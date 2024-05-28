document.getElementById('fireworksButton').addEventListener('click', () => {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    resizeCanvas();

    const fireworks = [];
    const particles = [];
    const hue = 120;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createFireworks(x, y) {
        const fireworksCount = 30;
        for (let i = 0; i < fireworksCount; i++) {
            fireworks.push({
                x,
                y,
                dx: random(-3, 3),
                dy: random(-3, 3),
                color: `hsl(${random(hue - 30, hue + 30)}, 100%, 50%)`,
                size: 2,
                lifespan: random(50, 100),
            });
        }
    }

    function updateFireworks() {
        for (let i = fireworks.length - 1; i >= 0; i--) {
            const f = fireworks[i];
            f.x += f.dx;
            f.y += f.dy;
            f.lifespan--;
            if (f.lifespan <= 0) {
                fireworks.splice(i, 1);
                for (let j = 0; j < 30; j++) {
                    particles.push({
                        x: f.x,
                        y: f.y,
                        dx: random(-3, 3),
                        dy: random(-3, 3),
                        color: f.color,
                        size: 1,
                        lifespan: random(20, 50),
                    });
                }
            }
        }
    }

    function updateParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.dx;
            p.y += p.dy;
            p.size *= 0.95;
            p.lifespan--;
            if (p.lifespan <= 0) {
                particles.splice(i, 1);
            }
        }
    }

    function drawFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.forEach(f => {
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
            ctx.fillStyle = f.color;
            ctx.fill();
        });
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
    }

    function animate() {
        requestAnimationFrame(animate);
        updateFireworks();
        updateParticles();
        drawFireworks();
    }

    function launchFireworks() {
        for (let i = 0; i < 5; i++) {
            createFireworks(random(0, canvas.width), random(0, canvas.height));
        }
    }

    animate();
    launchFireworks();
    setInterval(launchFireworks, 2000);
});
