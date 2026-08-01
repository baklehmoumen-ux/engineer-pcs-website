"use client";

import React, { useState, useEffect, useRef } from 'react';
import { fallbackSlides } from '../Data/storeData';

const SlidingHeroBanner = ({ slides, onAction, lang, proBuildersText }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const displaySlides = slides && slides.length > 0 ? slides : fallbackSlides;

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev === displaySlides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? displaySlides.length - 1 : prev - 1));

  useEffect(() => {
    let interval;
    if (!isHovered && displaySlides.length > 1) {
      interval = setInterval(() => { nextSlide(); }, 6000);
    }
    return () => clearInterval(interval);
  }, [isHovered, currentSlide, displaySlides.length]);

  return (
    <div 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-black flex group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Interactive Mouse Glow */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[120px] mix-blend-screen transition-transform duration-1000 ease-out pointer-events-none z-20"
        style={{ transform: `translate(${mousePos.x * -80}px, ${mousePos.y * -80}px)` }}
      />

      {displaySlides.map((slide, index) => {
        // Smart Bilingual Support
        const title = lang === 'ar' && slide.title_ar ? slide.title_ar : (slide.title_en || slide.title || '');
        const subtitle = lang === 'ar' && slide.subtitle_ar ? slide.subtitle_ar : (slide.subtitle_en || slide.subtitle || '');
        const btnText = lang === 'ar' && slide.btn_text_ar ? slide.btn_text_ar : (slide.btn_text_en || slide.button_text || '');
        
        // Bulletproof Image Parsing
        let imageUrl = slide.image_url || '/images/default.jpg';
        if (!slide.image_url && slide.images) {
          try {
            const parsed = typeof slide.images === 'string' ? JSON.parse(slide.images) : slide.images;
            if (Array.isArray(parsed) && parsed.length > 0) imageUrl = parsed[0].url || parsed[0];
          } catch(e) {}
        }

        // 🌟 DYNAMIC ALIGNMENT LOGIC (With Arabic RTL Flipping)
        let alignClass = "items-start text-left";
        let textAlignment = slide.text_alignment || 'left';

        if (textAlignment === 'center') {
          alignClass = "items-center text-center mx-auto";
        } else if (textAlignment === 'right') {
          alignClass = "items-end text-right ml-auto";
        }

        if (lang === 'ar') {
          if (textAlignment === 'left') alignClass = "items-start text-right";
          if (textAlignment === 'right') alignClass = "items-end text-left mr-auto";
        }

        return (
          <div key={slide.id || index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <div className="absolute inset-0 overflow-hidden w-full h-full">
              <img src={imageUrl} alt={title} className={`w-full h-full object-cover origin-center ${currentSlide === index ? 'slide-active' : 'slide-inactive'}`} />
            </div>
            
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient || 'from-blue-900/90 via-black/80 to-transparent'} z-10`}></div>
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto w-full">
              {/* 🌟 UPGRADED PREMIUM CUBIC-BEZIER ANIMATION */}
              <div className={`max-w-2xl flex flex-col ${alignClass} transform transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${currentSlide === index ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-12 opacity-0'}`}>
                
                <span className="inline-block px-4 py-1 mb-4 text-xs md:text-sm font-black tracking-widest text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 rounded-full uppercase shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                  {proBuildersText}
                </span>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] mb-4 drop-shadow-2xl">
                  {title}
                </h1>
                
                <p className="text-gray-200 text-sm md:text-lg font-medium mb-8 leading-relaxed max-w-xl drop-shadow-lg">
                  {subtitle}
                </p>
                
                {btnText && (
                  <button 
                    onClick={() => onAction(slide.action_target || slide.category_target || 'explore')}
                    className="group/btn relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] hover:-translate-y-1 active:scale-95 cursor-pointer overflow-hidden border border-blue-500/50 inline-flex"
                  >
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover/btn:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                    <span className="flex items-center justify-center gap-3 text-sm md:text-base relative z-10 w-full">
                      <span className="text-xl">{slide.btn_icon || '🚀'}</span> {btnText}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {displaySlides.length > 1 && (
        <>
          <button onClick={prevSlide} className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/50 border border-white/10 text-white backdrop-blur-md transition-all duration-300 cursor-pointer ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={nextSlide} className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/50 border border-white/10 text-white backdrop-blur-md transition-all duration-300 cursor-pointer ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-3 px-4">
            {displaySlides.map((slide, index) => (
              <button key={slide.id || index} onClick={() => setCurrentSlide(index)} className="group/dot relative w-16 h-1.5 rounded-full bg-white/20 overflow-hidden cursor-pointer transition-all hover:bg-white/40">
                {currentSlide === index && <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full" style={{ animation: isHovered ? 'none' : 'progressBar 6s linear forwards', width: isHovered ? '100%' : '0%' }} />}
                {currentSlide > index && <div className="absolute top-0 left-0 h-full w-full bg-white/60 rounded-full" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SlidingHeroBanner;