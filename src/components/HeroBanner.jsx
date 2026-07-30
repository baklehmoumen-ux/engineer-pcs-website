"use client";

import React, { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    title: "Next-Level Performance",
    subtitle: "RTX Graphics · Fast Memory · Better Gaming",
    tag: "GEFORCE RTX 40 SERIES",
    
    // GPUs
    image1: "https://dlcdnwebimgs.asus.com/gain/1604342F-835B-4F89-BDC9-9834AF558D5C/w1000/h732",
    alt1: "Primary GPU",
    image2: "https://dlcdnwebimgs.asus.com/gain/5f627238-83a2-4886-99ea-0db96c46a489/",
    alt2: "Secondary GPU",
    image3: "https://assets.nvidia.partners/images/png/RTX5070-3QTR-Back-Left_small.png",
    alt3: "Tertiary GPU",
    
    // RAM
    image4: "https://img.overclockers.co.uk/images/MEM-GSK-04195/379569ed093fbfe1a992d709c6f51fec.jpg",
    alt4: "G.Skill RAM",
    image5: "https://assets.corsair.com/image/upload/f_auto,q_auto/pages/Memory%20Matters/VENGEANCE_RGB_DDR5_BLACK_RENDER_07.png",
    alt5: "Corsair RAM",
    
    buttonText: "Shop Build Parts",
    categoryTarget: "GPUs"
  },
  {
    id: 2,
    title: "Ultimate Cooling Power",
    subtitle: "Liquid & Air Coolers · Low Temps · High FPS",
    tag: "THERMALRIGHT VISION",
    
    // Main Cooler
    image1: "/images/aqua360v6.jpg",
    alt1: "AIO Liquid Cooler",
    
    // Empty slots so they don't render on this slide
    image2: "",
    alt2: "",
    image3: "",
    alt3: "",
    
    // Secondary Coolers
    image4: "/images/frozinf360.jpg",
    alt4: "Air Cooler",
    image5: "/images/pv360.jpg",
    alt5: "RGB Cooler",
    
    buttonText: "Explore Cooling",
    categoryTarget: "Liquid & Air Cooling"
  }
];

