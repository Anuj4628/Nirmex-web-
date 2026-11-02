import React, { useState, useEffect, useRef, useCallback } from 'react';
import HeroSlide from './HeroSlide';
import BottomInfoPanel from './BottomInfoPanel';
import { HERO_SLIDES } from '@/config/hero.config';
import './HeroSlider.css';

const SLIDE_DURATION = 6500; // 6.5 seconds per slide

/**
 * Premium Industrial Hero Slider for NIRMEX METAL INDUSTRIES
 * Features split-screen hero layout, geometric brand panels, photorealistic
 * steel product showcases, and a floating bottom overlapping information strip.
 */
export const HeroSlider = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const totalSlides = HERO_SLIDES.length;

  const goToSlide = useCallback((index) => {
    setCurrentIdx((index + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    goToSlide(currentIdx + 1);
  }, [currentIdx, goToSlide]);

  const handlePrev = useCallback(() => {
    goToSlide(currentIdx - 1);
  }, [currentIdx, goToSlide]);

  // Pause autoplay when browser tab is inactive, resume when active
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Autoplay timer with linear progress animation
  useEffect(() => {
    if (isPaused) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const stepMs = 50;
    const progressIncrement = (stepMs / SLIDE_DURATION) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + progressIncrement;
      });
    }, stepMs);

    timerRef.current = setTimeout(() => {
      goToSlide(currentIdx + 1);
    }, SLIDE_DURATION);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIdx, isPaused, goToSlide]);

  // Mobile Touch Gestures
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    const threshold = 50; // minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = 0;
    touchEndXRef.current = 0;
  };

  const activeSlide = HERO_SLIDES[currentIdx];

  return (
    <section
      className="nirmex-hero"
      aria-roledescription="carousel"
      aria-label="Nirmex Metal Industries Featured Products"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Slides Carousel Area */}
      <div className="nirmex-hero__slides-wrapper">
        {HERO_SLIDES.map((slide, index) => (
          <HeroSlide
            key={slide.id}
            slide={slide}
            isActive={index === currentIdx}
          />
        ))}
      </div>

      {/* Slider Controls & Indicators */}
      <div className="nirmex-hero__controls">
        <div className="nirmex-hero__controls-inner">
          {/* Previous Button */}
          <button
            type="button"
            className="nirmex-hero__arrow nirmex-hero__arrow--prev"
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Numbered Slide Indicators 01, 02, 03, 04 with Progress Fill */}
          <div className="nirmex-hero__indicators" role="tablist" aria-label="Slider Pagination">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentIdx;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  className={`nirmex-hero__indicator-btn ${isActive ? 'nirmex-hero__indicator-btn--active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-selected={isActive}
                  aria-label={`Go to slide ${slide.slideNumber}: ${slide.bottomPanel.brandBlockTitle}`}
                >
                  <span className="nirmex-hero__indicator-number">{slide.slideNumber}</span>
                  <div className="nirmex-hero__indicator-bar">
                    <div
                      className="nirmex-hero__indicator-progress"
                      style={{
                        width: isActive ? `${progress}%` : index < currentIdx ? '100%' : '0%',
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            type="button"
            className="nirmex-hero__arrow nirmex-hero__arrow--next"
            onClick={handleNext}
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating Bottom Overlapping Information Panel */}
      <BottomInfoPanel
        panelData={activeSlide.bottomPanel}
        slideNumber={activeSlide.slideNumber}
      />
    </section>
  );
};

export default HeroSlider;

