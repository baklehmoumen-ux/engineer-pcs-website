"use client";
import React, { useEffect, useState } from 'react';

export default function PerformanceGauge({ cart, t }) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    let newScore = 0;
    const gpu = cart.find(i => i.category === 'GPUs')?.name.toLowerCase() || '';
    const cpu = cart.find(i => i.category === 'CPUs')?.name.toLowerCase() || '';

    // Calculate Power Tier
    if (gpu) {
      if (gpu.includes('4090') || gpu.includes('5090')) newScore += 75;
      else if (gpu.includes('4080') || gpu.includes('5080')) newScore += 60;
      else if (gpu.includes('4070') || gpu.includes('5070')) newScore += 45;
      else newScore += 30;
    }
    if (cpu) {
      if (cpu.includes('x3d') || cpu.includes('9950') || cpu.includes('9900')) newScore += 25;
      else if (cpu.includes('9') || cpu.includes('7')) newScore += 15;
      else newScore += 10;
    }
    
    setScore(Math.min(newScore, 100));
  }, [cart]);

  // Math for the SVG Needle (-90deg is far left, 90deg is far right)
  const rotation = (score / 100) * 180 - 90;
  const isMax = score >= 95;
  const color = score >= 80 ? '#ef4444' : score >= 50 ? '#eab308' : '#3b82f6';
  
  const label = score >= 80 ? '🚀 4K Ultra (120+ FPS)' : score >= 50 ? '🎮 1440p High (144+ FPS)' : score > 0 ? '⚡ 1080p Smooth (100+ FPS)' : 'Awaiting Hardware...';

  return (
    <div className={`relative flex flex-col items-center p-5 bg-gray-900/80 rounded-2xl border border-gray-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 ${isMax ? 'animate-max-shake shadow-[0_0_40px_rgba(239,68,68,0.4)]' : ''}`}>
      
      {/* Background Cinematic Glow based on color */}
      <div className="absolute top-10 w-32 h-32 blur-3xl opacity-30 pointer-events-none" style={{ backgroundColor: color }}></div>

      <div className="flex w-full justify-between items-end mb-2 z-10">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Power Level</span>
        <span className="text-xl font-black" style={{ color }}>{score}%</span>
      </div>

      {/* The Animated SVG Gauge */}
      <svg viewBox="0 0 200 100" className="w-full h-24 sm:h-28 overflow-visible z-10 mt-2">
        {/* Track Background */}
        <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#1f2937" strokeWidth="18" strokeLinecap="round" />
        {/* Dynamic Colored Track */}
        <path 
          d="M 10 100 A 90 90 0 0 1 190 100" 
          fill="none" 
          stroke={color} 
          strokeWidth="18" 
          strokeLinecap="round" 
          strokeDasharray="283" 
          strokeDashoffset={283 - (283 * score) / 100} 
          className="transition-all duration-1000 ease-out" 
        />
        {/* The Needle */}
        <g style={{ transformOrigin: '100px 100px', transform: `rotate(${rotation}deg)`, transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          <polygon points="96,100 104,100 100,20" fill="white" />
        </g>
        {/* Needle Base Pivot */}
        <circle cx="100" cy="100" r="10" fill="#111827" stroke="white" strokeWidth="4" />
      </svg>

      <div className="mt-4 text-xs md:text-sm font-bold text-gray-200 z-10 text-center">{label}</div>
    </div>
  );
}