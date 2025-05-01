// import React, { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';

// // Option 1: Floating Particles with 3D Depth
// export const FloatingParticlesBackground: React.FC = () => {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
//     const sceneRef = useRef<THREE.Scene | null>(null);
//     const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
//     const particlesRef = useRef<THREE.Points | null>(null);
//     const frameRef = useRef<number>(0);

//     useEffect(() => {
//         if (!containerRef.current) return;

//         // Scene setup
//         const scene = new THREE.Scene();
//         sceneRef.current = scene;

//         // Camera setup
//         const camera = new THREE.PerspectiveCamera(
//             75,
//             window.innerWidth / window.innerHeight,
//             0.1,
//             1000
//         );
//         camera.position.z = 30;
//         cameraRef.current = camera;

//         // Renderer setup
//         const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         renderer.setClearColor(0x000000, 0); // Transparent background
//         containerRef.current.appendChild(renderer.domElement);
//         rendererRef.current = renderer;

//         // Create particles
//         const particlesGeometry = new THREE.BufferGeometry();
//         const particleCount = 1500;
//         const posArray = new Float32Array(particleCount * 3);

//         for (let i = 0; i < particleCount * 3; i += 3) {
//             // Position particles in a 3D space
//             posArray[i] = (Math.random() - 0.5) * 50; // x
//             posArray[i + 1] = (Math.random() - 0.5) * 50; // y
//             posArray[i + 2] = (Math.random() - 0.5) * 50; // z
//         }

//         particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

//         // Create material with custom shader for gradient color
//         const particlesMaterial = new THREE.PointsMaterial({
//             size: 0.15,
//             transparent: true,
//             color: 0x4080FF, // Blue color
//             blending: THREE.AdditiveBlending,
//             opacity: 0.7,
//         });

//         // Create particle system
//         const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//         scene.add(particlesMesh);
//         particlesRef.current = particlesMesh;

//         // Animation function
//         const animate = () => {
//             if (!particlesRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

//             // Rotate particles slowly
//             particlesRef.current.rotation.x += 0.0005;
//             particlesRef.current.rotation.y += 0.0007;

//             // Render scene
//             rendererRef.current.render(sceneRef.current, cameraRef.current);

//             // Request next frame
//             frameRef.current = requestAnimationFrame(animate);
//         };

//         // Handle window resize
//         const handleResize = () => {
//             if (!cameraRef.current || !rendererRef.current) return;

//             const width = window.innerWidth;
//             const height = window.innerHeight;

//             cameraRef.current.aspect = width / height;
//             cameraRef.current.updateProjectionMatrix();

//             rendererRef.current.setSize(width, height);
//         };

//         window.addEventListener('resize', handleResize);

//         // Start animation
//         animate();

//         // Cleanup
//         return () => {
//             if (frameRef.current) {
//                 cancelAnimationFrame(frameRef.current);
//             }

//             if (rendererRef.current && rendererRef.current.domElement && containerRef.current) {
//                 containerRef.current.removeChild(rendererRef.current.domElement);
//             }

//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     return <div ref={containerRef} className="fixed inset-0 w-full h-full z-0" />;
// };

// // Option 2: Flowing Wave Background
// export const WaveBackground: React.FC = () => {
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const requestIdRef = useRef<number>(0);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const ctx = canvas.getContext('2d');
//         if (!ctx) return;

//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//         };

//         window.addEventListener('resize', resizeCanvas);
//         resizeCanvas();

//         // Wave parameters
//         const waves = [
//             { y: canvas.height * 0.6, amplitude: 30, frequency: 0.01, speed: 0.05, color: 'rgba(100, 150, 255, 0.2)' },
//             { y: canvas.height * 0.65, amplitude: 25, frequency: 0.015, speed: 0.03, color: 'rgba(70, 130, 220, 0.15)' },
//             { y: canvas.height * 0.7, amplitude: 20, frequency: 0.02, speed: 0.07, color: 'rgba(50, 100, 200, 0.1)' },
//         ];

//         let time = 0;

//         const animate = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             time += 0.01;

//             waves.forEach(wave => {
//                 drawWave(ctx, wave, time);
//             });

//             requestIdRef.current = requestAnimationFrame(animate);
//         };

//         const drawWave = (
//             ctx: CanvasRenderingContext2D,
//             { y, amplitude, frequency, speed, color }: {
//                 y: number;
//                 amplitude: number;
//                 frequency: number;
//                 speed: number;
//                 color: string;
//             },
//             time: number
//         ) => {
//             ctx.beginPath();
//             ctx.moveTo(0, canvas.height);

//             for (let x = 0; x < canvas.width; x++) {
//                 const xWithTime = x * frequency + time * speed;
//                 const yOffset = Math.sin(xWithTime) * amplitude;
//                 ctx.lineTo(x, y + yOffset);
//             }

//             ctx.lineTo(canvas.width, canvas.height);
//             ctx.lineTo(0, canvas.height);
//             ctx.fillStyle = color;
//             ctx.fill();
//         };

//         animate();

//         return () => {
//             window.removeEventListener('resize', resizeCanvas);
//             cancelAnimationFrame(requestIdRef.current);
//         };
//     }, []);

//     return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />;
// };

