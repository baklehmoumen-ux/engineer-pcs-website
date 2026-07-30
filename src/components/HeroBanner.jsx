"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Connected to your database!

export default function HeroBanner({ onSelectCategory }) {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch slides from database on load
  useEffect(() => {
    async function fetchSlides() {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true });
        
      if (!error && data && data.length > 0) {
        setSlides(data);
      }
      setLoading(false);
    }
    fetchSlides();
  }, []);

  // Auto-play timer
  useEffect(() => {
    if (slides.length <= 1) return; // Don't auto-play if there's only 1 slide
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Don't render until data is loaded
  if (loading || slides.length === 0) return null;

  return (
    <div className="relative w-full max-w-7xl mx-auto my-4 px-3 md:px-6">
      
      {/* Dynamic Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float1 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(1deg); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(10px) rotate(-1deg); } }
        @keyframes float3 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-6px) rotate(0deg); } }
        .anim-float-1 { animation: float1 5s ease-in-out infinite; }
        .anim-float-2 { animation: float2 6s ease-in-out infinite; }
        .anim-float-3 { animation: float3 5.5s ease-in-out infinite; }
      `}} />

      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl overflow-hidden shadow-2xl min-h-[460px] md:min-h-[480px] flex items-center border border-gray-800">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* MAP THROUGH DATABASE SLIDES */}
        {slides.map((slide, idx) => {
          const isActive = currentSlide === idx;
          const isLeftAligned = slide.text_alignment === 'left';
          
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full flex transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 w-full p-6 md:p-12 items-center gap-4 md:gap-8 h-full relative">
                
                {/* DYNAMIC IMAGE BUILDER RENDERER */}
                <div className={`relative h-[220px] sm:h-[260px] md:h-full w-full flex items-center justify-center mt-4 md:mt-0 ${isLeftAligned ? 'order-2' : 'order-2 md:order-1'}`}>
                  
                  {slide.images?.map((img, i) => {
                    // Extracting animation class and delay dynamically from Admin Panel strings
                    const delayMatch = img.animation?.match(/delay-\d+/);
                    const delayClass = delayMatch ? delayMatch[0] : '';
                    const floatClass = img.animation?.replace(/delay-\d+/, '').trim() || '';

                    // Make the entering/exiting animation feel natural based on location
                    let inactiveTransform = '-translate-y-8 md:-translate-y-16';
                    if (img.position?.includes('bottom')) {
                      inactiveTransform = img.position.includes('left') ? '-translate-x-8 md:-translate-x-16' : 'translate-y-8 md:translate-y-16';
                    }

                    return (
                      <div key={i} className={`absolute ${img.position} ${img.width} ${img.zIndex}`}>
                        <div className={`w-full transition-all duration-1000 ${delayClass} ease-out transform ${isActive ? 'translate-y-0 translate-x-0 opacity-100 scale-100' : `${inactiveTransform} opacity-0 scale-95`}`}>
                          <div className={`${floatClass} w-full`}>
                            <img 
                              src={img.url} 
                              alt={`Slide Image ${i + 1}`} 
                              className="w-full h-auto object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]" 
                              onError={(e) => { e.target.style.display = 'none'; }} 
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>

                {/* TEXT & CTA CONTENT */}
                <div className={`flex flex-col items-center md:items-start text-center md:text-left space-y-2 md:space-y-4 transition-all duration-1000 delay-200 ease-out transform z-50 ${isActive ? 'translate-x-0 opacity-100' : (isLeftAligned ? '-translate-x-8 md:-translate-x-12 opacity-0' : 'translate-x-8 md:translate-x-12 opacity-0')} ${isLeftAligned ? 'order-1' : 'order-1 md:order-2'}`}>
                  <span className="text-[10px] md:text-sm font-black text-yellow-400 tracking-widest uppercase bg-yellow-400/10 px-3 md:px-4 py-1.5 rounded-full border border-yellow-400/20 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                    {slide.tag}
                  </span>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
                    {slide.title}
                  </h2>

                  <p className="text-xs sm:text-sm md:text-base font-medium text-gray-400 max-w-md">
                    {slide.subtitle}
                  </p>

                  <button
                    onClick={() => onSelectCategory && onSelectCategory(slide.category_target)}
                    className="mt-2 md:mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold px-6 md:px-8 py-2.5 md:py-3.5 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer text-xs md:text-base flex items-center gap-2"
                  >
                    {slide.button_text} <span className="text-sm md:text-lg">→</span>
                  </button>
                </div>

              </div>
            </div>
          );
        })}

        {/* NAVIGATION ARROWS */}
        {slides.length > 1 && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-40 bg-black/40 hover:bg-black/60 text-white rounded-full p-2.5 md:p-4 backdrop-blur-md transition-all hover:scale-110 cursor-pointer border border-white/10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-40 bg-black/40 hover:bg-black/60 text-white rounded-full p-2.5 md:p-4 backdrop-blur-md transition-all hover:scale-110 cursor-pointer border border-white/10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </>
        )}

        {/* SLIDE INDICATORS */}
        {slides.length > 1 && (
          <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 md:h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  currentSlide === idx ? 'w-6 md:w-10 bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]' : 'w-2 md:w-3 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}