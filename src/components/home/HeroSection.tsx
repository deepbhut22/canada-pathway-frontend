import React, { useState, useEffect, useRef } from 'react';
import { Compass, MapPin, CheckCircle } from 'lucide-react';

// Network Animation Component
const NetworkAnimation = () => {
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
    const particleCount = 600; // Increased particle count

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

// Text animation with typewriter effect
const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <span>{displayedText}<span className="animate-pulse">|</span></span>;
};

// Fade-in animation
const FadeIn = ({ children, delay = 0, duration = 800 }: { children: React.ReactNode, delay?: number, duration?: number }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
      }}
    >
      {children}
    </div>
  );
};

export default function HeroSection() {
  return (
    <div className="bg-gray-950 text-white min-h-screen flex items-center relative overflow-hidden">
      {/* Background network effect for the entire section */}
      <div className="absolute inset-0 opacity-30 pointer-events-none w-full h-full">
        <NetworkAnimation />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Main Text */}
          <div className="space-y-8 w-max">
            <FadeIn delay={30}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-blue-50 w-[80%]">
                <TypewriterText text="Find Your Perfect Canadian Immigration Pathway" />
              </h1>
            </FadeIn>

            <FadeIn delay={2000}>
              <p className="text-lg text-blue-200 max-w-xl">
                AI-powered guidance to navigate your journey to Canada with personalized
                recommendations and expert support.
              </p>
            </FadeIn>

            <FadeIn delay={2300}>
              <div className="flex items-start space-x-3 mb-2">
                <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-base font-medium mb-1">Comprehensive Assessment</h3>
                  <p className="text-blue-200 text-xs">
                    Evaluate eligibility across 80+ immigration programs
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 mb-2">
                <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-base font-medium mb-1">Real-Time Matching</h3>
                  <p className="text-blue-200 text-xs">
                    Get matched with pathways based on your qualifications
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-base font-medium mb-1">Personalized Scoring</h3>
                  <p className="text-blue-200 text-xs">
                    Calculate your CRS score across multiple programs
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={2750}>
              <div className="flex flex-wrap gap-4">
                {/* <button className="px-6 py-3 bg-transparent border border-blue-400 text-blue-100 rounded-md font-medium transition-all duration-300 hover:bg-blue-900 flex items-center"> */}
                  <button className="px-6 py-3 bg-transparent border border-white text-white rounded-md font-medium transition-all duration-300 hover:bg-white hover:text-secondary-950 flex items-center hover:border hover:border-secondary-950">
                  <MapPin className="h-5 w-5 mr-2" />
                  View My Profile
                </button>
                <button className="px-6 py-3 bg-white text-gray-950 rounded-md font-bold transition-all duration-300 hover:bg-secondary-950 hover:text-white flex items-center hover:border hover:border-white">
                  <Compass className="h-5 w-5 mr-2" />
                  Find My Pathway
                </button>
              </div>
              
            </FadeIn>
          </div>

          {/* Right Column - Empty to maintain layout, network is now background */}
          <div className="hidden lg:block h-96">
            {/* Content removed as the animation is now in the background */}
          </div>
        </div>

        {/* Features Section - Below Main Text */}
        <div className="">
          {/* <FadeIn delay={3000}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-gray-900/70 border border-blue-900/50 p-4 rounded-md shadow-sm">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-base font-medium mb-1">Comprehensive Assessment</h3>
                    <p className="text-blue-200 text-xs">
                      Evaluate eligibility across 80+ immigration programs
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/70 border border-blue-900/50 p-4 rounded-md shadow-sm">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-base font-medium mb-1">Real-Time Matching</h3>
                    <p className="text-blue-200 text-xs">
                      Get matched with pathways based on your qualifications
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/70 border border-blue-900/50 p-4 rounded-md shadow-sm">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-base font-medium mb-1">Personalized Scoring</h3>
                    <p className="text-blue-200 text-xs">
                      Calculate your CRS score across multiple programs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn> */}

          <FadeIn delay={2950}>
            <div className="mt-10 text-center text-blue-300 text-xs">
              Join over 10,000+ users who have successfully found their pathway to Canada
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}