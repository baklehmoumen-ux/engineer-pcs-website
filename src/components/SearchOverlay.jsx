"use client";
import React, { useState, useEffect, useRef } from 'react';

// Smart Fuzzy Matching: Strips spaces, symbols, and checks if characters appear in order.
// e.g., "rx490" will instantly match "RTX 4090"
const fuzzyMatch = (str, pattern) => {
  const s = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const p = pattern.toLowerCase().replace(/[^a-z0-9]/g, '');
  let i = 0, j = 0;
  while (i < s.length && j < p.length) {
    if (s[i] === p[j]) j++;
    i++;
  }
  return j === p.length;
};

export default function SearchOverlay({ inventory, onClose, onSelect }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus the input instantly when opened
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const results = query.length > 1 
    ? inventory.filter(item => fuzzyMatch(item.name, query)).slice(0, 6)
    : [];

  return (
    <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-xl animate-fade-in flex flex-col p-4 md:p-8 pt-16 md:pt-24">
      <div className="w-full max-w-2xl mx-auto relative animate-slide-up-fade">
        
        {/* Spotlight Input */}
        <div className="relative shadow-2xl">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl animate-pulse">🧠</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type 'rx490' or 'intel'... AI will figure it out"
            className="w-full bg-gray-900/90 text-white border border-gray-700 rounded-2xl py-4 md:py-5 pl-14 pr-12 text-lg md:text-xl font-bold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/30 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          />
          <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xl font-black bg-gray-800 p-2 rounded-full leading-none w-8 h-8 flex items-center justify-center transition-colors">&times;</button>
        </div>

        {/* Results / Trending Area */}
        <div className="mt-4 bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          {query.length <= 1 ? (
            <div className="p-4 md:p-6">
              <span className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3 block">🔥 Trending Searches</span>
              <div className="flex flex-wrap gap-2">
                {['RTX 5090', 'Ryzen 9800X3D', '32GB RAM', 'Lian Li Cases'].map(term => (
                  <button key={term} onClick={() => setQuery(term)} className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold px-4 py-2 rounded-xl text-sm border border-gray-700 transition">
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <ul className="max-h-[60vh] overflow-y-auto hide-scrollbar">
              {results.map(item => (
                <li key={item.id} className="border-b border-gray-800/50 last:border-0">
                  <button onClick={() => onSelect(item)} className="w-full text-left p-4 hover:bg-gray-800 transition flex items-center gap-4 group">
                    <img src={item.image.split(',')[0]} className="w-12 h-12 rounded object-cover border border-gray-700 group-hover:scale-110 transition-transform" alt="thumb"/>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{item.category}</span>
                      <span className="text-sm md:text-base font-bold text-white truncate">{item.name}</span>
                    </div>
                    <span className="ml-auto font-black text-yellow-400 shrink-0">${item.price}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-10 text-center text-gray-500 font-medium">
              <span className="text-4xl block mb-2">🤔</span>
              Even AI couldn't figure that one out.<br/>Try another search.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}