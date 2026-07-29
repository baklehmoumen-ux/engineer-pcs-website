"use client";
import React, { useState, useMemo } from 'react';

// Master Inventory Array using RETAIL PRICING ONLY
const inventory = [
  // --- POWER SUPPLIES (PSUs) ---
  { id: 'psu-1', category: 'Power Supplies', name: 'ThermalRight TR-TB650S 650W 80 PLUS', price: 58, image: '/images/tr-tb650s.jpg' },
  { id: 'psu-2', category: 'Power Supplies', name: 'ThermalRight TR-TB750S 750W', price: 76, image: '/images/tr-tb750s.jpg' },
  { id: 'psu-3', category: 'Power Supplies', name: 'ThermalRight TR-SP750 750W 80 PLUS', price: 100, image: '/images/tr-sp750.jpg' },
  { id: 'psu-4', category: 'Power Supplies', name: 'ThermalRight TR-SP850 850W', price: 115, image: '/images/tr-sp850.jpg' },
  { id: 'psu-5', category: 'Power Supplies', name: 'ThermalRight TR-SP850-W 850W White', price: 118, image: '/images/tr-sp850-w.jpg' },
  { id: 'psu-6', category: 'Power Supplies', name: 'ThermalRight TR-SP1000 1000W', price: 130, image: '/images/tr-sp1000.jpg' },
  { id: 'psu-7', category: 'Power Supplies', name: 'ThermalRight TR-SP1000-W 1000W White', price: 135, image: '/images/tr-sp1000-w.jpg' },

  // --- AIR & LIQUID COOLING ---
  { id: 'cool-1', category: 'Liquid & Air Cooling', name: 'Assassin X 120 Refined SE ARGB', price: 18, image: '/images/cool1.jpg' },
  { id: 'cool-2', category: 'Liquid & Air Cooling', name: 'Burst Assassin 120 SE ARGB', price: 24, image: '/images/burst120.jpg' },
  { id: 'cool-3', category: 'Liquid & Air Cooling', name: 'Phantom Spirit 120 SE ARGB', price: 40, image: '/images/phantom120.jpg' },
  { id: 'cool-4', category: 'Liquid & Air Cooling', name: 'Aqua Elite 240 V3 AIO', price: 57, image: '/images/aqua240.jpg' },
  { id: 'cool-5', category: 'Liquid & Air Cooling', name: 'Aqua Elite 240 WHITE V3 AIO', price: 60, image: '/images/aqua240w.jpg' },
  { id: 'cool-6', category: 'Liquid & Air Cooling', name: 'Aqua Elite 240 ARGB BLACK V6', price: 57, image: '/images/aqua240v6.jpg' },
  { id: 'cool-7', category: 'Liquid & Air Cooling', name: 'Aqua Elite 240 ARGB WHITE V6', price: 60, image: '/images/aqua240v6w.jpg' },
  { id: 'cool-8', category: 'Liquid & Air Cooling', name: 'Aqua Elite 360 V3 AIO', price: 70, image: '/images/aqua360.jpg' },
  { id: 'cool-9', category: 'Liquid & Air Cooling', name: 'Aqua Elite 360 WHITE V3 AIO', price: 73, image: '/images/aqua360w.jpg' },
  { id: 'cool-10', category: 'Liquid & Air Cooling', name: 'Aqua Elite 360 ARGB BLACK V6', price: 70, image: '/images/aqua360v6.jpg' },
  { id: 'cool-11', category: 'Liquid & Air Cooling', name: 'Aqua Elite 360 ARGB WHITE V6', price: 73, image: '/images/aqua360v6w.jpg' },
  { id: 'cool-12', category: 'Liquid & Air Cooling', name: 'Frozen Infinity 360 BLACK', price: 82, image: '/images/frozinf360.jpg' },
  { id: 'cool-13', category: 'Liquid & Air Cooling', name: 'Frozen Infinity 360 WHITE', price: 85, image: '/images/frozinf360w.jpg' },
  { id: 'cool-14', category: 'Liquid & Air Cooling', name: 'Frozen Notte 240 BLACK ARGB V2', price: 68, image: '/images/froz240argb.jpg' },
  { id: 'cool-15', category: 'Liquid & Air Cooling', name: 'Frozen Notte 240 WHITE ARGB V2', price: 68, image: '/images/froz240argbw.jpg' },
  { id: 'cool-16', category: 'Liquid & Air Cooling', name: 'Frozen Notte 360 BLACK ARGB V2', price: 90, image: '/images/froz360argb.jpg' },
  { id: 'cool-17', category: 'Liquid & Air Cooling', name: 'Frozen Notte 360 WHITE ARGB V2', price: 90, image: '/images/froz360argbw.jpg' },
  { id: 'cool-18', category: 'Liquid & Air Cooling', name: 'Peerless Vision 240 ARGB BLACK', price: 108, image: '/images/pv240.jpg' },
  { id: 'cool-19', category: 'Liquid & Air Cooling', name: 'Peerless Vision 240 ARGB WHITE', price: 110, image: '/images/pv240w.jpg' },
  { id: 'cool-20', category: 'Liquid & Air Cooling', name: 'Peerless Vision 360 ARGB BLACK', price: 125, image: '/images/pv360.jpg' },
  { id: 'cool-21', category: 'Liquid & Air Cooling', name: 'Peerless Vision 360 ARGB WHITE', price: 127, image: '/images/pv360w.jpg' },
  { id: 'cool-22', category: 'Liquid & Air Cooling', name: 'Peerless Vision 360 UB ARGB BLACK', price: 134, image: '/images/pv360ub.jpg' },
  { id: 'cool-23', category: 'Liquid & Air Cooling', name: 'Peerless Vision 360 UB ARGB WHITE', price: 137, image: '/images/pv360ubw.jpg' },
  { id: 'cool-24', category: 'Liquid & Air Cooling', name: 'Trofeo Vision 360 ARGB BLACK', price: 177, image: '/images/trof360.jpg' },
  { id: 'cool-25', category: 'Liquid & Air Cooling', name: 'Trofeo Vision 360 ARGB WHITE', price: 180, image: '/images/trof360w.jpg' },
  { id: 'cool-26', category: 'Liquid & Air Cooling', name: 'Levita Vision 360 ARGB BLACK', price: 230, image: '/images/lev360.jpg' },
  { id: 'cool-27', category: 'Liquid & Air Cooling', name: 'Levita Vision 360 ARGB WHITE', price: 235, image: '/images/lev360w.jpg' },

  // --- PC CASES ---
  { id: 'case-1', category: 'PC Cases', name: 'ThermalRight A70 VISION', price: 160, image: '/images/a70.jpg' },
  { id: 'case-2', category: 'PC Cases', name: 'ThermalRight A70 VISION WHITE', price: 165, image: '/images/a70w.jpg' },
  { id: 'case-3', category: 'PC Cases', name: 'ThermalRight TL-M10 VISION', price: 123, image: '/images/tlm10.jpg' },
  { id: 'case-4', category: 'PC Cases', name: 'ThermalRight TL-M10W VISION', price: 129, image: '/images/tlm10w.jpg' },
  { id: 'case-5', category: 'PC Cases', name: 'Darkflash DY470 Black with 4 argb fans', price: 145, image: '/images/dy470.jpg' },
  { id: 'case-6', category: 'PC Cases', name: 'Darkflash DY470 White with 4 argb fans', price: 148, image: '/images/dy470w.jpg' },
  { id: 'case-7', category: 'PC Cases', name: 'Darkflash DS950 Black with 6 argb fans', price: 88, image: '/images/ds950.jpg' },
  { id: 'case-8', category: 'PC Cases', name: 'Darkflash DS950 White with 6 argb fans', price: 91, image: '/images/ds950w.jpg' },
  { id: 'case-9', category: 'PC Cases', name: 'Darkflash DS950V Black with 6 argb fans (Screen)', price: 118, image: '/images/ds950v.jpg' },
  { id: 'case-10', category: 'PC Cases', name: 'Darkflash DS950V White with 6 argb fans (Screen)', price: 120, image: '/images/ds950vw.jpg' },
  { id: 'case-11', category: 'PC Cases', name: 'Darkflash F1 Black with 6 argb fans', price: 136, image: '/images/f1.jpg' },
  { id: 'case-12', category: 'PC Cases', name: 'Darkflash F1 White with 6 argb fans', price: 138, image: '/images/f1w.jpg' },
  { id: 'case-13', category: 'PC Cases', name: 'Darkflash C280 Black with 7 argb fans', price: 84, image: '/images/c280.jpg' },
  { id: 'case-14', category: 'PC Cases', name: 'Darkflash C280 White with 7 argb fans', price: 86, image: '/images/c280w.jpg' },
  { id: 'case-15', category: 'PC Cases', name: 'Darkflash DK431 Mesh Black with 4 argb fans', price: 70, image: '/images/dk431m.jpg' },
  { id: 'case-16', category: 'PC Cases', name: 'Darkflash DK431 Glass Black with 4 argb fans', price: 73, image: '/images/dk431g.jpg' },
  { id: 'case-17', category: 'PC Cases', name: 'Darkflash B275 PRO Black with 6 argb fans', price: 54, image: '/images/b275.jpg' },
  { id: 'case-18', category: 'PC Cases', name: 'Darkflash B275 PRO White with 6 argb fans', price: 58, image: '/images/b275w.jpg' },
  { id: 'case-19', category: 'PC Cases', name: 'Darkflash DRX70 Mesh White with 4 rgb fans', price: 66, image: '/images/drx70.jpg' },
  { id: 'case-20', category: 'PC Cases', name: 'Darkflash FT418 PRO Black with 7 argb fans', price: 105, image: '/images/ft418.jpg' },
  { id: 'case-21', category: 'PC Cases', name: 'Darkflash FT418 PRO White with 7 argb fans', price: 109, image: '/images/ft418w.jpg' },
  { id: 'case-22', category: 'PC Cases', name: 'Darkflash DB330M Glass Black with 3 argb fans', price: 45, image: '/images/db330m.jpg' },
  { id: 'case-23', category: 'PC Cases', name: 'Darkflash DB330M Glass White with 3 argb fans', price: 47, image: '/images/db330mw.jpg' },
  { id: 'case-24', category: 'PC Cases', name: 'Darkflash DK361 Black with 4 argb fans', price: 58, image: '/images/dk361.jpg' },

  // --- CASE FANS & HUBS ---
  { id: 'fan-1', category: 'Case Fans & Hubs', name: 'ThermalRight TL-C12C-S X5 Pack', price: 28, image: '/images/tlc12c.jpg' },
  { id: 'fan-2', category: 'Case Fans & Hubs', name: 'ThermalRight TL-C12CW-S X5 White Pack', price: 28, image: '/images/tlc12cw.jpg' },
  { id: 'fan-3', category: 'Case Fans & Hubs', name: 'ThermalRight TL-M12Q-S X3 Pack', price: 25, image: '/images/tlm12q.jpg' },
  { id: 'fan-4', category: 'Case Fans & Hubs', name: 'ThermalRight TL-M12QW-S X3 White Pack', price: 25, image: '/images/tlm12qw.jpg' },
  { id: 'fan-5', category: 'Case Fans & Hubs', name: 'Darkflash INF34 3IN1 Black', price: 26, image: '/images/inf34.jpg' },
  { id: 'fan-6', category: 'Case Fans & Hubs', name: 'Darkflash INF34 3IN1 White', price: 27, image: '/images/inf34w.jpg' },
  { id: 'hub-1', category: 'Case Fans & Hubs', name: 'USB 2.0 HUB X5 BLACK', price: 11, image: '/images/usbhub.jpg' },
  { id: 'hub-2', category: 'Case Fans & Hubs', name: 'USB 2.0 HUB X5 WHITE', price: 11, image: '/images/usbhubw.jpg' },
  { id: 'hub-3', category: 'Case Fans & Hubs', name: 'FAN Argb-HUB Controller REV.A', price: 9, image: '/images/fanhub.jpg' },
  { id: 'hub-4', category: 'Case Fans & Hubs', name: 'FAN-ARGB HUB X8', price: 11, image: '/images/fanhubx8.jpg' },
  { id: 'hub-5', category: 'Case Fans & Hubs', name: 'TL-ARGB and FAN HUB x12 IR BLACK', price: 14, image: '/images/fanhub12.jpg' },
  { id: 'hub-6', category: 'Case Fans & Hubs', name: 'TL-ARGB and FAN HUB x12 IR WHITE', price: 14, image: '/images/fanhub12w.jpg' },
  { id: 'acc-1', category: 'Case Fans & Hubs', name: 'TR-GCSF ARGB VGA Holder', price: 10, image: '/images/vgaholder.jpg' },

  // --- MONITORS ---
  { id: 'mon-1', category: 'Monitors', name: 'MSI MAG 271QPX QD-OLED X28 27" 280Hz', price: 590, image: '/images/msi271.jpg' },
  { id: 'mon-2', category: 'Monitors', name: 'MSI MAG 244F 24" FHD 200Hz', price: 125, image: '/images/msi244.jpg' },
  { id: 'mon-3', category: 'Monitors', name: 'MSI MAG 272QPF E20 27" WQHD 200Hz', price: 240, image: '/images/msi272qpf.jpg' },
  { id: 'mon-4', category: 'Monitors', name: 'MSI MAG 275QPF X30 27" WQHD 300Hz', price: 290, image: '/images/msi275qpf.jpg' },
  { id: 'mon-5', category: 'Monitors', name: 'MSI MAG 272URDF E16 27" DUAL MODE 4K/FHD', price: 385, image: '/images/msi272urdf.jpg' },
  { id: 'mon-6', category: 'Monitors', name: 'MSI MAG 345CQR 34" UWQHD 180Hz', price: 390, image: '/images/msi345cqr.jpg' },
  { id: 'mon-7', category: 'Monitors', name: 'MSI MAG 274UPDF E16M 27" DUAL MODE 4K/FHD', price: 565, image: '/images/msi274updf.jpg' },
  { id: 'mon-8', category: 'Monitors', name: 'MSI MAG 274QPF X30MV 27" WQHD 300Hz', price: 440, image: '/images/msi274qpf.jpg' },

  // --- CHAIRS & ACCESSORIES ---
  { id: 'chair-1', category: 'Chairs & Accessories', name: 'Darkflash Gaming Chair RC400', price: 166, image: '/images/rc400.jpg' },
  { id: 'chair-2', category: 'Chairs & Accessories', name: 'Darkflash Ergonomic Chair EA100 RED', price: 176, image: '/images/ea100r.jpg' },
  { id: 'chair-3', category: 'Chairs & Accessories', name: 'Darkflash Ergonomic Chair EA100 WHITE', price: 176, image: '/images/ea100w.jpg' },
  { id: 'chair-4', category: 'Chairs & Accessories', name: 'Darkflash Ergonomic Chair EA100 BLUE', price: 176, image: '/images/ea100b.jpg' },
  { id: 'pad-1', category: 'Chairs & Accessories', name: 'Darkflash Mouse Pad M2 Grey', price: 8, image: '/images/m2grey.jpg' },
  { id: 'pad-2', category: 'Chairs & Accessories', name: 'Darkflash Mouse Pad M2 Black', price: 8, image: '/images/m2black.jpg' },
  { id: 'pad-3', category: 'Chairs & Accessories', name: 'Darkflash Mouse Pad M5 Black Leather', price: 10, image: '/images/m5black.jpg' },
  { id: 'pad-4', category: 'Chairs & Accessories', name: 'Darkflash Mouse Pad M5 Brown Leather', price: 10, image: '/images/m5brown.jpg' },

  // --- PROCESSORS & CORE PARTS ---
  { id: 'core-1', category: 'Processors & Core Parts', name: 'Intel Core i5 12400F 6P+0E/12T 4.4GHz', price: 145, image: '/images/i5.jpg' },
  { id: 'core-2', category: 'Processors & Core Parts', name: 'ASUS PRIME H610M-K D4 LGA 1700', price: 89, image: '/images/h610m.jpg' },
  { id: 'core-3', category: 'Processors & Core Parts', name: 'GainWard RTX 3060 12GB Ghost Edition', price: 289, image: '/images/rtx3060.jpg' },
];

