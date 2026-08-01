"use client";

import React from 'react';

const marqueeStyles = `
  @keyframes scroll-infinite {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    display: flex;
    width: 200%;
    animation: scroll-infinite 20s linear infinite;
  }
  .animate-marquee:hover {
    animation-play-state: paused;
  }
`;

const brands = ["NVIDIA", "AMD", "Intel", "Corsair", "ASUS", "MSI", "Thermalright", "NZXT", "Logitech", "Lian Li"];

export default function TechMarquee() {
  return (
    <div className="w-full bg-[#050811] border-y border-gray-800 py-4 overflow-hidden relative select-none">
      <style dangerouslySetInnerHTML={{ __html: marqueeStyles }} />
      
      {/* Cinematic Edge Fades */}
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#050811] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#050811] to-transparent z-10 pointer-events-none"></div>

      {/* Scrolling Track */}
      <div className="animate-marquee items-center gap-12 text-gray-700 font-black text-xl md:text-2xl tracking-widest uppercase">
        {brands.concat(brands).concat(brands).map((brand, i) => (
          <span key={i} className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer flex-shrink-0">
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}