// // Option 3: Geometric 3D Grid
// export const GridBackground: React.FC = () => {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
//     const sceneRef = useRef<THREE.Scene | null>(null);
//     const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
//     const gridRef = useRef<THREE.Group | null>(null);
//     const frameRef = useRef<number>(0);

//     useEffect(() => {
//         if (!containerRef.current) return;

//         // Scene setup
//         const scene = new THREE.Scene();
//         sceneRef.current = scene;

//         // Camera setup
//         const camera = new THREE.PerspectiveCamera(
//             45,
//             window.innerWidth / window.innerHeight,
//             0.1,
//             1000
//         );
//         camera.position.set(0, 15, 30);
//         camera.lookAt(0, 0, 0);
//         cameraRef.current = camera;

//         // Renderer setup
//         const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         renderer.setClearColor(0x000000, 0); // Transparent background
//         containerRef.current.appendChild(renderer.domElement);
//         rendererRef.current = renderer;

//         // Create grid group
//         const gridGroup = new THREE.Group();
//         sceneRef.current.add(gridGroup);
//         gridRef.current = gridGroup;

//         // Create grid lines
//         const gridSize = 20;
//         const gridDivisions = 20;
//         const gridStep = gridSize / gridDivisions;
//         const gridMaterial = new THREE.LineBasicMaterial({
//             color: 0x4080FF,
//             transparent: true,
//             opacity: 0.4
//         });

//         // Create horizontal grid lines
//         for (let i = -gridSize / 2; i <= gridSize / 2; i += gridStep) {
//             const points = [
//                 new THREE.Vector3(-gridSize / 2, 0, i),
//                 new THREE.Vector3(gridSize / 2, 0, i)
//             ];
//             const geometry = new THREE.BufferGeometry().setFromPoints(points);
//             const line = new THREE.Line(geometry, gridMaterial);
//             gridGroup.add(line);
//         }

//         // Create vertical grid lines
//         for (let i = -gridSize / 2; i <= gridSize / 2; i += gridStep) {
//             const points = [
//                 new THREE.Vector3(i, 0, -gridSize / 2),
//                 new THREE.Vector3(i, 0, gridSize / 2)
//             ];
//             const geometry = new THREE.BufferGeometry().setFromPoints(points);
//             const line = new THREE.Line(geometry, gridMaterial);
//             gridGroup.add(line);
//         }

//         // Animation function
//         const animate = () => {
//             if (!gridRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

//             // Rotate grid slowly
//             gridRef.current.rotation.x = Math.PI / 4; // Tilt the grid
//             gridRef.current.rotation.y += 0.002; // Rotate slowly

//             // Render scene
//             rendererRef.current.render(sceneRef.current, cameraRef.current);

//             // Request next frame
//             frameRef.current = requestAnimationFrame(animate);
//         };

//         // Handle window resize
//         const handleResize = () => {
//             if (!cameraRef.current || !rendererRef.current) return;

//             const width = window.innerWidth;
//             const height = window.innerHeight;

//             cameraRef.current.aspect = width / height;
//             cameraRef.current.updateProjectionMatrix();

//             rendererRef.current.setSize(width, height);
//         };

//         window.addEventListener('resize', handleResize);

//         // Start animation
//         animate();

//         // Cleanup
//         return () => {
//             if (frameRef.current) {
//                 cancelAnimationFrame(frameRef.current);
//             }

//             if (rendererRef.current && rendererRef.current.domElement && containerRef.current) {
//                 containerRef.current.removeChild(rendererRef.current.domElement);
//             }

//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     return <div ref={containerRef} className="fixed inset-0 w-full h-full z-0" />;
// };

// // Option 4: Gradient Orbs
// export const GradientOrbsBackground: React.FC = () => {
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const requestIdRef = useRef<number>(0);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const ctx = canvas.getContext('2d');
//         if (!ctx) return;

//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//         };

//         window.addEventListener('resize', resizeCanvas);
//         resizeCanvas();

//         // Create orbs
//         const orbCount = 5;
//         const orbs: {
//             x: number;
//             y: number;
//             radius: number;
//             color: string;
//             xSpeed: number;
//             ySpeed: number;
//         }[] = [];

//         for (let i = 0; i < orbCount; i++) {
//             orbs.push({
//                 x: Math.random() * canvas.width,
//                 y: Math.random() * canvas.height,
//                 radius: Math.random() * 150 + 100,
//                 color: `rgba(${Math.floor(Math.random() * 100 + 50)}, ${Math.floor(Math.random() * 100 + 80)}, ${Math.floor(Math.random() * 55 + 200)}, 0.${Math.floor(Math.random() * 2 + 1)})`,
//                 xSpeed: (Math.random() - 0.5) * 0.3,
//                 ySpeed: (Math.random() - 0.5) * 0.3
//             });
//         }

//         const animate = () => {
//             // Clear canvas with fade effect
//             ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
//             ctx.fillRect(0, 0, canvas.width, canvas.height);

//             // Draw and move orbs
//             orbs.forEach(orb => {
//                 // Move orb
//                 orb.x += orb.xSpeed;
//                 orb.y += orb.ySpeed;

//                 // Bounce off edges
//                 if (orb.x - orb.radius < 0 || orb.x + orb.radius > canvas.width) {
//                     orb.xSpeed = -orb.xSpeed;
//                 }
//                 if (orb.y - orb.radius < 0 || orb.y + orb.radius > canvas.height) {
//                     orb.ySpeed = -orb.ySpeed;
//                 }

