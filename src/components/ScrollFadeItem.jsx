"use client";

import React, { useState, useEffect, useRef } from 'react';

export const customStyles = `
  @keyframes kinetic-shift {
    0%, 100% { transform: translateY(0) skewX(0deg); }
    50% { transform: translateY(-3px) skewX(-2deg); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }
  @keyframes slideZoom {
    0% { transform: scale(1.15); opacity: 0; }
    10% { opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes slideZoomOut {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(1.05); }
  }
  @keyframes progressBar {
    0% { width: 0%; }
    100% { width: 100%; }
  }

  /* 🌟 NEW PREMIUM ANIMATIONS */
  @keyframes slideInRight {
    from { transform: translateX(100%); box-shadow: none; }
    to { transform: translateX(0); box-shadow: -15px 0 35px rgba(0,0,0,0.5); }
  }
  @keyframes scaleSpring {
    0% { transform: scale(0); opacity: 0; }
    60% { transform: scale(1.15); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes fadeInOverlay {
    from { opacity: 0; backdrop-filter: blur(0px); }
    to { opacity: 1; backdrop-filter: blur(4px); }
  }

  /* 🌟 NEW CSS CLASSES */
  .animate-drawer {
    animation: slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-fab {
    animation: scaleSpring 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  .animate-overlay {
    animation: fadeInOverlay 0.4s ease-out forwards;
  }
  .spring-up {
    transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Existing Utilities */
  .animate-kinetic {
    animation: kinetic-shift 4s ease-in-out infinite;
    display: inline-block;
  }
  .animate-fade-in-up {
    opacity: 0;
    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .slide-active {
    animation: slideZoom 6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
    z-index: 10;
  }
  .slide-inactive {
    animation: slideZoomOut 1s ease-out forwards;
    z-index: 1;
  }
  .btn-morph {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .glass-panel {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

export const ScrollFadeItem = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{ willChange: 'opacity, transform' }}
      className={`transition-all duration-[700ms] ease-out w-full h-full ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-12 scale-[0.96]'
      }`}
    >
      {children}
    </div>
  );
};