export default function HeroBanner({ onSelectCategory }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="relative w-full max-w-7xl mx-auto my-4 px-3 md:px-6">
      
      {/* Injecting foolproof keyframes directly into the component for continuous floating */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float1 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(10px) rotate(-2deg); } }
        @keyframes float3 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-6px) rotate(-1deg); } }
        .anim-float-1 { animation: float1 5s ease-in-out infinite; }
        .anim-float-2 { animation: float2 6s ease-in-out infinite; }
        .anim-float-3 { animation: float3 5.5s ease-in-out infinite; }
      `}} />

      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl overflow-hidden shadow-2xl min-h-[460px] md:min-h-[480px] flex items-center border border-gray-800">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* MAP THROUGH ALL SLIDES FOR CROSSFADING */}
        {slides.map((slide, idx) => {
          const isActive = currentSlide === idx;
          
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full flex transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 w-full p-6 md:p-12 items-center gap-4 md:gap-8 h-full relative">
                
                {/* LAYERED ANIMATED IMAGES (LEFT COLUMN) */}
                <div className="relative h-[220px] sm:h-[260px] md:h-full w-full flex items-center justify-center order-2 md:order-1 mt-4 md:mt-0">
                  
                  {/* Image 3 (Tertiary/Back GPU) - Pushed Top Left */}
                  {slide.image3 && (
                    <div className="absolute top-[0%] md:top-[2%] left-0 right-0 mx-auto mr-16 md:mr-32 w-24 sm:w-32 md:w-40 z-10 flex justify-center">
                      <div className={`w-full transition-all duration-1000 delay-500 ease-out transform ${isActive ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-8 md:-translate-y-16 opacity-0 scale-95'}`}>
                        <div className="anim-float-3 w-full flex justify-center">
                          <img 
                            src={slide.image3} 
                            alt={slide.alt3} 
                            className="w-full h-auto object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] brightness-75" 
                            onError={(e) => { e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(slide.alt3)}`; }} 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image 2 (Secondary/Middle GPU) - Pushed Middle Center */}
                  {slide.image2 && (
                    <div className="absolute top-[8%] md:top-[12%] left-0 right-0 mx-auto mr-4 md:mr-8 w-28 sm:w-40 md:w-52 z-20 flex justify-center">
                      <div className={`w-full transition-all duration-1000 delay-300 ease-out transform ${isActive ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-8 md:-translate-y-16 opacity-0 scale-95'}`}>
                        <div className="anim-float-2 w-full flex justify-center">
                          <img 
                            src={slide.image2} 
                            alt={slide.alt2} 
                            className="w-full h-auto object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] brightness-90" 
                            onError={(e) => { e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(slide.alt2)}`; }} 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image 1 (Main/Front GPU) - Pushed Bottom Right */}
                  {slide.image1 && (
                    <div className="absolute top-[16%] md:top-[22%] left-0 right-0 mx-auto ml-12 md:ml-20 w-36 sm:w-48 md:w-64 z-30 flex justify-center">
                      <div className={`w-full transition-all duration-1000 delay-100 ease-out transform ${isActive ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-8 md:-translate-y-16 opacity-0 scale-95'}`}>
                        <div className="anim-float-1 w-full flex justify-center">
                          <img 
                            src={slide.image1} 
                            alt={slide.alt1} 
                            className="w-full h-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.7)]" 
                            onError={(e) => { e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(slide.alt1)}`; }} 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image 4 (Bottom-Left RAM) */}
                  {slide.image4 && (
                    <div className="absolute bottom-[2%] md:bottom-[10%] left-0 md:left-[5%] w-28 sm:w-36 md:w-56 z-40">
                      <div className={`w-full transition-all duration-1000 delay-700 ease-out transform ${isActive ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-8 md:-translate-x-16 opacity-0 scale-95'}`}>
                        <div className="anim-float-2 w-full">
                          <img 
                            src={slide.image4} 
                            alt={slide.alt4} 
                            className="w-full h-auto object-contain -rotate-6 drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]" 
                            onError={(e) => { e.target.src = `https://via.placeholder.com/200x150?text=${encodeURIComponent(slide.alt4)}`; }} 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image 5 (Bottom-Right RAM) */}
                  {slide.image5 && (
                    <div className="absolute bottom-0 md:bottom-[5%] right-0 md:right-[5%] w-32 sm:w-44 md:w-64 z-50">
                      <div className={`w-full transition-all duration-1000 delay-1000 ease-out transform ${isActive ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 md:translate-y-16 opacity-0 scale-95'}`}>
                        <div className="anim-float-3 w-full">
                          <img 
                            src={slide.image5} 
                            alt={slide.alt5} 
                            className="w-full h-auto object-contain rotate-3 drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]" 
                            onError={(e) => { e.target.src = `https://via.placeholder.com/200x150?text=${encodeURIComponent(slide.alt5)}`; }} 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* TEXT & CTA CONTENT (RIGHT COLUMN) */}
                <div className={`flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-2 space-y-2 md:space-y-4 transition-all duration-1000 delay-200 ease-out transform z-50 ${isActive ? 'translate-x-0 opacity-100' : 'translate-x-8 md:translate-x-12 opacity-0'}`}>
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
                    onClick={() => onSelectCategory && onSelectCategory(slide.categoryTarget)}
                    className="mt-2 md:mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold px-6 md:px-8 py-2.5 md:py-3.5 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer text-xs md:text-base flex items-center gap-2"
                  >
                    {slide.buttonText} <span className="text-sm md:text-lg">→</span>
                  </button>
                </div>

              </div>
            </div>
          );
        })}

        {/* NAVIGATION ARROWS */}
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

        {/* SLIDE INDICATORS */}
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

      </div>
    </div>
  );
}