//                 // Draw gradient orb
//                 const gradient = ctx.createRadialGradient(
//                     orb.x, orb.y, 0,
//                     orb.x, orb.y, orb.radius
//                 );
//                 gradient.addColorStop(0, orb.color);
//                 gradient.addColorStop(1, 'rgba(0, 10, 30, 0)');

//                 ctx.beginPath();
//                 ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
//                 ctx.fillStyle = gradient;
//                 ctx.fill();
//             });

//             requestIdRef.current = requestAnimationFrame(animate);
//         };

//         animate();

//         return () => {
//             window.removeEventListener('resize', resizeCanvas);
//             cancelAnimationFrame(requestIdRef.current);
//         };
//     }, []);

//     return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />;
// };

// // Option 5: 3D Dots Constellation
// export const ConstellationBackground: React.FC = () => {
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const requestIdRef = useRef<number>(0);
//     const mousePosition = useRef({ x: 0, y: 0 });

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const ctx = canvas.getContext('2d');
//         if (!ctx) return;

//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//         };

//         window.addEventListener('resize', resizeCanvas);
//         resizeCanvas();

//         // Create constellation points
//         const pointCount = 100;
//         const points: {
//             x: number;
//             y: number;
//             z: number;
//             size: number;
//             speed: number;
//         }[] = [];

//         for (let i = 0; i < pointCount; i++) {
//             points.push({
//                 x: (Math.random() - 0.5) * canvas.width,
//                 y: (Math.random() - 0.5) * canvas.height,
//                 z: Math.random() * 1000,
//                 size: Math.random() * 2 + 0.5,
//                 speed: Math.random() * 1 + 0.2
//             });
//         }

//         // Track mouse movement
//         const handleMouseMove = (e: MouseEvent) => {
//             mousePosition.current = {
//                 x: e.clientX,
//                 y: e.clientY
//             };
//         };

//         window.addEventListener('mousemove', handleMouseMove);

//         // Animation constants
//         const PERSPECTIVE = 500;
//         const GLOBAL_RADIUS = Math.min(canvas.width, canvas.height) * 0.4;

//         const animate = () => {
//             ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
//             ctx.fillRect(0, 0, canvas.width, canvas.height);

//             // Center of the canvas
//             const centerX = canvas.width / 2;
//             const centerY = canvas.height / 2;

//             // Update and draw points
//             points.forEach((point, i) => {
//                 // Move point forward in z direction
//                 point.z -= point.speed;

//                 // If point is too close, reset it to far away
//                 if (point.z < 1) {
//                     point.z = 1000;
//                     point.x = (Math.random() - 0.5) * canvas.width;
//                     point.y = (Math.random() - 0.5) * canvas.height;
//                 }

//                 // Project 3D position to 2D with perspective
//                 const scale = PERSPECTIVE / (PERSPECTIVE + point.z);
//                 const projectedX = centerX + point.x * scale;
//                 const projectedY = centerY + point.y * scale;
//                 const projectedSize = point.size * scale;

//                 // Draw point
//                 ctx.beginPath();
//                 ctx.arc(projectedX, projectedY, projectedSize, 0, Math.PI * 2);
//                 ctx.fillStyle = `rgba(100, 150, 255, ${0.6 * (1 - point.z / 1000)})`;
//                 ctx.fill();

//                 // Connect nearby points with lines
//                 points.forEach((otherPoint, j) => {
//                     if (i === j) return; // Skip self

//                     // Project other point
//                     const otherScale = PERSPECTIVE / (PERSPECTIVE + otherPoint.z);
//                     const otherX = centerX + otherPoint.x * otherScale;
//                     const otherY = centerY + otherPoint.y * otherScale;

//                     // Calculate distance between projected points
//                     const dx = projectedX - otherX;
//                     const dy = projectedY - otherY;
//                     const distance = Math.sqrt(dx * dx + dy * dy);

//                     // Draw line if points are close enough
//                     if (distance < 100) {
//                         ctx.beginPath();
//                         ctx.moveTo(projectedX, projectedY);
//                         ctx.lineTo(otherX, otherY);
//                         ctx.strokeStyle = `rgba(100, 150, 255, ${0.15 * (1 - distance / 100) * (1 - Math.max(point.z, otherPoint.z) / 1000)})`;
//                         ctx.lineWidth = 0.5;
//                         ctx.stroke();
//                     }
//                 });
//             });

//             requestIdRef.current = requestAnimationFrame(animate);
//         };

//         animate();

//         return () => {
//             window.removeEventListener('resize', resizeCanvas);
//             window.removeEventListener('mousemove', handleMouseMove);
//             cancelAnimationFrame(requestIdRef.current);
//         };
//     }, []);

//     return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />;
// };

// // Usage Example Component
// export const BackgroundSelector: React.FC = () => {
//     const [selectedBackground, setSelectedBackground] = useState<string>('particles');

//     // Mapping of options to components
//     const backgroundComponents: Record<string, React.ReactNode> = {
//         particles: <FloatingParticlesBackground />,
//         waves: <WaveBackground />,
//         grid: <GridBackground />,
//         orbs: <GradientOrbsBackground />,
//         constellation: <ConstellationBackground />
//     };

