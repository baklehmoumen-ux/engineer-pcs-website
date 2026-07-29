"use client";
import React, { useState, useMemo } from 'react';

// The Massive Master Inventory
const inventory = [
  // --- POWER SUPPLIES ---
  { id: 'psu-1', category: 'Power Supplies', name: 'TR-TB650S 650W 80 PLUS', price: 58, image: '/images/tr-tb650s.jpg' },
  { id: 'psu-2', category: 'Power Supplies', name: 'TR-TB750S 750W', price: 76, image: '/images/tr-tb750s.jpg' },
  { id: 'psu-4', category: 'Power Supplies', name: 'TR-SP850 850W', price: 115, image: '/images/tr-sp850.jpg' },
  { id: 'psu-6', category: 'Power Supplies', name: 'TR-SP1000 1000W', price: 130, image: '/images/tr-sp1000.jpg' },

  // --- AIR & LIQUID COOLING ---
  { id: 'cool-1', category: 'Liquid & Air Cooling', name: 'Assassin X 120 Refined SE ARGB', price: 18, image: '/images/cool1.jpg' },
  { id: 'cool-5', category: 'Liquid & Air Cooling', name: 'Aqua Elite 240 V3 AIO', price: 57, image: '/images/aqua240.jpg' },
  { id: 'cool-9', category: 'Liquid & Air Cooling', name: 'Frozen Notte 360 BLACK ARGB V2', price: 90, image: '/images/froz360argb.jpg' },

  // --- PC CASES ---
  { id: 'case-3', category: 'PC Cases', name: 'Darkflash DY470 Black with 4 argb fans', price: 145, image: '/images/dy470.jpg' },
  { id: 'case-5', category: 'PC Cases', name: 'Darkflash DS950 Black with 6 argb fans', price: 88, image: '/images/ds950.jpg' },
  { id: 'case-8', category: 'PC Cases', name: 'Darkflash C280 Black with 7 argb fans', price: 84, image: '/images/c280.jpg' },
  { id: 'case-12', category: 'PC Cases', name: 'Majesty RAAD Gaming Case', price: 85, image: '/images/majesty.jpg' },

  // --- MONITORS ---
  { id: 'mon-1', category: 'Monitors', name: 'MSI MAG 271QPX QD-OLED X28 27" 280Hz', price: 590, image: '/images/msi271.jpg' },
  { id: 'mon-2', category: 'Monitors', name: 'MSI MAG 244F 24" FHD 200Hz', price: 125, image: '/images/msi244.jpg' },

  // --- PROCESSORS & CORE PARTS ---
  { id: 'core-1', category: 'Processors & Core Parts', name: 'Intel Core i5 12400F 6P+0E/12T 4.4GHz', price: 145, image: '/images/i5.jpg' },
  { id: 'core-2', category: 'Processors & Core Parts', name: 'ASUS PRIME H610M-K D4 LGA 1700', price: 89, image: '/images/h610m.jpg' },
  { id: 'core-4', category: 'Processors & Core Parts', name: 'GainWard RTX 3060 12GB Ghost Edition', price: 289, image: '/images/rtx3060.jpg' },
];

const categories = ['All', 'PC Cases', 'Power Supplies', 'Liquid & Air Cooling', 'Monitors', 'Processors & Core Parts'];