const categories = [
  'All', 
  'PC Cases', 
  'Power Supplies', 
  'Liquid & Air Cooling', 
  'Case Fans & Hubs', 
  'Monitors', 
  'Chairs & Accessories', 
  'Processors & Core Parts'
];export default function Storefront() {
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
    <div className="min-h-screen bg-gray-50 font-sans pb-20 md:pb-0">
      
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-gray-900 text-gray-300 text-[11px] md:text-xs py-2 px-3 md:px-6 flex justify-between items-center z-50 relative border-b border-gray-800">
        <span className="font-semibold tracking-wide flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          Pro PC Builders
        </span>
        <div className="flex gap-4 md:gap-6">
          <a 
            href="https://wa.me/963946508988" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-white flex items-center gap-1.5 transition font-semibold group"
          >
            <svg className="w-3.5 h-3.5 fill-green-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            WhatsApp
          </a>
          <a 
            href="https://www.instagram.com/engineer_pcs?igsh=MXA3aTJmZWFmajZsdg==" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-white flex items-center gap-1.5 transition font-semibold group"
          >
            <svg className="w-3.5 h-3.5 fill-pink-500 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </a>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <header className="bg-[#131921] text-white p-3 md:p-4 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-3 md:gap-6">
          
          {/* Logo */}
          <div className="flex justify-between w-full md:w-auto items-center">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight cursor-pointer hover:text-yellow-400 transition whitespace-nowrap">
              Engineer<span className="text-yellow-500">PCs</span>
            </h1>
          </div>

          {/* Cleaned & Fixed High-Contrast Search Bar */}
          <div className="flex-1 w-full flex bg-white rounded-lg overflow-hidden border-2 border-transparent focus-within:border-yellow-500 transition-all shadow-md">
            <select 
              value={activeCategory} 
              onChange={(e) => setActiveCategory(e.target.value)}
              className="hidden md:block bg-gray-100 text-gray-800 font-medium px-3 outline-none text-sm cursor-pointer hover:bg-gray-200 border-r border-gray-300 transition-colors"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-gray-900 placeholder-gray-500 px-4 py-2 md:py-2.5 outline-none text-sm md:text-base font-normal" 
              placeholder="Search products..." 
            />
            <button className="bg-[#FEBD69] hover:bg-[#F3A847] px-5 md:px-6 text-black font-bold text-lg md:text-xl transition-colors flex items-center justify-center cursor-pointer">
              🔍
            </button>
          </div>

          {/* Desktop Cart Button */}
          <button 
            onClick={() => { setDrawerView('cart'); setIsDrawerOpen(true); }}
            className="hidden md:flex items-center gap-3 bg-[#232F3E] hover:bg-gray-700 border border-transparent hover:border-white px-4 py-2 rounded-lg transition relative cursor-pointer whitespace-nowrap"
          >
            <span className="text-2xl">🛒</span>
            <div className="flex flex-col text-left">
              <span className="text-xs text-gray-300 font-medium">My Cart</span>
              <span className="font-bold text-yellow-400 text-sm">${cartTotal.toFixed(2)}</span>
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs shadow animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </header>

      {/* 3. CATEGORY NAVIGATION MENU */}
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

      {/* 4. PRODUCT GRID */}
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
                
                <div className="h-32 md:h-56 bg-gray-50 flex items-center justify-center p-2 md:p-4">
                  <div className="text-gray-400 text-[10px] md:text-xs text-center border-2 border-dashed border-gray-200 p-2 md:p-8 rounded-lg w-full h-full flex items-center justify-center">
                    [Img: {item.image}]
                  </div>
                </div>
                
                <div className="p-3 md:p-5 flex flex-col flex-1">
                  <span className="text-[10px] md:text-xs font-bold text-blue-500 uppercase tracking-wider mb-1 line-clamp-1">{item.category}</span>
                  <h3 className="text-gray-900 font-semibold text-xs md:text-sm line-clamp-2 mb-2 md:mb-3">
                    {item.name}
                  </h3>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="text-lg md:text-2xl font-black text-gray-900">${item.price}</div>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-black font-bold h-8 w-8 md:h-12 md:w-12 flex items-center justify-center rounded-full shadow transition-transform transform active:scale-95 text-sm md:text-lg cursor-pointer"
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
          className="bg-yellow-400 hover:bg-yellow-500 font-bold px-6 py-3 rounded-full text-black shadow-md flex items-center gap-2 cursor-pointer"
        >
          <span>🛒</span> View Cart
        </button>
      </div>

      {/* 5. INTERACTIVE MULTI-STEP DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-60 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
            
            <div className="p-4 md:p-6 bg-gray-900 text-white flex justify-between items-center shadow-md">
              <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                {drawerView === 'cart' ? '🛒 Your Cart' : '📝 Checkout'}
              </h2>
              <button onClick={() => setIsDrawerOpen(false)} className="text-gray-400 hover:text-white text-3xl font-bold leading-none cursor-pointer">&times;</button>
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
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-md transition text-sm md:text-base cursor-pointer">🗑️</button>
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
                  <button type="button" onClick={() => setDrawerView('cart')} className="text-sm text-blue-600 font-bold hover:underline cursor-pointer">
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
                  className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-black font-extrabold py-3 md:py-4 rounded-xl text-base md:text-lg shadow-lg transition-transform transform active:scale-95 cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <button 
                  type="submit"
                  form="checkout-form"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-extrabold py-3 md:py-4 rounded-xl text-base md:text-lg shadow-lg transition-transform transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
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