//     return (
//         <div className="relative min-h-screen">
//             {/* Render the selected background */}
//             {backgroundComponents[selectedBackground]}

//             {/* Background selector controls */}
//             <div className="absolute top-4 right-4 p-2 bg-gray-900/70 rounded-lg z-50">
//                 <div className="flex flex-col space-y-2">
//                     <button
//                         onClick={() => setSelectedBackground('particles')}
//                         className={`px-3 py-1 text-sm rounded ${selectedBackground === 'particles' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-200'}`}
//                     >
//                         Particles
//                     </button>
//                     <button
//                         onClick={() => setSelectedBackground('waves')}
//                         className={`px-3 py-1 text-sm rounded ${selectedBackground === 'waves' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-200'}`}
//                     >
//                         Waves
//                     </button>
//                     <button
//                         onClick={() => setSelectedBackground('grid')}
//                         className={`px-3 py-1 text-sm rounded ${selectedBackground === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-200'}`}
//                     >
//                         3D Grid
//                     </button>
//                     <button
//                         onClick={() => setSelectedBackground('orbs')}
//                         className={`px-3 py-1 text-sm rounded ${selectedBackground === 'orbs' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-200'}`}
//                     >
//                         Gradient Orbs
//                     </button>
//                     <button
//                         onClick={() => setSelectedBackground('constellation')}
//                         className={`px-3 py-1 text-sm rounded ${selectedBackground === 'constellation' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-200'}`}
//                     >
//                         Constellation
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Option 1: Enhanced Floating Particles with 3D Depth and Custom Shapes
export const FloatingParticlesBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const particlesRef = useRef<THREE.Group | null>(null);
    const frameRef = useRef<number>(0);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 30;
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0); // Transparent background
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Create particles group
        const particlesGroup = new THREE.Group();
        scene.add(particlesGroup);
        particlesRef.current = particlesGroup;

        // Create a variety of shapes instead of just particles
        const particleCount = 300;
        const shapes: any[] = [];

        // Materials with different colors and properties
        const materials = [
            new THREE.MeshBasicMaterial({
                color: 0x4080FF,
                transparent: true,
                opacity: 0.7,
                wireframe: Math.random() > 0.7
            }),
            new THREE.MeshBasicMaterial({
                color: 0x80FFFF,
                transparent: true,
                opacity: 0.5,
                wireframe: Math.random() > 0.7
            }),
            new THREE.MeshBasicMaterial({
                color: 0x6040FF,
                transparent: true,
                opacity: 0.6,
                wireframe: Math.random() > 0.7
            })
        ];

        // Create different 3D shapes
        for (let i = 0; i < particleCount; i++) {
            let geometry;
            const shapeType = Math.floor(Math.random() * 5);

            switch (shapeType) {
                case 0:
                    // Icosahedron (like a d20 die)
                    geometry = new THREE.IcosahedronGeometry(Math.random() * 0.3 + 0.1, 0);
                    break;
                case 1:
                    // Octahedron (diamond shape)
                    geometry = new THREE.OctahedronGeometry(Math.random() * 0.3 + 0.1, 0);
                    break;
                case 2:
                    // Tetrahedron (pyramid)
                    geometry = new THREE.TetrahedronGeometry(Math.random() * 0.3 + 0.1, 0);
                    break;
                case 3:
                    // Dodecahedron
                    geometry = new THREE.DodecahedronGeometry(Math.random() * 0.3 + 0.1, 0);
                    break;
                default:
                    // Torus (donut shape)
                    geometry = new THREE.TorusGeometry(
                        Math.random() * 0.2 + 0.1, // radius
                        Math.random() * 0.05 + 0.02, // tube radius
                        8, // radial segments
                        12 // tubular segments
                    );
            }

            // Select a random material
            const material = materials[Math.floor(Math.random() * materials.length)];

            // Create mesh and add to group
            const mesh = new THREE.Mesh(geometry, material);

            // Position randomly in 3D space
            mesh.position.set(
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 50
            );

            // Random rotation
            mesh.rotation.set(
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2
            );

            // Store movement properties
            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01,
                    z: (Math.random() - 0.5) * 0.01
                },
                movementSpeed: {
                    x: (Math.random() - 0.5) * 0.03,
                    y: (Math.random() - 0.5) * 0.03,
                    z: (Math.random() - 0.5) * 0.03
                }
            };

            shapes.push(mesh);
            particlesGroup.add(mesh);
        }

        // Add ambient light to better see the shapes
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Add directional light for subtle shading
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 1);
        scene.add(directionalLight);

        // Animation function
        const animate = () => {
            if (!particlesRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

            // Rotate particles group slowly
            particlesRef.current.rotation.x += 0.0003;
            particlesRef.current.rotation.y += 0.0005;

            // Animate each shape individually
            shapes.forEach(shape => {
                // Individual rotation
                shape.rotation.x += shape.userData.rotationSpeed.x;
                shape.rotation.y += shape.userData.rotationSpeed.y;
                shape.rotation.z += shape.userData.rotationSpeed.z;

                // Individual movement
                shape.position.x += shape.userData.movementSpeed.x;
                shape.position.y += shape.userData.movementSpeed.y;
                shape.position.z += shape.userData.movementSpeed.z;

                // Boundary check and bounce
                const bound = 25;
                ['x', 'y', 'z'].forEach(axis => {
                    if (Math.abs(shape.position[axis]) > bound) {
                        shape.userData.movementSpeed[axis] *= -1;
                    }
                });
            });

            // Render scene
            rendererRef.current.render(sceneRef.current, cameraRef.current);

            // Request next frame
            frameRef.current = requestAnimationFrame(animate);
        };

        // Handle window resize
        const handleResize = () => {
            if (!cameraRef.current || !rendererRef.current) return;

            const width = window.innerWidth;
            const height = window.innerHeight;

            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();

            rendererRef.current.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        // Start animation
        animate();

        // Cleanup
        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }

            if (rendererRef.current && rendererRef.current.domElement && containerRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement);
            }

            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div ref={containerRef} className="fixed inset-0 w-full h-full z-0" />;
};

