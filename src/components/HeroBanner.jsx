"use client";

import React, { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    title: "Next-Level Performance",
    subtitle: "RTX Graphics · Fast Memory · Better Gaming",
    tag: "GEFORCE RTX 50 SERIES & Radeon RX 90 SERIES",
    
    // GPUs
    image1: "https://dlcdnwebimgs.asus.com/gain/1604342F-835B-4F89-BDC9-9834AF558D5C/w1000/h732",
    alt1: "Primary GPU",
    image2: "https://dlcdnwebimgs.asus.com/gain/5f627238-83a2-4886-99ea-0db96c46a489/",
    alt2: "Secondary GPU",
    image3: "https://www.asus.com/microsite/Graphics-Cards/GeForce-RTX-50-Series/ph/v1/img/features/cooling/pd.png",
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
    
    // Empty slots (Left and Right Top)
    image1: "",
    alt1: "",
    
    // Main Cooler (Center Top)
    image2: "https://www.thermalright.com/wp-content/uploads/2025/06/TV-B-%E4%B8%BB%E5%9B%BE1500.jpg",
    alt2: "AIO Liquid Cooler",
    
    image3: "",
    alt3: "",
    
    // Secondary Coolers (Bottom Left & Right)
    image4: "https://www.thermalright.com/wp-content/uploads/2024/04/1-5-600x600.jpg",
    alt4: "Air Cooler",
    image5: "https://www.thermalright.com/wp-content/uploads/2023/01/1.jpg",
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
                  
                  {/* Image 3 (Tertiary GPU) - Left Side */}
                  {slide.image3 && (
                    <div className="absolute top-[5%] md:top-[12%] left-[2%] md:left-[5%] w-28 sm:w-36 md:w-44 z-10">
                      <div className={`w-full transition-all duration-1000 delay-500 ease-out transform ${isActive ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-8 md:-translate-y-16 opacity-0 scale-95'}`}>
                        <div className="anim-float-3 w-full">
                          <img 
                            src={slide.image3} 
                            alt={slide.alt3} 
                            className="w-full h-auto object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]" 
                            onError={(e) => { e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(slide.alt3)}`; }} 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image 2 (Secondary GPU / Main Cooler) - Center */}
                  {slide.image2 && (
                    <div className="absolute top-[5%] md:top-[12%] left-1/2 -translate-x-1/2 w-28 sm:w-36 md:w-44 z-20">
                      <div className={`w-full transition-all duration-1000 delay-300 ease-out transform ${isActive ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-8 md:-translate-y-16 opacity-0 scale-95'}`}>
                        <div className="anim-float-2 w-full">
                          <img 
                            src={slide.image2} 
                            alt={slide.alt2} 
                            className="w-full h-auto object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]" 
                            onError={(e) => { e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(slide.alt2)}`; }} 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image 1 (Main GPU) - Right Side */}
                  {slide.image1 && (
                    <div className="absolute top-[5%] md:top-[12%] right-[2%] md:right-[5%] w-28 sm:w-36 md:w-44 z-30">
                      <div className={`w-full transition-all duration-1000 delay-100 ease-out transform ${isActive ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-8 md:-translate-y-16 opacity-0 scale-95'}`}>
                        <div className="anim-float-1 w-full">
                          <img 
                            src={slide.image1} 
                            alt={slide.alt1} 
                            className="w-full h-auto object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]" 
                            onError={(e) => { e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(slide.alt1)}`; }} 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image 4 (Left RAM / Left Air Cooler) - Same Size, Bottom Left */}
                  {slide.image4 && (
                    <div className="absolute bottom-[5%] md:bottom-[10%] left-[10%] md:left-[15%] w-32 sm:w-40 md:w-56 z-40">
                      <div className={`w-full transition-all duration-1000 delay-700 ease-out transform ${isActive ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-8 md:-translate-x-16 opacity-0 scale-95'}`}>
                        <div className="anim-float-2 w-full">
                          <img 
                            src={slide.image4} 
                            alt={slide.alt4} 
                            className="w-full h-auto object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]" 
                            onError={(e) => { e.target.src = `https://via.placeholder.com/200x150?text=${encodeURIComponent(slide.alt4)}`; }} 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image 5 (Right RAM / Right Air Cooler) - Same Size, Bottom Right */}
                  {slide.image5 && (
                    <div className="absolute bottom-[5%] md:bottom-[10%] right-[10%] md:right-[15%] w-32 sm:w-40 md:w-56 z-50">
                      <div className={`w-full transition-all duration-1000 delay-1000 ease-out transform ${isActive ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 md:translate-y-16 opacity-0 scale-95'}`}>
                        <div className="anim-float-3 w-full">
                          <img 
                            src={slide.image5} 
                            alt={slide.alt5} 
                            className="w-full h-auto object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]" 
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