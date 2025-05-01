import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className?: string;
  autoSlideInterval?: number;
  showControls?: boolean;
  itemsPerSlide?: number; // Number of items visible at a time
}

export const HorizontalSlider = <T,>({
  items,
  renderItem,
  className = '',
  autoSlideInterval = 5000,
  showControls = true,
  itemsPerSlide = 1,
}: SliderProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimerRef = useRef<NodeJS.Timeout>();

  const maxIndex = items.length - itemsPerSlide;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxIndex));
  };

  const startAutoPlay = () => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    autoPlayTimerRef.current = setInterval(() => {
      if (isAutoPlaying) nextSlide();
    }, autoSlideInterval);
  };

  const stopAutoPlay = () => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [isAutoPlaying, autoSlideInterval]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Track */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          width: `${(items.length / itemsPerSlide) * 100}%`,
          transform: `translateX(-${(100 / items.length) * currentIndex}%)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{ width: `${100 / items.length}%` }}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>

      {/* Controls */}
      {showControls && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-[45%] -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-secondary-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-[45%] -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-secondary-700" />
          </button>
        </>
      )}
      {/* Slider indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: items.length - itemsPerSlide + 1 }).map((_, index) => (
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
  );
};