// Option 2: Enhanced Flowing Wave Background with Interactive Movement
export const WaveBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestIdRef = useRef<number>(0);
    const mousePositionRef = useRef({ x: 0, y: 0 });

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

        // Track mouse movement for interactive waves
        const handleMouseMove = (e: MouseEvent) => {
            mousePositionRef.current = {
                x: e.clientX / canvas.width,
                y: e.clientY / canvas.height
            };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Enhanced wave parameters with depth effect
        const waves = [
            { y: canvas.height * 0.6, amplitude: 30, frequency: 0.01, speed: 0.05, color: 'rgba(100, 150, 255, 0.2)', influenceRadius: 0.3 },
            { y: canvas.height * 0.65, amplitude: 25, frequency: 0.015, speed: 0.03, color: 'rgba(70, 130, 220, 0.15)', influenceRadius: 0.35 },
            { y: canvas.height * 0.7, amplitude: 20, frequency: 0.02, speed: 0.07, color: 'rgba(50, 100, 200, 0.1)', influenceRadius: 0.4 },
            { y: canvas.height * 0.75, amplitude: 15, frequency: 0.025, speed: 0.04, color: 'rgba(40, 80, 180, 0.08)', influenceRadius: 0.45 },
            { y: canvas.height * 0.8, amplitude: 10, frequency: 0.03, speed: 0.06, color: 'rgba(30, 60, 160, 0.05)', influenceRadius: 0.5 },
        ];

        // Add shimmer particles
        const particles = Array.from({ length: 50 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.8 + canvas.height * 0.2,
            radius: Math.random() * 2 + 1,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random() * 0.8 + 0.2,
            color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, `
        }));

        let time = 0;

        const animate = () => {
            // Create a gradient background
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, 'rgba(0, 10, 30, 0.1)');
            gradient.addColorStop(1, 'rgba(0, 20, 50, 0.2)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            time += 0.01;

            // Draw enhanced waves with mouse interaction
            waves.forEach((wave, index) => {
                drawEnhancedWave(ctx, wave, time, index, mousePositionRef.current);
            });

            // Update and draw shimmer particles
            particles.forEach(particle => {
                particle.x += particle.speed;
                if (particle.x > canvas.width) {
                    particle.x = 0;
                }

                // Pulsating opacity
                const pulseOpacity = (Math.sin(time * 3 + particle.x * 0.01) + 1) * 0.5 * particle.opacity;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = `${particle.color}${pulseOpacity})`;
                ctx.fill();
            });

            requestIdRef.current = requestAnimationFrame(animate);
        };

        const drawEnhancedWave = (
            ctx: CanvasRenderingContext2D,
            { y, amplitude, frequency, speed, color, influenceRadius }: {
                y: number;
                amplitude: number;
                frequency: number;
                speed: number;
                color: string;
                influenceRadius: number;
            },
            time: number,
            index: number,
            mousePos: { x: number, y: number }
        ) => {
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);

            // Calculate mouse influence
            const mouseAmplitudeBoost = Math.max(0, 1 - Math.hypot(mousePos.x - 0.5, mousePos.y - y / canvas.height) / influenceRadius) * amplitude * 0.5;

            for (let x = 0; x < canvas.width; x++) {
                const xWithTime = x * frequency + time * speed;

                // Combine multiple sine waves for more organic look
                const baseWave = Math.sin(xWithTime);
                const secondaryWave = Math.sin(xWithTime * 1.5 + index) * 0.3;
                const tertiaryWave = Math.sin(xWithTime * 0.5 - index * 0.2) * 0.15;

                const combinedWave = baseWave + secondaryWave + tertiaryWave;

                // Add mouse influence
                const mouseEffect = Math.exp(-Math.pow(x / canvas.width - mousePos.x, 2) / (2 * Math.pow(influenceRadius / 3, 2))) * mouseAmplitudeBoost;

                const yOffset = combinedWave * amplitude + mouseEffect;
                ctx.lineTo(x, y + yOffset);
            }

            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);

            // Enhanced gradient fill
            const gradient = ctx.createLinearGradient(0, y - amplitude, 0, canvas.height);
            const baseColor = color.replace(/[\d.]+\)$/, '');
            gradient.addColorStop(0, `${baseColor}0.1)`);
            gradient.addColorStop(0.5, color);
            gradient.addColorStop(1, `${baseColor}0.05)`);

            ctx.fillStyle = gradient;
            ctx.fill();
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(requestIdRef.current);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />;
};

// Option 3: Cosmic Nebula Background (replacing Grid Background)
export const NebulaBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestIdRef = useRef<number>(0);

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

        // Create nebula cloud blobs
        const cloudCount = 8;
        const clouds = Array.from({ length: cloudCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 300 + 100,
            hue: Math.random() * 60 + 220, // Blue to purple range
            opacity: Math.random() * 0.4 + 0.1,
            pulseSpeed: Math.random() * 0.01 + 0.005,
            pulsePhase: Math.random() * Math.PI * 2,
            movementSpeed: {
                x: (Math.random() - 0.5) * 0.2,
                y: (Math.random() - 0.5) * 0.2
            }
        }));

        // Create stars
        const starCount = 200;
        const stars = Array.from({ length: starCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            twinkleSpeed: Math.random() * 0.05 + 0.02,
            twinklePhase: Math.random() * Math.PI * 2
        }));

        // Create distant galaxies
        const galaxyCount = 3;
        const galaxies = Array.from({ length: galaxyCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 150 + 50,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.001,
            hue: Math.random() * 60 + 220
        }));

        let time = 0;

        const animate = () => {
            // Clear canvas with fade effect
            ctx.fillStyle = 'rgba(0, 5, 20, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            time += 0.01;

            // Draw nebula clouds first (background layer)
            clouds.forEach(cloud => {
                // Update position with wrapping
                cloud.x += cloud.movementSpeed.x;
                cloud.y += cloud.movementSpeed.y;

                // Wrap around edges
                if (cloud.x < -cloud.radius) cloud.x = canvas.width + cloud.radius;
                if (cloud.x > canvas.width + cloud.radius) cloud.x = -cloud.radius;
                if (cloud.y < -cloud.radius) cloud.y = canvas.height + cloud.radius;
                if (cloud.y > canvas.height + cloud.radius) cloud.y = -cloud.radius;

                // Calculate pulsating size and opacity
                const pulse = Math.sin(time * cloud.pulseSpeed + cloud.pulsePhase) * 0.2 + 0.8;
                const currentRadius = cloud.radius * pulse;
                const currentOpacity = cloud.opacity * (pulse * 0.5 + 0.5);

                // Draw nebula cloud with gradient
                const gradient = ctx.createRadialGradient(
                    cloud.x, cloud.y, 0,
                    cloud.x, cloud.y, currentRadius
                );

                gradient.addColorStop(0, `hsla(${cloud.hue}, 80%, 70%, ${currentOpacity * 1.5})`);
                gradient.addColorStop(0.4, `hsla(${cloud.hue + 20}, 70%, 50%, ${currentOpacity})`);
                gradient.addColorStop(1, `hsla(${cloud.hue + 40}, 80%, 30%, 0)`);

                ctx.beginPath();
                ctx.arc(cloud.x, cloud.y, currentRadius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            });

            // Draw distant galaxies
            galaxies.forEach(galaxy => {
                // Update rotation
                galaxy.rotation += galaxy.rotationSpeed;

                // Draw spiral arms
                const armCount = 5;
                const spiralTightness = 0.2;

                ctx.save();
                ctx.translate(galaxy.x, galaxy.y);
                ctx.rotate(galaxy.rotation);

                for (let arm = 0; arm < armCount; arm++) {
                    const angleOffset = (Math.PI * 2 / armCount) * arm;

                    ctx.beginPath();

                    for (let i = 0; i < galaxy.radius; i += 2) {
                        const angle = i * spiralTightness + angleOffset;
                        const x = Math.cos(angle) * i;
                        const y = Math.sin(angle) * i;

                        const distFromCenter = i / galaxy.radius;
                        const opacity = 0.8 * (1 - distFromCenter);

                        ctx.fillStyle = `hsla(${galaxy.hue + i * 0.5}, 70%, 70%, ${opacity * 0.05})`;

                        const dotSize = 1 + (1 - distFromCenter) * 1.5;
                        ctx.beginPath();
                        ctx.arc(x, y, dotSize, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }

                // Draw galaxy core
                const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, galaxy.radius * 0.3);
                coreGradient.addColorStop(0, `hsla(${galaxy.hue - 20}, 80%, 80%, 0.2)`);
                coreGradient.addColorStop(1, `hsla(${galaxy.hue}, 70%, 70%, 0)`);

                ctx.beginPath();
                ctx.arc(0, 0, galaxy.radius * 0.3, 0, Math.PI * 2);
                ctx.fillStyle = coreGradient;
                ctx.fill();

                ctx.restore();
            });

            // Draw stars (foreground layer)
            stars.forEach(star => {
                // Calculate twinkling effect
                const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5;
                const radius = star.radius * (twinkle * 0.5 + 0.5);
                const opacity = twinkle * 0.7 + 0.3;

                // Draw star with glow
                ctx.beginPath();
                ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.fill();

                // Draw glow
                const glowSize = radius * 4;
                const glowGradient = ctx.createRadialGradient(
                    star.x, star.y, 0,
                    star.x, star.y, glowSize
                );

                glowGradient.addColorStop(0, `rgba(200, 220, 255, ${opacity * 0.3})`);
                glowGradient.addColorStop(1, 'rgba(200, 220, 255, 0)');

                ctx.beginPath();
                ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
                ctx.fillStyle = glowGradient;
                ctx.fill();

                // Optional: Add cross-shaped light rays for brighter stars
                if (star.radius > 1.5) {
                    const rayLength = radius * 6 * twinkle;

                    ctx.beginPath();
                    ctx.moveTo(star.x - rayLength, star.y);
                    ctx.lineTo(star.x + rayLength, star.y);
                    ctx.moveTo(star.x, star.y - rayLength);
                    ctx.lineTo(star.x, star.y + rayLength);

                    ctx.strokeStyle = `rgba(200, 220, 255, ${opacity * 0.15})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });

            requestIdRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(requestIdRef.current);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />;
};

