"use client";
import React from 'react';

const flyStyles = `
  @keyframes flyParabola {
    0% { transform: scale(1) translate(0, 0); opacity: 1; }
    50% { transform: scale(1.2) translate(var(--mid-x), var(--mid-y)); opacity: 1; }
    100% { transform: scale(0.15) translate(var(--end-x), var(--end-y)); opacity: 0; }
  }
  .flying-item {
    position: fixed;
    z-index: 9999;
    pointer-events: none;
    border-radius: 12px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.5);
    animation: flyParabola 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  }
`;

export default function FlyToCart({ items, onComplete }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: flyStyles }} />
      {items.map((item) => (
        <img
          key={item.uniqueId}
          src={item.img}
          alt="Flying to cart"
          className="flying-item w-20 h-20 object-cover border-2 border-yellow-400 bg-white"
          style={{
            top: item.startY,
            left: item.startX,
            '--mid-x': `${(item.endX - item.startX) / 2}px`,
            '--mid-y': `-150px`,
            '--end-x': `${item.endX - item.startX}px`,
            '--end-y': `${item.endY - item.startY}px`,
          }}
          onAnimationEnd={() => onComplete(item.uniqueId)}
        />
      ))}
    </>
  );
}