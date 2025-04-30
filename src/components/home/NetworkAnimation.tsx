import { useEffect, useRef } from 'react';

export default function NetworkAnimation() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current! as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        let animationFrameId: number;

        // Set canvas dimensions
        const handleResize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        // Particles for network
        const particles: any[] = [];
        const particleCount = 50; // Increased particle count

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3, // Slower movement
                vy: (Math.random() - 0.5) * 0.3, // Slower movement
                radius: Math.random() * 1.5 + 0.2, // Smaller particles
            });
        }

        // Animation loop
        const animate = () => {
            ctx!.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Move particles
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges instead of bouncing for smoother effect
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw particle
                ctx!.beginPath();
                ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx!.fillStyle = 'rgba(80, 120, 220, 0.4)'; // More subtle blue
                ctx!.fill();

                // Connect particles that are close
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) { // Increased connection distance
                        ctx!.beginPath();
                        ctx!.moveTo(p.x, p.y);
                        ctx!.lineTo(p2.x, p2.y);
                        ctx!.strokeStyle = `rgba(70, 130, 230, ${0.15 * (1 - distance / 120)})`; // More subtle lines
                        ctx!.lineWidth = 0.3; // Thinner lines
                        ctx!.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};