export default function Storefront() {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerView, setDrawerView] = useState('cart'); 
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });

  const filteredInventory = useMemo(() => {
    return inventory.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const submitOrder = (e) => {
    e.preventDefault(); 
    let message = `*🌟 NEW ORDER FROM WEBSITE 🌟*\n\n`;
    message += `*Customer Details:*\n`;
    message += `👤 Name: ${customerInfo.name}\n`;
    message += `📞 Phone: ${customerInfo.phone}\n`;
    message += `🏠 Address: ${customerInfo.address}\n\n`;
    message += `*Order Items:*\n`;
    cart.forEach(item => {
      message += `▪️ ${item.quantity}x ${item.name} - $${item.price * item.quantity}\n`;
    });
    message += `\n*💰 Total Due: $${cartTotal.toFixed(2)}*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/963946508988?text=${encodedMessage}`, '_blank');
  };

  return (
    // Added pb-20 (padding-bottom) so the mobile bottom bar doesn't cover the last products
    <div className="min-h-screen bg-gray-50 font-sans pb-20 md:pb-0">
      
      {/* 1. THE NAVBAR (Responsive adjustments) */}
      <header className="bg-[#131921] text-white p-3 md:p-4 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-3 md:gap-4">
          
          <div className="flex justify-between w-full md:w-auto items-center">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight cursor-pointer hover:text-yellow-400 transition">
              Engineer<span className="text-yellow-500">PCs</span>
            </h1>
            
            {/* Cart Button for Desktop (Hidden on Mobile) */}
            <button 
              onClick={() => { setDrawerView('cart'); setIsDrawerOpen(true); }}
              className="hidden md:flex items-center gap-2 bg-[#232F3E] hover:bg-gray-700 border border-transparent hover:border-white px-4 py-2 rounded transition relative"
            >
              <span className="text-3xl">🛒</span>
              <div className="flex flex-col text-left">
                <span className="text-xs text-gray-300">My Cart</span>
                <span className="font-bold text-yellow-400">${cartTotal.toFixed(2)}</span>
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold text-sm shadow animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex-1 w-full flex rounded-lg overflow-hidden border border-transparent focus-within:border-yellow-400 transition-all shadow-inner">
            <select 
              value={activeCategory} 
              onChange={(e) => setActiveCategory(e.target.value)}
              className="hidden md:block bg-gray-100 text-black px-4 outline-none text-sm cursor-pointer hover:bg-gray-200 border-r border-gray-300"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 md:py-3 text-black outline-none text-sm md:text-base" 
              placeholder="Search products..." 
            />
            <button className="bg-[#FEBD69] hover:bg-[#F3A847] px-4 md:px-6 text-black font-bold text-lg md:text-xl transition-colors">
              🔍
            </button>
          </div>
        </div>
      </header>

      {/* 2. THE CATEGORY MENU (Perfect for mobile swiping) */}
      <nav className="bg-[#232F3E] text-white text-sm py-2 px-2 md:px-4 shadow-md overflow-x-auto whitespace-nowrap hide-scrollbar">
        <div className="max-w-7xl mx-auto flex gap-4 md:gap-6 px-2">
          {categories.map((category) => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`transition-all pb-1 border-b-2 text-sm md:text-base ${
                activeCategory === category ? 'border-yellow-400 text-yellow-400 font-bold' : 'border-transparent hover:border-gray-300 text-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </nav>

      {/* 3. THE PRODUCT GRID (2 columns on mobile, 4 on desktop) */}
      <main className="max-w-7xl mx-auto p-3 md:p-6">
        <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-8 border-b-2 border-gray-200 pb-2">
          {searchQuery ? `Results for "${searchQuery}"` : activeCategory}
        </h2>
        
        {filteredInventory.length === 0 ? (
          <div className="text-center text-gray-500 py-20 text-lg md:text-xl">No products found.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {filteredInventory.map((item) => (
              <div key={item.id} className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden relative">
                
                {/* Smaller image area for mobile */}
                <div className="h-32 md:h-56 bg-gray-50 flex items-center justify-center p-2 md:p-4">
                  <div className="text-gray-400 text-[10px] md:text-xs text-center border-2 border-dashed border-gray-200 p-2 md:p-8 rounded-lg w-full h-full flex items-center justify-center">
                    [Img: {item.image}]
                  </div>
                </div>
                
                {/* Product Text */}
                <div className="p-3 md:p-5 flex flex-col flex-1">
                  <span className="text-[10px] md:text-xs font-bold text-blue-500 uppercase tracking-wider mb-1 line-clamp-1">{item.category}</span>
                  <h3 className="text-gray-900 font-semibold text-xs md:text-sm line-clamp-2 mb-2 md:mb-3">
                    {item.name}
                  </h3>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="text-lg md:text-2xl font-black text-gray-900">${item.price}</div>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-black font-bold h-8 w-8 md:h-12 md:w-12 flex items-center justify-center rounded-full shadow transition-transform transform active:scale-95 text-sm md:text-lg"
                    >
                      ➕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* MOBILE-ONLY STICKY BOTTOM CART BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 px-4 flex justify-between items-center z-40 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">{cartCount} {cartCount === 1 ? 'item' : 'items'} in cart</span>
          <span className="text-xl font-black text-gray-900">${cartTotal.toFixed(2)}</span>
        </div>
        <button 
          onClick={() => { setDrawerView('cart'); setIsDrawerOpen(true); }}
          className="bg-yellow-400 hover:bg-yellow-500 font-bold px-6 py-3 rounded-full text-black shadow-md flex items-center gap-2"
        >
          <span>🛒</span> View Cart
        </button>
      </div>

      {/* 4. THE INTERACTIVE MULTI-STEP DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-60 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
            
            <div className="p-4 md:p-6 bg-gray-900 text-white flex justify-between items-center shadow-md">
              <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                {drawerView === 'cart' ? '🛒 Your Cart' : '📝 Checkout'}
              </h2>
              <button onClick={() => setIsDrawerOpen(false)} className="text-gray-400 hover:text-white text-3xl font-bold leading-none">&times;</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
              {drawerView === 'cart' ? (
                <div className="space-y-3 md:space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20 flex flex-col items-center">
                      <span className="text-5xl md:text-6xl mb-4">🪹</span>
                      <p className="text-lg md:text-xl font-medium">Your cart is empty.</p>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="flex gap-3 items-center bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 text-xs md:text-sm line-clamp-2">{item.name}</h4>
                          <p className="text-gray-500 text-xs md:text-sm mt-1">Qty: {item.quantity} × ${item.price}</p>
                        </div>
                        <div className="text-base md:text-lg font-black text-gray-900">${item.price * item.quantity}</div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-md transition text-sm md:text-base">🗑️</button>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <form id="checkout-form" onSubmit={submitOrder} className="space-y-4 md:space-y-5">
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1">Full Name</label>
                    <input required type="text" placeholder="John Doe" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-yellow-500 text-sm md:text-base" value={customerInfo.name} onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1">WhatsApp / Phone Number</label>
                    <input required type="tel" placeholder="+963..." className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-yellow-500 text-sm md:text-base" value={customerInfo.phone} onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1">Delivery Address</label>
                    <textarea required rows="3" placeholder="City, Street, Building..." className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-yellow-500 text-sm md:text-base" value={customerInfo.address} onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}></textarea>
                  </div>
                  <button type="button" onClick={() => setDrawerView('cart')} className="text-sm text-blue-600 font-bold hover:underline">
                    ← Back to Cart
                  </button>
                </form>
              )}
            </div>

            <div className="p-4 md:p-6 bg-white border-t border-gray-200 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between text-lg md:text-xl mb-4 md:mb-6">
                <span className="font-medium text-gray-600">Total</span>
                <span className="font-black text-gray-900">${cartTotal.toFixed(2)}</span>
              </div>
              
              {drawerView === 'cart' ? (
                <button 
                  disabled={cart.length === 0}
                  onClick={() => setDrawerView('checkout')}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-black font-extrabold py-3 md:py-4 rounded-xl text-base md:text-lg shadow-lg transition-transform transform active:scale-95"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <button 
                  type="submit"
                  form="checkout-form"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-extrabold py-3 md:py-4 rounded-xl text-base md:text-lg shadow-lg transition-transform transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>💬</span> Send Order
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}