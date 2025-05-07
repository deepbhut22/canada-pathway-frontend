import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, TextSelectionIcon } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import BackgroundAnimation from './BackgroundAnimation';
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

  return <span>{displayedText}<span className="animate-pulse"></span></span>;
};

// Fade-in animation
const FadeIn = ({ children, delay = 0, duration = 1000 }: { children: React.ReactNode, delay?: number, duration?: number }) => {
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
  const navigate = useNavigate();

  function handleRedirect(): void {
    if (!useAuthStore.getState().isAuthenticated) {
      navigate('/login');
    } else if (useAuthStore.getState().isAuthenticated && !useUserStore.getState().userProfile.isComplete) {
      useAuthStore.getState().setIsPopupOpen(true);
    } else {
      navigate('/report');
    }
  }

  return (
    <div className="pt-10 bg-gray-950 text-white min-h-screen flex items-center relative overflow-hidden">
      {/* Background network effect for the entire page */}
      <div className="absolute inset-0 opacity-30 pointer-events-none w-full">
        <BackgroundAnimation />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Column - Main Text */}
          <div className="space-y-6 md:space-y-8 w-full sm:w-max">
            <FadeIn delay={30}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-blue-50 max-w-full md:max-w-[90%] lg:max-w-[80%]">
                <TypewriterText text="Find Your Perfect Canadian Immigration Pathway" />
              </h1>
            </FadeIn>

            <FadeIn delay={2000}>
              <p className="text-base sm:text-md md:text-lg text-blue-200 max-w-xl">
                <span className="glow-text font-bold text-white">AI-powered guidance</span> to navigate your journey to Canada with personalized
                recommendations and expert support.
              </p>
            </FadeIn>

            <FadeIn delay={2300}>
              <div className="space-y-4">
                {[
                  {
                    title: "Comprehensive Assessment",
                    desc: "Evaluate eligibility across 80+ immigration programs",
                  },
                  {
                    title: "Real-Time Matching",
                    desc: "Get matched with pathways based on your qualifications",
                  },
                  {
                    title: "Personalized Scoring",
                    desc: "Calculate your CRS score across multiple programs",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm sm:text-base font-medium mb-1">{item.title}</h3>
                      <p className="text-blue-200 text-xs sm:text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={2750}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
                <button 
                  onClick={handleRedirect}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-transparent border border-white text-white rounded-md font-medium transition-all duration-300 hover:bg-white hover:text-secondary-950 flex items-center justify-center hover:border-secondary-950">
                  <TextSelectionIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="text-sm sm:text-base text-center">Get My Free All In One AI-Powered PR Report</span>
                </button>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Optional image/graphic */}
          <div className="hidden lg:block h-96">
            {/* Leave empty or include optional illustration */}
          </div>
        </div>
      </div>
    </div>
  );

}