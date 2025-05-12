import { px } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface GlowingObjectProps {
    initialPosition: { x: string; y: string };
    colors: [string, string];
    size: { min: number; max: number };
    speed: number;
    containerSize: { width: number; height: number };
}

interface MouseFollowingObjectProps {
    mousePosition: { x: number; y: number };
    colors: [string, string];
    containerSize: { width: number; height: number };
}

function GlowingObject({ initialPosition, colors, size, speed, containerSize }: GlowingObjectProps) {
    const [position, setPosition] = useState(initialPosition);
    const [blur, setBlur] = useState('80px');
    // const [blur, setBlur] = useState(`${Math.random() * 80}px`);
    const [radius, setRadius] = useState(Math.random() * (size.max - size.min) + size.min);

    useEffect(() => {
        const randomMovement = setInterval(() => {
            const deltaX = (Math.random() - 0.5) * speed * 3;
            const deltaY = (Math.random() - 0.5) * speed * 3;

            const newX = Math.max(10, Math.min(90, parseFloat(position.x) + deltaX));
            const newY = Math.max(10, Math.min(90, parseFloat(position.y) + deltaY));

            setPosition({ x: `${newX}%`, y: `${newY}%` });
        }, 2000); // faster than before, but still smooth

        return () => clearInterval(randomMovement);
    }, [position, speed]);

    return (
        <div
            className="absolute rounded-full mix-blend-screen pointer-events-none"
            style={{
                left: position.x,
                top: position.y,
                width: radius,
                height: radius,
                background: `radial-gradient(circle, ${colors[0]}, ${colors[1]})`,
                filter: `blur(${blur})`,
                opacity: 1,
                transition: 'left 1.5s ease, top 1.5s ease',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
            }}
        />
    );
}

function MouseFollowingObject({ mousePosition, colors, containerSize }: MouseFollowingObjectProps) {
    const [position, setPosition] = useState(mousePosition);

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition(prev => ({
                x: prev.x + (mousePosition.x - prev.x) * 0.07,
                y: prev.y + (mousePosition.y - prev.y) * 0.07,
            }));
        }, 16); // ~60 FPS
        return () => clearInterval(interval);
    }, [mousePosition]);

    return (
        <div
            className="absolute rounded-full mix-blend-screen pointer-events-none"
            style={{
                left: `${(position.x / containerSize.width) * 100}%`,
                top: `${(position.y / containerSize.height) * 100}%`,
                width: 350,
                height: 350,
                background: `radial-gradient(circle, ${colors[0]}, ${colors[1]})`,
                filter: 'blur(40px)',
                opacity: 0.25,
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
            }}
        />
    );
}

export default function BackgroundGradientAnimation({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                setContainerSize({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden"
            style={{
                height: '100vh',
                background: 'radial-gradient(circle at center, #1e1b4b 0%, #2e1065 50%, #1e1b4b 100%)',
            }}
            onMouseMove={e => {
                setMousePosition({ x: e.clientX, y: e.clientY });
            }}
        >
            {/* Subtle background animated glows */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-secondary-950 rounded-full opacity-25 blur-[140px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-secondary-950 rounded-full opacity-15 blur-[160px] animate-pulse" />
            </div>

            {/* Animated blob objects */}
            {/* <MouseFollowingObject mousePosition={mousePosition} colors={['#f472b6', '#d946ef']} containerSize={containerSize} /> */}
            <GlowingObject
                initialPosition={{ x: '20%', y: '30%' }}
                colors={['#facc15', '#f97316']}
                size={{ min: 140, max: 300 }}
                speed={1.5}
                containerSize={containerSize}
            />
            <GlowingObject
                initialPosition={{ x: '25%', y: '40%' }}
                colors={['#38bdf8', '#6366f1']}
                size={{ min: 140, max: 300 }}
                speed={1.5}
                containerSize={containerSize}
            />
            <GlowingObject
                initialPosition={{ x: '70%', y: '60%' }}
                colors={['#38bdf8', '#6366f1']}
                size={{ min: 140, max: 300 }}
                speed={1.5}
                containerSize={containerSize}
            />
            <GlowingObject
                initialPosition={{ x: '40%', y: '80%' }}
                colors={['#ec4899', '#f472b6']}
                size={{ min: 140, max: 300 }}
                speed={1.5}
                containerSize={containerSize}
            />

            {/* Text content overlay */}
            <div className="absolute inset-0 flex items-center justify-center text-white z-10 px-6 text-center">
                {/* <div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to My World</h1>
                    <p className="text-lg md:text-xl text-white/80">
                        Dive into an interactive and visually immersive experience.
                    </p>
                </div> */}
                {children}
            </div>

            {/* V-Shaped SVG bottom divider */}
            <svg className="absolute bottom-0 w-full h-[120px] z-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="#ffffff" d="M0,0 C480,300 960,300 1440,0 L1440,320 L0,320 Z" />
            </svg>
        </div>
    );
}
