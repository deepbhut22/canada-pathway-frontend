import { useEffect, useRef } from 'react';

export default function BackgroundAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestIdRef = useRef<number>(0);
    const mousePosition = useRef({ x: 0, y: 0 });
    const mouseIsActive = useRef(false);
    const lastMouseMoveTime = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Enhanced constellation points with variable brightness and size
        const pointCount = 300;
        const points: {
            x: number;
            y: number;
            z: number;
            baseSize: number;
            size: number;
            speed: number;
            brightness: number;
            pulseSpeed: number;
            pulsePhase: number;
            color: { h: number; s: number; l: number; };
        }[] = [];

        // Create diverse star types with different colors
        for (let i = 0; i < pointCount; i++) {
            // Different star colors (using HSL)
            // Blue, white, yellow, orange stars with probability weights
            let color;
            const colorRand = Math.random();

            if (colorRand < 0.4) {
                // White to blue-white stars
                color = { h: 210 + Math.random() * 30, s: 10 + Math.random() * 30, l: 80 + Math.random() * 20 };
            } else if (colorRand < 0.7) {
                // Pure white stars
                color = { h: 0, s: 0, l: 90 + Math.random() * 10 };
            } else if (colorRand < 0.9) {
                // Yellow to yellow-white stars
                color = { h: 40 + Math.random() * 20, s: 30 + Math.random() * 40, l: 80 + Math.random() * 15 };
            } else {
                // Orange to red stars (rare)
                color = { h: 20 + Math.random() * 20, s: 70 + Math.random() * 30, l: 60 + Math.random() * 20 };
            }

            points.push({
                x: (Math.random() - 0.5) * canvas.width * 1.5,
                y: (Math.random() - 0.5) * canvas.height * 1.5,
                z: Math.random() * 1000 + 500,
                baseSize: Math.random() * 2.5 + 0.8,
                size: 0, // Will be calculated in animation loop
                speed: Math.random() * 1.2 + 0.3,
                brightness: Math.random() * 0.4 + 0.6,
                pulseSpeed: Math.random() * 0.03 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2,
                color
            });
        }

        // Track mouse movement with inactivity detection
        const handleMouseMove = (e: MouseEvent) => {
            mousePosition.current = {
                x: e.clientX,
                y: e.clientY
            };
            mouseIsActive.current = true;
            lastMouseMoveTime.current = Date.now();
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation constants with improved values
        const PERSPECTIVE = 600;
        const GLOBAL_RADIUS = Math.min(canvas.width, canvas.height) * 0.5;
        const CONNECTION_DISTANCE = 150;
        const MAX_CONNECTIONS = 3; // Limit connections per star for better performance

        let time = 0;

        const animate = () => {
            // Create beautiful dark blue to black gradient background
            const bgGradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, canvas.width * 0.7
            );
            bgGradient.addColorStop(0, 'rgba(5, 15, 35, 0.3)');
            bgGradient.addColorStop(1, 'rgba(0, 5, 15, 0.3)');

            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            time += 0.01;

            // Check if mouse is inactive (after 2 seconds)
            if (mouseIsActive.current && Date.now() - lastMouseMoveTime.current > 2000) {
                mouseIsActive.current = false;
            }

            // Center of the canvas
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Prepare array for projected points (needed for connections)
            const projectedPoints: {
                x: number;
                y: number;
                z: number;
                size: number;
                brightness: number;
                color: { h: number; s: number; l: number; };
                originalIndex: number;
            }[] = [];

            // Update and draw points
            points.forEach((point, i) => {
                // Move point depending on mouse activity
                if (mouseIsActive.current) {
                    // Create a swirling effect around mouse when active
                    const mouseX = mousePosition.current.x;
                    const mouseY = mousePosition.current.y;

                    // Calculate angle from mouse to point
                    const dx = centerX + point.x - mouseX;
                    const dy = centerY + point.y - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 400) {
                        // Create swirl effect
                        const angle = Math.atan2(dy, dx);
                        const swirl = 0.01 * (1 - dist / 400);

                        // Apply swirl to position
                        point.x += Math.cos(angle + Math.PI / 2) * swirl * 10;
                        point.y += Math.sin(angle + Math.PI / 2) * swirl * 10;
                    }

                    // Slow down z movement when mouse is active
                    point.z -= point.speed * 0.5;
                } else {
                    // Normal z movement
                    point.z -= point.speed;
                }

                // If point is too close, reset it to far away
                if (point.z < 1) {
                    point.z = 1500;
                    point.x = (Math.random() - 0.5) * canvas.width * 1.5;
                    point.y = (Math.random() - 0.5) * canvas.height * 1.5;
                }

                // Calculate pulsating size
                const pulse = Math.sin(time * point.pulseSpeed + point.pulsePhase) * 0.2 + 0.8;
                point.size = point.baseSize * pulse;

                // Project 3D position to 2D with perspective
                const scale = PERSPECTIVE / (PERSPECTIVE + point.z);
                const projectedX = centerX + point.x * scale;
                const projectedY = centerY + point.y * scale;
                const projectedSize = point.size * scale;

                // Store projected point for connection lines
                if (projectedX >= 0 && projectedX <= canvas.width &&
                    projectedY >= 0 && projectedY <= canvas.height) {
                    projectedPoints.push({
                        x: projectedX,
                        y: projectedY,
                        z: point.z,
                        size: projectedSize,
                        brightness: point.brightness * (1 - point.z / 1500) * pulse,
                        color: point.color,
                        originalIndex: i
                    });
                }
            });

            // Sort projected points by Z depth for proper layering
            projectedPoints.sort((a, b) => b.z - a.z);

            // Draw connection lines first (behind stars)
            projectedPoints.forEach((point, i) => {
                // Find closest points for connections
                const connections: { target: typeof projectedPoints[0], distance: number }[] = [];

                projectedPoints.forEach((otherPoint, j) => {
                    if (i === j) return; // Skip self

                    // Calculate distance between projected points
                    const dx = point.x - otherPoint.x;
                    const dy = point.y - otherPoint.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Store connection if close enough
                    if (distance < CONNECTION_DISTANCE) {
                        connections.push({ target: otherPoint, distance });
                    }
                });

                // Sort connections by distance and take only the closest ones
                connections
                    .sort((a, b) => a.distance - b.distance)
                    .slice(0, MAX_CONNECTIONS)
                    .forEach(({ target, distance }) => {
                        // Calculate opacity based on distance and point brightness
                        const opacity = (1 - distance / CONNECTION_DISTANCE) *
                            Math.min(point.brightness, target.brightness) * 0.15;

                        // Create gradient line
                        const gradient = ctx.createLinearGradient(point.x, point.y, target.x, target.y);
                        gradient.addColorStop(0, `hsla(${point.color.h}, ${point.color.s}%, ${point.color.l}%, ${opacity})`);
                        gradient.addColorStop(1, `hsla(${target.color.h}, ${target.color.s}%, ${target.color.l}%, ${opacity})`);

                        // Draw line
                        ctx.beginPath();
                        ctx.moveTo(point.x, point.y);
                        ctx.lineTo(target.x, target.y);
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = Math.min(point.size, target.size) * 0.3;
                        ctx.stroke();
                    });
            });

            // Now draw stars (on top of connection lines)
            projectedPoints.forEach(point => {
                // Calculate color and opacity for star
                const starOpacity = point.brightness;
                const starColor = `hsla(${point.color.h}, ${point.color.s}%, ${point.color.l}%, ${starOpacity})`;

                // Draw star with glow effect
                ctx.beginPath();
                ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
                ctx.fillStyle = starColor;
                ctx.fill();

                // Add glow around brighter stars
                if (point.size > 1.2 || point.brightness > 0.7) {
                    const glowSize = point.size * 3;
                    const glowGradient = ctx.createRadialGradient(
                        point.x, point.y, point.size * 0.5,
                        point.x, point.y, glowSize
                    );

                    glowGradient.addColorStop(0, `hsla(${point.color.h}, ${point.color.s}%, ${point.color.l}%, ${starOpacity * 0.3})`);
                    glowGradient.addColorStop(1, `hsla(${point.color.h}, ${point.color.s}%, ${point.color.l}%, 0)`);

                    ctx.beginPath();
                    ctx.arc(point.x, point.y, glowSize, 0, Math.PI * 2);
                    ctx.fillStyle = glowGradient;
                    ctx.fill();

                    // Add subtle cross-shaped light rays for the brightest stars
                    if (point.size > 1.8 || point.brightness > 0.85) {
                        const rayLength = point.size * 6;
                        const rayOpacity = starOpacity * 0.15;

                        ctx.beginPath();
                        ctx.moveTo(point.x - rayLength, point.y);
                        ctx.lineTo(point.x + rayLength, point.y);
                        ctx.moveTo(point.x, point.y - rayLength);
                        ctx.lineTo(point.x, point.y + rayLength);

                        ctx.strokeStyle = `hsla(${point.color.h}, ${point.color.s}%, ${point.color.l}%, ${rayOpacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            });

            requestIdRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(requestIdRef.current);
        };
    }, []);

    return <canvas ref={canvasRef} className="z-0 w-full h-full pointer-events-none" />;
};  