import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { NewsItem } from '../../types';
import NewsCard from './NewsCard';

interface NewsSectionProps {
  title: string;
  subtitle?: string;
  news: NewsItem[];
  viewAllLink?: string;
}

export default function NewsSection({ title, subtitle, news, viewAllLink }: NewsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Number of cards to show based on screen size
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    // Handle responsive design
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Autoplay logic
  useEffect(() => {
    if (autoplay) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, 5000); // 5 seconds per slide
    }

    return () => {
      resetTimeout();
    };
  }, [currentIndex, autoplay]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex >= news.length - cardsToShow ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex <= 0 ? news.length - cardsToShow : prevIndex - 1
    );
  };

  // Pause autoplay when user interacts
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">{title}</h2>
            {subtitle && <p className="mt-2 text-secondary-600">{subtitle}</p>}
          </div>
          {viewAllLink && (
            <a
              href={viewAllLink}
              className="mt-4 md:mt-0 inline-flex items-center text-secondary-800 hover:text-secondary-950 hover:underline font-medium"
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          )}
        </div>

        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {/* Slider navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-secondary-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-secondary-700" />
          </button>

          {/* Slider container */}
          <div className="overflow-hidden">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
            >
              {news.map((item) => (
                <div
                  key={item.id}
                  className="flex-none w-full sm:w-1/2 lg:w-1/3 px-3"
                >
                  <NewsCard news={item} />
                </div>
              ))}
            </div>
          </div>

          {/* Slider indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: news.length - cardsToShow + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}