// Option 4: Enhanced Gradient Orbs with Better Interaction
export const GradientOrbsBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestIdRef = useRef<number>(0);
    const mousePositionRef = useRef({ x: -1000, y: -1000 });

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

        // Track mouse movement for interactive effects
        const handleMouseMove = (e: MouseEvent) => {
            mousePositionRef.current = {
                x: e.clientX,
                y: e.clientY
            };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Mouse leave event
        const handleMouseLeave = () => {
            mousePositionRef.current = { x: -1000, y: -1000 };
        };
        window.addEventListener('mouseleave', handleMouseLeave);

        // Create enhanced orbs with better properties
        const orbCount = 4;
        const orbs: {
            x: number;
            y: number;
            baseRadius: number;
            radius: number;
            color: { h: number; s: number; l: number; };
            xSpeed: number;
            ySpeed: number;
            pulseSpeed: number;
            pulsePhase: number;
            interactionStrength: number;
        }[] = [];

        // Base palette colors (in HSL)
        const baseColors = [
            { h: 210, s: 80, l: 60 }, // Blue
            { h: 240, s: 70, l: 65 }, // Indigo
            { h: 270, s: 60, l: 60 }, // Purple
            { h: 190, s: 90, l: 70 }, // Cyan
            { h: 220, s: 75, l: 55 }  // Royal Blue
        ];

        for (let i = 0; i < orbCount; i++) {
            const baseColor = baseColors[i % baseColors.length];
            // Slightly vary the color
            const color = {
                h: baseColor.h + (Math.random() - 0.5) * 20,
                s: baseColor.s + (Math.random() - 0.5) * 10,
                l: baseColor.l + (Math.random() - 0.5) * 10
            };

            orbs.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                baseRadius: Math.random() * 180 + 120,
                radius: 0, // Will be calculated in animation loop
                color,
                xSpeed: (Math.random() - 0.5) * 0.4,
                ySpeed: (Math.random() - 0.5) * 0.4,
                pulseSpeed: Math.random() * 0.01 + 0.005,
                pulsePhase: Math.random() * Math.PI * 2,
                interactionStrength: Math.random() * 0.4 + 0.6
            });
        }

        let time = 0;

        const animate = () => {
            // Create a subtle background gradient
            const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            bgGradient.addColorStop(0, 'rgba(5, 10, 25, 0.03)');
            bgGradient.addColorStop(1, 'rgba(10, 20, 40, 0.03)');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            time += 0.01;

            // Draw and move enhanced orbs
            orbs.forEach((orb, index) => {
                // Calculate pulsating radius
                const pulse = Math.sin(time * orb.pulseSpeed + orb.pulsePhase) * 0.2 + 0.8;
                orb.radius = orb.baseRadius * pulse;

                // Move orb
                orb.x += orb.xSpeed;
                orb.y += orb.ySpeed;

                // Bounce off edges with slightly randomized reflection
                if (orb.x - orb.radius < 0 || orb.x + orb.radius > canvas.width) {
                    orb.xSpeed = -orb.xSpeed * (0.9 + Math.random() * 0.2);
                    orb.x = Math.max(orb.radius, Math.min(canvas.width - orb.radius, orb.x));
                }
                if (orb.y - orb.radius < 0 || orb.y + orb.radius > canvas.height) {
                    orb.ySpeed = -orb.ySpeed * (0.9 + Math.random() * 0.2);
                    orb.y = Math.max(orb.radius, Math.min(canvas.height - orb.radius, orb.y));
                }

                // Mouse interaction - attract orbs toward mouse
                // const mouseX = mousePositionRef.current.x;
                // const mouseY = mousePositionRef.current.y;
                // const dx = mouseX - orb.x;
                // const dy = mouseY - orb.y;
                // const dist = Math.sqrt(dx * dx + dy * dy);

                // if (dist < 400) {
                //     const influence = (1 - dist / 400) * 0.06 * orb.interactionStrength;
                //     orb.x += dx * influence;
                //     orb.y += dy * influence;
                // }

                // Color shift based on position and time
                const hueShift = Math.sin(time * 0.1 + index) * 10;
                const satBoost = Math.sin(time * 0.15 + index * 1.3) * 5;
                const colorShifted = {
                    h: orb.color.h + hueShift,
                    s: orb.color.s + satBoost,
                    l: orb.color.l
                };

                // Draw enhanced gradient orb
                const gradient = ctx.createRadialGradient(
                    orb.x, orb.y, 0,
                    orb.x, orb.y, orb.radius
                );

                // Create multi-stop gradient for more depth
                gradient.addColorStop(0, `hsla(${colorShifted.h}, ${colorShifted.s}%, ${colorShifted.l + 15}%, 0.7)`);
                gradient.addColorStop(0.3, `hsla(${colorShifted.h + 5}, ${colorShifted.s - 10}%, ${colorShifted.l + 5}%, 0.5)`);
                gradient.addColorStop(0.7, `hsla(${colorShifted.h + 10}, ${colorShifted.s - 20}%, ${colorShifted.l}%, 0.3)`);
                gradient.addColorStop(1, `hsla(${colorShifted.h}, ${colorShifted.s}%, ${colorShifted.l - 10}%, 0)`);

                ctx.beginPath();
                ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Optional: Add a subtle glow effect
                if (Math.random() < 0.05) {
                    const glowRadius = orb.radius * 1.2;
                    const glowGradient = ctx.createRadialGradient(
                        orb.x, orb.y, orb.radius * 0.8,
                        orb.x, orb.y, glowRadius
                    );

                    glowGradient.addColorStop(0, `hsla(${colorShifted.h}, ${colorShifted.s}%, ${colorShifted.l + 20}%, 0.2)`);
                    glowGradient.addColorStop(1, `hsla(${colorShifted.h}, ${colorShifted.s}%, ${colorShifted.l}%, 0)`);

                    ctx.beginPath();
                    ctx.arc(orb.x, orb.y, glowRadius, 0, Math.PI * 2);
                    ctx.fillStyle = glowGradient;
                    ctx.fill();
                }
            });

            // Optional: Connection lines between nearby orbs
            for (let i = 0; i < orbs.length; i++) {
                for (let j = i + 1; j < orbs.length; j++) {
                    const orb1 = orbs[i];
                    const orb2 = orbs[j];

                    // Calculate distance between orbs
                    const dx = orb2.x - orb1.x;
                    const dy = orb2.y - orb1.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Draw connection line if orbs are close enough
                    const connectionThreshold = orb1.radius + orb2.radius;
                    if (distance < connectionThreshold) {
                        // Create gradient line
                        const lineGradient = ctx.createLinearGradient(orb1.x, orb1.y, orb2.x, orb2.y);

                        lineGradient.addColorStop(0, `hsla(${orb1.color.h}, ${orb1.color.s}%, ${orb1.color.l}%, ${(1 - distance / connectionThreshold) * 0.3})`);
                        lineGradient.addColorStop(1, `hsla(${orb2.color.h}, ${orb2.color.s}%, ${orb2.color.l}%, ${(1 - distance / connectionThreshold) * 0.3})`);

                        ctx.beginPath();
                        ctx.moveTo(orb1.x, orb1.y);
                        ctx.lineTo(orb2.x, orb2.y);
                        ctx.strokeStyle = lineGradient;
                        ctx.lineWidth = (1 - distance / connectionThreshold) * 3;
                        ctx.stroke();
                    }
                }
            }

            requestIdRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(requestIdRef.current);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />;
};

