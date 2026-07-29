"use client";
import React, { useState } from 'react';

// Here is your stock from the files, tagged with categories!
const inventory = [
  // Cases
  { id: 'dy470', category: 'Cases', name: 'DY470 Black with 4 argb fans, Support two 360mm radiators', price: 145, rating: 4.8, reviews: 112 },
  { id: 'c280', category: 'Cases', name: 'C280 Black Pillar-less dual glass case with 7 argb fans', price: 84, rating: 4.5, reviews: 45 },
  // Power Supplies
  { id: 'tr650', category: 'Power Supplies', name: 'TR-TB650S 650W Power Supply 80 PLUS', price: 58, rating: 4.3, reviews: 42 },
  { id: 'tr850', category: 'Power Supplies', name: 'TR-SP850 850W Power Supply 80 PLUS Gold', price: 115, rating: 4.7, reviews: 88 },
  // Cooling
  { id: 'aqua240', category: 'Cooling', name: 'Aqua Elite 240 V3 AIO Liquid Cooler', price: 57, rating: 4.6, reviews: 56 },
  { id: 'frozen360', category: 'Cooling', name: 'Frozen Notte 360 BLACK ARGB V2 Liquid Cooler', price: 90, rating: 4.9, reviews: 120 },
  // Monitors
  { id: 'mag244f', category: 'Monitors', name: 'MSI MAG 244F 24" FHD 1920x1080 200Hz Gaming Monitor', price: 125, rating: 4.5, reviews: 89 },
  { id: 'mag274', category: 'Monitors', name: 'MSI MAG 274UPDF E16M 27" Dual Mode 4K/160Hz Monitor', price: 565, rating: 4.9, reviews: 21 },
  // Core Components (Prices estimated for functionality)
  { id: 'rtx3060', category: 'Core Components', name: 'GainWard RTX 3060 12GB Ghost Edition Graphic Card', price: 299, rating: 4.9, reviews: 340 },
  { id: 'i512400f', category: 'Core Components', name: 'Intel Core i5 12400F 6P+0E/12T up to 4.4GHz', price: 150, rating: 4.8, reviews: 410 }
];

// The Categories available in your store
const categories = ['All', 'Cooling', 'Power Supplies', 'Cases', 'Monitors', 'Core Components'];

export default function ProductGrid() {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All'); // Tracks which tab is clicked

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // This logic filters the items based on the active tab!
  const filteredInventory = activeCategory === 'All' 
    ? inventory 
    : inventory.filter(item => item.category === activeCategory);

  return (
    <div className="bg-gray-100 min-h-screen">
      
      {/* Secondary Category Navbar - Moved here so it can control the products! */}
      <nav className="bg-[#232F3E] text-white text-sm p-2 flex gap-4 px-4 overflow-x-auto whitespace-nowrap">
        {categories.map((category) => (
          <span 
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`cursor-pointer px-2 py-1 rounded border ${
              activeCategory === category ? 'border-white font-bold' : 'border-transparent hover:border-gray-400'
            }`}
          >
            {category === 'All' ? '☰ All' : category}
          </span>
        ))}
      </nav>

      <div className="p-4 md:p-8">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {activeCategory === 'All' ? 'Featured PC Components' : `${activeCategory} Stock`}
          </h2>
          <div className="text-lg font-medium text-gray-700 bg-white px-4 py-2 rounded shadow-sm border border-gray-200">
            🛒 Cart: <span className="font-bold text-orange-600">{cart.length}</span> items
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* Notice we map over "filteredInventory" now, not just "inventory" */}
          {filteredInventory.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded p-4 flex flex-col hover:shadow-lg transition-shadow duration-200">
              
              <div className="bg-gray-50 h-48 rounded w-full mb-4 flex items-center justify-center text-gray-400 text-sm border border-gray-100">
                [Product Image]
              </div>
              
              <h3 className="text-[#007185] hover:text-[#C7511F] cursor-pointer text-sm font-medium line-clamp-3 mb-1">
                {item.name}
              </h3>
              
              <div className="flex items-center text-sm text-yellow-500 mb-2">
                ★★★★<span className="text-gray-300">★</span> 
                <span className="text-[#007185] ml-2 hover:underline cursor-pointer">{item.reviews}</span>
              </div>

              <div className="text-2xl font-medium text-gray-900 mb-1">
                <span className="text-sm align-top">$</span>{item.price}<span className="text-sm align-top">.00</span>
              </div>
              
              <div className="text-xs text-gray-600 mb-4">
                Ships to <span className="font-bold">Syria</span>
              </div>

              <button 
                onClick={() => addToCart(item)}
                className="mt-auto w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] hover:border-[#F2C200] text-black text-sm font-medium py-2 px-4 rounded-full transition-colors shadow-sm"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}