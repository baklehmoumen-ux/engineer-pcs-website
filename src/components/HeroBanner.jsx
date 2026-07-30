"use client";

import React, { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    title: "Next-Level Performance",
    subtitle: "RTX Graphics · Fast Memory · Better Gaming",
    tag: "GEFORCE RTX 40 SERIES",
    gpuImage: "https://dlcdnwebimgs.asus.com/files/media/09b5195d-6d4f-442d-af30-4942b9a2709c/v1/img/kv/pd-front.png",
    ramImageLeft: "https://img.overclockers.co.uk/images/MEM-GSK-04195/379569ed093fbfe1a992d709c6f51fec.jpg",
    ramImageRight: "https://assets.corsair.com/image/upload/f_auto,q_auto/pages/Memory%20Matters/VENGEANCE_RGB_DDR5_BLACK_RENDER_07.png",
    buttonText: "Shop Build Parts",
    categoryTarget: "GPUs"
  },
  {
    id: 2,
    title: "Ultimate Cooling Power",
    subtitle: "Liquid & Air Coolers · Low Temps · High FPS",
    tag: "THERMALRIGHT VISION",
    gpuImage: "/images/aqua360v6.jpg",
    ramImageLeft: "/images/frozinf360.jpg",
    ramImageRight: "/images/pv360.jpg",
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

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full max-w-7xl mx-auto my-4 px-3 md:px-6">
      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl overflow-hidden shadow-2xl min-h-[380px] md:min-h-[440px] flex items-center border border-gray-800">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full p-6 md:p-12 items-center gap-8 relative z-10">
          
          {/* LAYERED ANIMATED IMAGES (LEFT COLUMN) */}
          <div className="relative h-64 md:h-80 w-full flex items-center justify-center order-2 md:order-1">
            
            {/* Top Image (GPU) - Floating Animation */}
            <div className="absolute top-0 left-4 md:left-8 w-44 md:w-64 z-20 transition-all duration-700 transform animate-float-slow">
              <img 
                src={slide.gpuImage} 
                alt="Graphics Card" 
                className="w-full h-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.7)]"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=GPU+Hardware'; }}
              />
            </div>

            {/* Bottom-Left Image (RAM Stack) - Opposite Float */}
            <div className="absolute bottom-2 left-0 w-36 md:w-52 z-10 transition-all duration-700 transform animate-float-reverse">
              <img 
                src={slide.ramImageLeft} 
                alt="RAM Kit" 
                className="w-full h-auto object-contain -rotate-6 drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/200x150?text=RAM+Kit'; }}
              />
            </div>

            {/* Bottom-Right Image (Dark Hardware) - Static offset */}
            <div className="absolute bottom-0 right-2 w-36 md:w-52 z-15 transition-all duration-700 transform animate-float-slow">
              <img 
                src={slide.ramImageRight} 
                alt="Hardware Component" 
                className="w-full h-auto object-contain rotate-3 drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/200x150?text=Component'; }}
              />
            </div>

          </div>

          {/* TEXT & CTA CONTENT (RIGHT COLUMN) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-2 space-y-3 md:space-y-4">
            <span className="text-xs md:text-sm font-black text-yellow-400 tracking-widest uppercase bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
              {slide.tag}
            </span>
            
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {slide.title}
            </h2>

            <p className="text-xs md:text-sm font-semibold text-gray-400">
              {slide.subtitle}
            </p>

            <button
              onClick={() => onSelectCategory && onSelectCategory(slide.categoryTarget)}
              className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold px-6 py-3 rounded-full shadow-lg transition-transform transform active:scale-95 cursor-pointer text-sm md:text-base flex items-center gap-2"
            >
              {slide.buttonText} →
            </button>
          </div>

        </div>

        {/* NAVIGATION ARROWS */}
        <button 
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 md:p-3 backdrop-blur-md transition cursor-pointer border border-white/10"
        >
          ❮
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 md:p-3 backdrop-blur-md transition cursor-pointer border border-white/10"
        >
          ❯
        </button>

        {/* SLIDE INDICATORS */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx ? 'w-8 bg-yellow-400' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}