// Option 5: Enhanced 3D Dots Constellation
export const ConstellationBackground: React.FC = () => {
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

// Usage Example Component with updated background options
export const BackgroundSelector: React.FC = () => {
    const [selectedBackground, setSelectedBackground] = useState<string>('particles');

    // Mapping of options to components
    const backgroundComponents: Record<string, React.ReactNode> = {
        particles: <FloatingParticlesBackground />,
        waves: <WaveBackground />,
        nebula: <NebulaBackground />,
        orbs: <GradientOrbsBackground />,
        constellation: <ConstellationBackground />
    };

    return (
        <div className="relative min-h-screen">
            {/* Render the selected background */}
            {backgroundComponents[selectedBackground]}

            {/* Background selector controls with improved styling */}
            <div className="absolute top-4 right-4 p-3 bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-lg z-50 border border-gray-700/50">
                <h3 className="text-white text-sm font-medium mb-2 text-center">Background Effects</h3>
                <div className="flex flex-col space-y-2">
                    <button
                        onClick={() => setSelectedBackground('particles')}
                        className={`px-3 py-2 text-sm rounded-md transition-colors duration-200 ${selectedBackground === 'particles'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                            }`}
                    >
                        3D Shapes
                    </button>
                    <button
                        onClick={() => setSelectedBackground('waves')}
                        className={`px-3 py-2 text-sm rounded-md transition-colors duration-200 ${selectedBackground === 'waves'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                            }`}
                    >
                        Flowing Waves
                    </button>
                    <button
                        onClick={() => setSelectedBackground('nebula')}
                        className={`px-3 py-2 text-sm rounded-md transition-colors duration-200 ${selectedBackground === 'nebula'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                            }`}
                    >
                        Cosmic Nebula
                    </button>
                    <button
                        onClick={() => setSelectedBackground('orbs')}
                        className={`px-3 py-2 text-sm rounded-md transition-colors duration-200 ${selectedBackground === 'orbs'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                            }`}
                    >
                        Gradient Orbs
                    </button>
                    <button
                        onClick={() => setSelectedBackground('constellation')}
                        className={`px-3 py-2 text-sm rounded-md transition-colors duration-200 ${selectedBackground === 'constellation'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                            }`}
                    >
                        Star Constellation
                    </button>
                </div>
            </div>
        </div>
    );
};