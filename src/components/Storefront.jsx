"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import HeroBanner from './HeroBanner';

// =========================================================================
// 🌟 NEW: SCROLL REVEAL ANIMATION COMPONENT
// Automatically fades items in/out smoothly as you scroll past them
// =========================================================================
const ScrollFadeItem = ({ children }) => {
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

// Dictionary Translations for UI, Categories, & New Features
const dictionary = {
  en: {
    proBuilders: 'Pro PC Builders',
    selectPartPrefix: 'Select a',
    selectPartSuffix: 'for your build',
    backToBuilder: 'Back to Builder',
    search: 'Search:',
    items: 'items',
    sort: 'Sort:',
    featured: 'Featured',
    lowToHigh: 'Price: Low to High',
    highToLow: 'Price: High to Low',
    reset: 'Reset ✕',
    noProducts: 'No matching products found.',
    outOfStock: 'Out of Stock',
    viewDetails: '🔍 View Details',
    unavailable: 'Unavailable',
    system: 'System',
    buildReady: 'Build Ready',
    buildPc: 'Build PC',
    total: 'Total',
    yourCart: '🛒 Your Cart',
    checkout: '📝 Checkout',
    pcBuilder: '🛠️ Engineer Your Own PC',
    buildComplete: '✅ Build Complete!',
    missingComponents: '⚠️ Missing Components',
    requiredLabel: 'Required:',
    optional: '(Optional)',
    choose: '+ Choose',
    swap: 'Swap',
    cartEmpty: 'Your cart is empty.',
    each: 'each',
    fullName: 'Full Name',
    phone: 'WhatsApp / Phone Number',
    address: 'Delivery Address',
    backToCartBtn: '← Back to Cart',
    totalDue: 'Total Due',
    reviewCart: 'Review Cart 🛒',
    proceedToCheckout: 'Proceed to Checkout',
    sendOrder: '💬 Send Order',
    availability: 'Availability',
    inStockReady: 'In Stock ✅ (Ready for Delivery)',
    outOfStockBadge: 'Out of Stock ❌',
    descSpecs: 'Description & Specifications',
    addToBuild: '✅ Add to Build',
    addToCart: '➕ Add to Cart',
    currentlyUnavailable: 'Currently Unavailable',
    
    // BUILDER, VIEW SWITCHER & SHARE FEATURES
    estWattage: 'Estimated Wattage',
    psuCapacity: 'PSU Capacity',
    fixBtn: '🔧 Fix Item',
    expectedPerf: '🎮 Expected Performance',
    shareBuildBtn: '📲 Share Build',
    shareCartBtn: '📲 Share Cart',
    shareBuildTitle: '⚡ PC Build Summary',
    copyLink: '📋 Copy Text Summary',
    shareWhatsApp: '💬 Share via WhatsApp',
    close: 'Close',
    viewList: '☰ Detailed List',
    viewGrid: '🔳 Grid',
    add: 'Add',

    // ADVANCED E-COMMERCE FEATURES
    filters: 'Filters',
    compare: 'Compare',
    compareItems: 'Compare Items',
    frequentlyBought: 'Frequently Bought Together',
    notifyMe: '🔔 Notify Me',
    saveBuild: '💾 Save Build',
    paymentMethod: 'Payment Method',
    card: 'Credit Card',
    whatsapp: 'WhatsApp',
    loginToSave: 'Please log in to save your build.',
    emailAlert: 'Enter your email to be notified when this is back in stock:',
    
    categories: {
      'All': 'All', 
      'CPUs': 'CPUs',
      'Motherboards': 'Motherboards', 
      'GPUs': 'GPUs',
      'RAM': 'RAM',
      'Storage': 'Storage',
      'PC Cases': 'PC Cases', 
      'Power Supplies': 'Power Supplies', 
      'Liquid & Air Cooling': 'Liquid & Air Cooling', 
      'Case Fans & Hubs': 'Case Fans & Hubs', 
      'Monitors': 'Monitors', 
      'Chairs & Accessories': 'Chairs & Accessories'
    },
    partLabels: {
      'CPU': 'CPU',
      'CPU Cooler': 'CPU Cooler',
      'Motherboard': 'Motherboard',
      'Memory': 'Memory',
      'Storage': 'Storage',
      'Video Card': 'Video Card',
      'Case': 'Case',
      'Power Supply': 'Power Supply'
    }
  },ar: {
    proBuilders: 'خبراء تجميع الحاسوب',
    selectPartPrefix: 'اختر',
    selectPartSuffix: 'لتجميعتك',
    backToBuilder: 'العودة للتجميعة',
    search: 'البحث:',
    items: 'عنصر',
    sort: 'الترتيب:',
    featured: 'المميزة',
    lowToHigh: 'السعر: من الأقل للأعلى',
    highToLow: 'السعر: من الأعلى للأقل',
    reset: 'إعادة ضبط ✕',
    noProducts: 'لم يتم العثور على منتجات مطابقة.',
    outOfStock: 'نفدت الكمية',
    viewDetails: '🔍 عرض التفاصيل',
    unavailable: 'غير متوفر',
    system: 'النظام',
    buildReady: 'التجميعة جاهزة',
    buildPc: 'تجميع حاسوب',
    total: 'المجموع',
    yourCart: '🛒 سلة التسوق',
    checkout: '📝 إتمام الطلب',
    pcBuilder: '🛠️ صمّم حاسوبك الخاص',
    buildComplete: '✅ التجميعة مكتملة!',
    missingComponents: '⚠️ قطع مفقودة',
    requiredLabel: 'المطلوب:',
    optional: '(اختياري)',
    choose: '+ اختيار',
    swap: 'تغيير',
    cartEmpty: 'سلة التسوق فارغة.',
    each: 'للقطعة',
    fullName: 'الاسم الكامل',
    phone: 'رقم الواتساب / الهاتف',
    address: 'عنوان التوصيل',
    backToCartBtn: '← العودة للسلة',
    totalDue: 'المبلغ الإجمالي',
    reviewCart: 'مراجعة السلة 🛒',
    proceedToCheckout: 'المتابعة للشراء',
    sendOrder: '💬 إرسال الطلب',
    availability: 'التوفر',
    inStockReady: 'متوفر ✅ (جاهز للتوصيل)',
    outOfStockBadge: 'نفدت الكمية ❌',
    descSpecs: 'الوصف والمواصفات',
    addToBuild: '✅ إضافة للتجميعة',
    addToCart: '➕ إضافة للسلة',
    currentlyUnavailable: 'غير متوفر حالياً',

    // BUILDER, VIEW SWITCHER & SHARE FEATURES
    estWattage: 'استهلاك الطاقة المقدر',
    psuCapacity: 'سعة مزود الطاقة',
    fixBtn: '🔧 إصلاح القطعة',
    expectedPerf: '🎮 الأداء المتوقع',
    shareBuildBtn: '📲 مشاركة التجميعة',
    shareCartBtn: '📲 مشاركة السلة',
    shareBuildTitle: '⚡ ملخص التجميعة',
    copyLink: '📋 نسخ النص',
    shareWhatsApp: '💬 مشاركة عبر الواتساب',
    close: 'إغلاق',
    viewList: '☰ القائمة التفصيلية',
    viewGrid: '🔳 شبكة',
    add: 'إضافة',

    // ADVANCED E-COMMERCE FEATURES
    filters: 'تصفية',
    compare: 'مقارنة',
    compareItems: 'مقارنة المنتجات',
    frequentlyBought: 'غالباً ما تشترى معاً',
    notifyMe: '🔔 أعلمني',
    saveBuild: '💾 حفظ التجميعة',
    paymentMethod: 'طريقة الدفع',
    card: 'بطاقة ائتمان',
    whatsapp: 'واتساب',
    loginToSave: 'يرجى تسجيل الدخول لحفظ التجميعة.',
    emailAlert: 'أدخل بريدك الإلكتروني لإعلامك عند توفر المنتج:',

    categories: {
      'All': 'الكل', 
      'CPUs': 'المعالجات',
      'Motherboards': 'اللوحات الأم', 
      'GPUs': 'كروت الشاشة',
      'RAM': 'الذاكرة (رام)',
      'Storage': 'التخزين',
      'PC Cases': 'صناديق الحاسوب', 
      'Power Supplies': 'مزودات الطاقة', 
      'Liquid & Air Cooling': 'التبريد المائي والهوائي', 
      'Case Fans & Hubs': 'المراوح والموزعات', 
      'Monitors': 'الشاشات', 
      'Chairs & Accessories': 'الكراسي والملحقات'
    },
    partLabels: {
      'CPU': 'المعالج',
      'CPU Cooler': 'مبرد المعالج',
      'Motherboard': 'اللوحة الأم',
      'Memory': 'الذاكرة',
      'Storage': 'التخزين',
      'Video Card': 'كرت الشاشة',
      'Case': 'الصندوق',
      'Power Supply': 'مزود الطاقة'
    }
  }
};

const categories = [
  'All', 
  'CPUs',
  'Motherboards', 
  'GPUs',
  'RAM',
  'Storage',
  'PC Cases', 
  'Power Supplies', 
  'Liquid & Air Cooling', 
  'Case Fans & Hubs', 
  'Monitors', 
  'Chairs & Accessories'
];

const requiredParts = [
  { key: 'CPUs', labelKey: 'CPU', icon: <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect></svg>, required: true },
  { key: 'Liquid & Air Cooling', labelKey: 'CPU Cooler', icon: <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="12" cy="12" r="6"></circle></svg>, required: true },
  { key: 'Motherboards', labelKey: 'Motherboard', icon: <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2"></rect></svg>, required: true },
  { key: 'RAM', labelKey: 'Memory', icon: <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none"><rect x="2" y="8" width="20" height="8" rx="2"></rect></svg>, required: true },
  { key: 'Storage', labelKey: 'Storage', icon: <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none"><rect x="4" y="5" width="16" height="14" rx="2"></rect></svg>, required: true },
  { key: 'GPUs', labelKey: 'Video Card', icon: <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none"><rect x="2" y="7" width="20" height="10" rx="2"></rect></svg>, required: true },
  { key: 'PC Cases', labelKey: 'Case', icon: <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none"><rect x="5" y="3" width="14" height="18" rx="2"></rect></svg>, required: true },
  { key: 'Power Supplies', labelKey: 'Power Supply', icon: <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none"><rect x="3" y="6" width="18" height="12" rx="2"></rect></svg>, required: true }
];// Master Starter Inventory with Pre-Populated PCPartPicker Specs
const staticInventory = [
  // Power Supplies
  { id: 'psu-1', category: 'Power Supplies', name: 'ThermalRight TR-TB650S 650W 80 PLUS', price: 58, image: '/images/tr-tb650s.jpg', specs: { type: 'ATX', efficiency: '80+ Gold', wattage: '650 W', modular: 'Full', color: 'Black' } },
  { id: 'psu-2', category: 'Power Supplies', name: 'ThermalRight TR-TB750S 750W', price: 76, image: '/images/tr-tb750s.jpg', specs: { type: 'ATX', efficiency: '80+ Gold', wattage: '750 W', modular: 'Full', color: 'Black' } },
  { id: 'psu-3', category: 'Power Supplies', name: 'ThermalRight TR-SP750 750W 80 PLUS', price: 100, image: '/images/tr-sp750.jpg', specs: { type: 'ATX', efficiency: '80+ Gold', wattage: '750 W', modular: 'Full', color: 'Black' } },
  { id: 'psu-4', category: 'Power Supplies', name: 'ThermalRight TR-SP850 850W', price: 115, image: '/images/tr-sp850.jpg', specs: { type: 'ATX', efficiency: '80+ Gold', wattage: '850 W', modular: 'Full', color: 'Black' } },
  { id: 'psu-5', category: 'Power Supplies', name: 'ThermalRight TR-SP850-W 850W White', price: 118, image: '/images/tr-sp850-w.jpg', specs: { type: 'ATX', efficiency: '80+ Gold', wattage: '850 W', modular: 'Full', color: 'White' } },
  { id: 'psu-6', category: 'Power Supplies', name: 'ThermalRight TR-SP1000 1000W', price: 130, image: '/images/tr-sp1000.jpg', specs: { type: 'ATX', efficiency: '80+ Gold', wattage: '1000 W', modular: 'Full', color: 'Black' } },
  { id: 'psu-7', category: 'Power Supplies', name: 'ThermalRight TR-SP1000-W 1000W White', price: 135, image: '/images/tr-sp1000-w.jpg', specs: { type: 'ATX', efficiency: '80+ Gold', wattage: '1000 W', modular: 'Full', color: 'White' } },

  // Coolers
  { id: 'cool-1', category: 'Liquid & Air Cooling', name: 'ThermalRight Assassin X 120 Refined SE ARGB (AM4,AM5)', price: 18, image: '/images/cool1.jpg', specs: { rpm: '1550 RPM', noise: '25.6 dB', color: 'Black / Silver', radSize: '120 mm' } },
  { id: 'cool-2', category: 'Liquid & Air Cooling', name: 'ThermalRight Burst Assassin 120 SE ARGB', price: 24, image: '/images/burst120.jpg', specs: { rpm: '1550 RPM', noise: '25.6 dB', color: 'Black', radSize: '120 mm' } },
  { id: 'cool-3', category: 'Liquid & Air Cooling', name: 'ThermalRight Phantom Spirit 120 SE ARGB', price: 40, image: '/images/phantom120.jpg', specs: { rpm: '1500 RPM', noise: '25.6 dB', color: 'Black', radSize: '120 mm' } },

  // PC Cases
  { id: 'case-1', category: 'PC Cases', name: 'ThermalRight A70 VISION', price: 160, image: '/images/a70.jpg', specs: { type: 'ATX Mid Tower', color: 'Black', sidePanel: 'Tempered Glass', volume: '45.0 L', bays: '2' } },
  { id: 'case-2', category: 'PC Cases', name: 'ThermalRight A70 VISION WHITE', price: 165, image: '/images/a70w.jpg', specs: { type: 'ATX Mid Tower', color: 'White', sidePanel: 'Tempered Glass', volume: '45.0 L', bays: '2' } },

  // Monitors & CPUs & Motherboards
  { id: 'mon-1', category: 'Monitors', name: 'MSI MAG 271QPX QD-OLED X28', price: 590, image: '/images/msi271.jpg', specs: { size: '27.0"', resolution: '2560 x 1440', refresh: '360 Hz', response: '0.03 ms', panel: 'QD-OLED', aspect: '16:9' } },
  { id: 'mon-2', category: 'Monitors', name: 'MSI MAG 244F', price: 125, image: '/images/msi244.jpg', specs: { size: '23.8"', resolution: '1920 x 1080', refresh: '200 Hz', response: '0.5 ms', panel: 'IPS', aspect: '16:9' } },
  { id: 'cpu-amd-1', category: 'CPUs', name: 'Ryzen 5 7500F', price: 138, image: '/images/r5-7500f.jpg', specs: { cores: '6', clock: '3.7 GHz', boost: '5.0 GHz', arch: 'Zen 4', tdp: '65 W', igpu: 'None' } },
  { id: 'cpu-amd-2', category: 'CPUs', name: 'Ryzen 5 9600X', price: 205, image: '/images/r5-9600x.jpg', specs: { cores: '6', clock: '3.9 GHz', boost: '5.4 GHz', arch: 'Zen 5', tdp: '65 W', igpu: 'Radeon' } },
  { id: 'cpu-amd-3', category: 'CPUs', name: 'Ryzen 7 7800X3D', price: 315, image: '/images/r7-7800x3d.jpg', specs: { cores: '8', clock: '4.2 GHz', boost: '5.0 GHz', arch: 'Zen 4', tdp: '120 W', igpu: 'Radeon' } },
  { id: 'cpu-amd-5', category: 'CPUs', name: 'Ryzen 7 9800X3D', price: 420, image: '/images/r7-9800x3d.jpg', specs: { cores: '8', clock: '4.7 GHz', boost: '5.2 GHz', arch: 'Zen 5', tdp: '120 W', igpu: 'Radeon' } },
  { id: 'mb-2', category: 'Motherboards', name: 'ASUS B850M AYW GAMING WIFI', price: 185, image: '/images/asus-b850m.jpg', specs: { socket: 'AM5', formFactor: 'Micro ATX', memoryMax: '256 GB', memorySlots: '4', color: 'Black / Silver' } },
  { id: 'gpu-mock', category: 'GPUs', name: 'NVIDIA GeForce RTX 4090 FE', price: 1599, image: 'https://via.placeholder.com/300?text=RTX+4090', in_stock: false, specs: { chipset: 'RTX 4090', memory: '24 GB', clock: '2235 MHz', boost: '2520 MHz', color: 'Silver/Black' } }
];export default function Storefront() {
  const [lang, setLang] = useState('en');
  const t = dictionary[lang];

  // Storefront Layout View State: 'list' (PCPartPicker detailed view) or 'grid'
  const [viewMode, setViewMode] = useState('list');

  const [dbProducts, setDbProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  
  // NEW Advanced E-Commerce Features State
  const [compareItems, setCompareItems] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('whatsapp'); // 'whatsapp' | 'card'

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerView, setDrawerView] = useState('cart'); // 'cart', 'checkout', 'builder', 'auth'
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
  
  const [toastMessage, setToastMessage] = useState('');
  const [selectingFor, setSelectingFor] = useState(null);

  // Modals
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');

  // 1. Fetch live products from Supabase
  useEffect(() => {
    async function fetchLiveProducts() {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (!error && data) {
          setDbProducts(data);
        }
      } catch (err) {
        console.error('Error fetching live inventory:', err);
      }
    }
    fetchLiveProducts();
  }, []);

  // 2. Combine Supabase items with static inventory
  const masterInventory = useMemo(() => {
    const dbIds = new Set(dbProducts.map(p => p.id));
    const remainingStatic = staticInventory.filter(item => !dbIds.has(item.id));
    return [...dbProducts, ...remainingStatic];
  }, [dbProducts]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2200);
  };

  const handleToggleCompare = (item) => {
    setCompareItems(prev => {
      if (prev.find(i => i.id === item.id)) return prev.filter(i => i.id !== item.id);
      if (prev.length >= 4) {
        showToast(lang === 'ar' ? 'الحد الأقصى 4 منتجات للمقارنة' : 'Maximum 4 items to compare');
        return prev;
      }
      return [...prev, item];
    });
  };

  // Filter & Price Sorting
  const filteredInventory = useMemo(() => {
    let items = masterInventory.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'low-high') {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      items = [...items].sort((a, b) => b.price - a.price);
    }

    return items;
  }, [masterInventory, activeCategory, searchQuery, sortBy]);

  // Frequently Bought Together Logic (Pulls 2 items from other categories)
  const relatedItems = useMemo(() => {
    if (!selectedProduct) return [];
    return masterInventory.filter(i => i.category !== selectedProduct.category && i.in_stock !== false).slice(0, 2);
  }, [selectedProduct, masterInventory]);const addToCart = (product) => {
    if (product.in_stock === false) {
      setNotifyModalOpen(true);
      return;
    }
    
    const isBuilderSelection = selectingFor === product.category;
    
    setCart(prev => {
      let newCart = prev;
      if (isBuilderSelection) {
        newCart = prev.filter(item => item.category !== product.category);
      }
      
      const existing = newCart.find(item => item.id === product.id);
      if (existing) {
        return newCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...newCart, { ...product, quantity: 1 }];
    });
    
    showToast(`${product.name.slice(0, 22)}...`);

    if (isBuilderSelection) {
      setSelectingFor(null);
      setDrawerView('builder');
      setIsDrawerOpen(true);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const getItemQuantity = (id) => {
    const found = cart.find(item => item.id === id);
    return found ? found.quantity : 0;
  };

  // ⚡ POWER WATTAGE & COMPATIBILITY CALCULATION ENGINE
  const wattageInfo = useMemo(() => {
    let estimatedWattage = 65; 
    let selectedPsuWattage = 0;

    cart.forEach(item => {
      const name = item.name.toLowerCase();
      const cat = item.category;

      if (cat === 'CPUs') {
        if (name.includes('9950x3d') || name.includes('9900x')) estimatedWattage += 170;
        else if (name.includes('7800x3d') || name.includes('9800x3d') || name.includes('9700x')) estimatedWattage += 120;
        else if (name.includes('7500f') || name.includes('9600x')) estimatedWattage += 88;
        else estimatedWattage += 105;
      } else if (cat === 'GPUs') {
        if (name.includes('4090') || name.includes('5090')) estimatedWattage += 450;
        else if (name.includes('4080') || name.includes('5080')) estimatedWattage += 320;
        else if (name.includes('4070') || name.includes('5070')) estimatedWattage += 240;
        else estimatedWattage += 180;
      } else if (cat === 'Power Supplies') {
        const match = name.match(/(\d{3,4})\s*w/i) || name.match(/(\d{3,4})/);
        if (match) selectedPsuWattage = parseInt(match[1]);
      }
    });

    return { estimated: estimatedWattage, psu: selectedPsuWattage };
  }, [cart]);

  // Compatibility & Power Deficit Error Checks
  const compatibilityErrors = useMemo(() => {
    const errors = [];
    
    if (wattageInfo.psu > 0 && wattageInfo.psu < wattageInfo.estimated) {
      errors.push({
        id: 'insufficient-power',
        categoryTarget: 'Power Supplies',
        messageEn: `Insufficient Power Supply! Estimated draw is ~${wattageInfo.estimated}W, but selected PSU is only ${wattageInfo.psu}W.`,
        messageAr: `عفواً! مزود الطاقة غير كافٍ. الاستهلاك المقدر هو ~${wattageInfo.estimated} واط والمزود الحالي ${wattageInfo.psu} واط فقط.`
      });
    }

    const cpu = cart.find(i => i.category === 'CPUs');
    const mb = cart.find(i => i.category === 'Motherboards');
    if (cpu && mb) {
      const cpuName = cpu.name.toLowerCase();
      const mbName = mb.name.toLowerCase();
      
      const isAmdCpu = cpuName.includes('ryzen') || cpuName.includes('7500f') || cpuName.includes('7800x3d') || cpuName.includes('9800x3d');
      const isIntelMb = mbName.includes('h610') || mbName.includes('b760') || mbName.includes('z790') || mbName.includes('z890');
      
      if (isAmdCpu && isIntelMb) {
        errors.push({
          id: 'socket-mismatch',
          categoryTarget: 'Motherboards',
          messageEn: `Incompatible Socket! Your AMD Ryzen CPU will not fit into Intel Motherboard (${mb.name}).`,
          messageAr: `قطع غير متوافقة! معالج AMD Ryzen لا يعمل مع لوحة أم Intel (${mb.name}).`
        });
      }
    }

    return errors;
  }, [cart, wattageInfo]);

  const expectedPerformance = useMemo(() => {
    const gpu = cart.find(i => i.category === 'GPUs');
    const cpu = cart.find(i => i.category === 'CPUs');

    if (!gpu && !cpu) return lang === 'ar' ? 'الرجاء اختيار قطع لعرض الأداء المتوقع' : 'Select parts to calculate estimated performance';
    
    const gpuName = gpu ? gpu.name.toLowerCase() : '';
    
    if (gpuName.includes('4090') || gpuName.includes('5090') || gpuName.includes('4080') || gpuName.includes('5080')) {
      return lang === 'ar' ? '🚀 أداء خارق: 4K Ultra FPS (120+ FPS) · تتبع الأشعة المتقدم' : '🚀 Extreme Performance: 4K Ultra Gaming (120+ FPS) · Ray Tracing';
    } else if (gpuName.includes('4070') || gpuName.includes('5070') || gpuName.includes('7800x3d')) {
      return lang === 'ar' ? '🎮 أداء ممتازة: 1440p Ultra FPS (144+ FPS) · ألعاب تنافسية' : '🎮 High Performance: 1440p Ultra Gaming (144+ FPS) · Esports Ready';
    }
    return lang === 'ar' ? '⚡ أداء جيد: 1080p High FPS (100+ FPS) · ألعاب بدقة عالية' : '⚡ Solid Performance: 1080p High FPS (100+ FPS) · Smooth Gaming';
  }, [cart, lang]);

  const buildStatus = useMemo(() => {
    let requiredCount = 0;
    let fulfilledCount = 0;
    const missing = [];
    
    requiredParts.forEach(part => {
      if (part.required) requiredCount++;
      const hasItem = cart.some(item => item.category === part.key);
      if (hasItem && part.required) fulfilledCount++;
      if (!hasItem && part.required) missing.push(t.partLabels[part.labelKey] || part.labelKey);
    });

    return {
      isComplete: missing.length === 0 && compatibilityErrors.length === 0,
      missing,
      progress: Math.round((fulfilledCount / requiredCount) * 100)
    };
  }, [cart, compatibilityErrors, t]); const generateShareBuildText = () => {
    let text = `⚡ *${t.shareBuildTitle} - EngineerPCs*\n\n`;
    text += `🎯 *${t.expectedPerf}:*\n${expectedPerformance}\n\n`;
    text += `⚡ *${t.estWattage}:* ~${wattageInfo.estimated}W ${wattageInfo.psu ? `(PSU: ${wattageInfo.psu}W)` : ''}\n\n`;
    text += `📦 *Parts Included:*\n`;
    cart.forEach(item => {
      text += `▪️ ${item.name} - $${item.price}\n`;
    });
    text += `\n💰 *Total Price: $${cartTotal.toFixed(2)}*`;
    return text;
  };

  const handleShareBuildWhatsApp = () => {
    const encoded = encodeURIComponent(generateShareBuildText());
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const handleCopyShareText = () => {
    navigator.clipboard.writeText(generateShareBuildText());
    showToast(lang === 'ar' ? 'تم نسخ التجميعة إلى الحافظة! 📋' : 'Build summary copied to clipboard! 📋');
  };

  const openDetailModal = (product) => {
    setSelectedProduct(product);
    const firstImg = product.image ? product.image.split(',')[0].trim() : '/images/default.jpg';
    setActiveImage(firstImg);
  };

  const startSelectingPart = (category) => {
    setActiveCategory(category);
    setSelectingFor(category);
    setIsDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitOrder = (e) => {
    e.preventDefault(); 
    if (paymentMethod === 'card') {
      showToast('Redirecting to Secure Payment Gateway...');
      return; 
    }
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

  // HELPER: Renders the Pill-Style Spec Grid for Detailed View
  const renderProductSpecs = (item) => {
    const s = item.specs || {};
    const cat = item.category;

    const SpecBox = ({ label, val }) => (
      <div className="bg-gray-50/70 border border-gray-100 rounded-xl p-2 md:p-3 flex flex-col justify-center transition-colors hover:bg-gray-100">
        <span className="text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5">{label}</span>
        <span className="text-xs sm:text-sm font-bold text-gray-900 truncate">{val}</span>
      </div>
    );

    if (cat === 'CPUs') {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3 w-full">
          <SpecBox label="Core Count" val={s.cores || '8'} />
          <SpecBox label="Core Clock" val={s.clock || '4.2 GHz'} />
          <SpecBox label="Boost Clock" val={s.boost || '5.0 GHz'} />
          <SpecBox label="Microarch" val={s.arch || 'Zen 4'} />
          <SpecBox label="TDP" val={s.tdp || '120 W'} />
          <SpecBox label="iGPU" val={s.igpu || 'Radeon'} />
        </div>
      );
    } else if (cat === 'GPUs') {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3 w-full">
          <SpecBox label="Chipset" val={s.chipset || 'RTX 5070'} />
          <SpecBox label="Memory (VRAM)" val={s.memory || '12 GB'} />
          <SpecBox label="Core Clock" val={s.clock || '2160 MHz'} />
          <SpecBox label="Boost Clock" val={s.boost || '2542 MHz'} />
          <SpecBox label="Color" val={s.color || 'Black'} />
          <SpecBox label="Length" val={s.length || '282 mm'} />
        </div>
      );
    } else if (cat === 'Motherboards') {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3 w-full">
          <SpecBox label="Socket" val={s.socket || 'AM5'} />
          <SpecBox label="Form Factor" val={s.formFactor || 'Micro ATX'} />
          <SpecBox label="Memory Slots" val={s.memorySlots || '4'} />
          <SpecBox label="Memory Max" val={s.memoryMax || '256 GB'} />
          <SpecBox label="Color" val={s.color || 'Black'} />
        </div>
      );
    } else if (cat === 'RAM') {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3 w-full">
          <SpecBox label="Speed" val={s.speed || 'DDR5-6000'} />
          <SpecBox label="Modules" val={s.modules || '2 x 16GB'} />
          <SpecBox label="CAS Latency" val={s.cas || '30'} />
          <SpecBox label="First Word Lat." val={s.latency || '10 ns'} />
          <SpecBox label="Color" val={s.color || 'Black'} />
        </div>
      );
    } else if (cat === 'Storage') {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3 w-full">
          <SpecBox label="Capacity" val={s.capacity || '1 TB'} />
          <SpecBox label="Type" val={s.type || 'SSD'} />
          <SpecBox label="Form Factor" val={s.formFactor || 'M.2-2280'} />
          <SpecBox label="Interface" val={s.interface || 'M.2 PCIe 4.0 X4'} />
        </div>
      );
    } else if (cat === 'Power Supplies') {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3 w-full">
          <SpecBox label="Type" val={s.type || 'ATX'} />
          <SpecBox label="Efficiency" val={s.efficiency || '80+ Gold'} />
          <SpecBox label="Wattage" val={s.wattage || '850 W'} />
          <SpecBox label="Modular" val={s.modular || 'Full'} />
          <SpecBox label="Color" val={s.color || 'Black'} />
        </div>
      );
    } else if (cat === 'Monitors') {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3 w-full">
          <SpecBox label="Screen Size" val={s.size || '27.0"'} />
          <SpecBox label="Resolution" val={s.resolution || '2560 x 1440'} />
          <SpecBox label="Refresh Rate" val={s.refresh || '240 Hz'} />
          <SpecBox label="Response Time" val={s.response || '1 ms'} />
          <SpecBox label="Panel Type" val={s.panel || 'IPS'} />
          <SpecBox label="Aspect Ratio" val={s.aspect || '16:9'} />
        </div>
      );
    } else if (cat === 'PC Cases') {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3 w-full">
          <SpecBox label="Type" val={s.type || 'ATX Mid Tower'} />
          <SpecBox label="Color" val={s.color || 'Black'} />
          <SpecBox label="Side Panel" val={s.sidePanel || 'Tempered Glass'} />
          <SpecBox label="External Vol." val={s.volume || '45.0 L'} />
        </div>
      );
    } else if (cat === 'Liquid & Air Cooling') {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3 w-full">
          <SpecBox label="Fan RPM" val={s.rpm || '1550 RPM'} />
          <SpecBox label="Noise Level" val={s.noise || '25.6 dB'} />
          <SpecBox label="Radiator Size" val={s.radSize || '360 mm'} />
          <SpecBox label="Color" val={s.color || 'Black'} />
        </div>
      );
    }

    return (
      <p className="text-xs text-gray-500 mt-2">
        {item.description || `Official ${item.category} component verified by EngineerPCs.`}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24 md:pb-0 relative" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-yellow-400 text-xs md:text-sm font-semibold animate-bounce">
          <span className="text-yellow-400">✨</span> {toastMessage}
        </div>
      )}

      {/* FLOATING COMPARE BUTTON */}
      {compareItems.length > 0 && (
        <div className="fixed bottom-24 md:bottom-8 right-4 z-40 animate-bounce">
          <button onClick={() => setIsCompareModalOpen(true)} className="bg-blue-600 text-white font-black px-6 py-3 rounded-full shadow-2xl border-2 border-white flex items-center gap-2 transition hover:bg-blue-700 active:scale-95 cursor-pointer">
            <span className="text-lg">⚖️</span> {t.compare} ({compareItems.length})
          </button>
        </div>
      )}

      {/* STICKY SELECTION BANNER */}
      {selectingFor && (
        <div className="bg-blue-600 text-white p-3 sticky top-[68px] md:top-[76px] z-30 shadow-md flex justify-between items-center px-4 md:px-6">
          <span className="text-xs md:text-sm font-bold flex items-center gap-2">
            <span className="animate-pulse text-lg">🔍</span> {t.selectPartPrefix} <span className="text-yellow-300 underline underline-offset-4">{t.categories[selectingFor] || selectingFor}</span> {t.selectPartSuffix}
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => { setSelectingFor(null); setIsDrawerOpen(true); setDrawerView('builder'); }} 
              className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer shadow-sm border border-blue-400/50 whitespace-nowrap"
            >
              {t.backToBuilder}
            </button>
            <button onClick={() => setSelectingFor(null)} className="text-white hover:text-gray-200 px-2 font-bold cursor-pointer text-lg leading-none">✕</button>
          </div>
        </div>
      )}

      {/* 1. TOP UTILITY BAR */}
      <div className="bg-gray-900 text-gray-300 text-[11px] md:text-xs py-2 px-3 md:px-6 flex justify-between items-center z-50 relative border-b border-gray-800">
        <span className="font-semibold tracking-wide flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          {t.proBuilders}
        </span>

        <div className="flex gap-3 md:gap-6 items-center">
          <button 
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="hover:text-yellow-400 text-white font-bold flex items-center gap-1.5 transition text-xs bg-gray-800 hover:bg-gray-700 px-2.5 py-1 rounded-full border border-gray-700 cursor-pointer shadow-sm"
          >
            <span>🌐</span> {lang === 'en' ? 'العربية' : 'English'}
          </button>

          <a href="https://www.instagram.com/engineer_pcs?igsh=MXA3aTJmZWFmajZsdg==" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1.5 transition font-semibold group">
            <svg className="w-3.5 h-3.5 fill-pink-500 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </a>

          <a href="https://wa.me/963946508988" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1.5 transition font-semibold group">
            <svg className="w-3.5 h-3.5 fill-green-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>

      {/* HERO BANNER SECTION */}
      <HeroBanner onSelectCategory={(cat) => setActiveCategory(cat)} />

      {/* 3. CATEGORY NAVIGATION MENU */}
      <nav className="bg-[#232F3E] text-white text-sm py-2 px-2 md:px-4 shadow-md overflow-x-auto whitespace-nowrap hide-scrollbar">
        <div className="max-w-7xl mx-auto flex gap-4 md:gap-6 px-2">
          {categories.map((category) => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`transition-all pb-1 border-b-2 text-sm md:text-base cursor-pointer ${
                activeCategory === category ? 'border-yellow-400 text-yellow-400 font-bold' : 'border-transparent hover:border-gray-300 text-gray-300'
              }`}
            >
              {t.categories[category] || category}
            </button>
          ))}
        </div>
      </nav>{/* 4. MAIN PRODUCT DISPLAY HEADER & SIDEBAR FILTERS */}
      <main className="max-w-7xl mx-auto p-3 md:p-6 flex flex-col lg:flex-row gap-6">
        
        {/* SIDEBAR FILTER */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-6 pt-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 sticky top-24">
            <h3 className="font-black text-gray-900 mb-5 border-b pb-3 flex items-center gap-2"><span>⚙️</span> {t.filters}</h3>
            
            <div className="space-y-5">
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase mb-2">Availability</div>
                <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded accent-blue-600 cursor-pointer" /> In Stock Only</label>
              </div>

              {activeCategory !== 'All' ? (
                <>
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase mb-2">Brand</div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium cursor-pointer hover:text-blue-600"><input type="checkbox" className="w-4 h-4 rounded accent-blue-600 cursor-pointer" /> AMD</label>
                      <label className="flex items-center gap-2 text-sm font-medium cursor-pointer hover:text-blue-600"><input type="checkbox" className="w-4 h-4 rounded accent-blue-600 cursor-pointer" /> Intel</label>
                      <label className="flex items-center gap-2 text-sm font-medium cursor-pointer hover:text-blue-600"><input type="checkbox" className="w-4 h-4 rounded accent-blue-600 cursor-pointer" /> NVIDIA</label>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase mb-2">Price Range</div>
                    <input type="range" className="w-full accent-blue-600 cursor-pointer" min="0" max="2000" />
                    <div className="flex justify-between text-xs font-bold text-gray-400 mt-1"><span>$0</span><span>$2000+</span></div>
                  </div>
                </>
              ) : (
                <p className="text-xs text-gray-400 font-medium italic border-t pt-4">Select a specific category above to view detailed technical filters.</p>
              )}
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6 border-b-2 border-gray-200 pb-3 pt-4">
            <h2 className="text-lg md:text-2xl font-bold text-gray-800">
              {searchQuery ? `${t.search} "${searchQuery}"` : (t.categories[activeCategory] || activeCategory)}
            </h2>
            
            <div className="flex items-center justify-between sm:justify-end gap-3 flex-wrap">
              <div className="flex bg-gray-200 p-1 rounded-lg border border-gray-300">
                <button onClick={() => setViewMode('list')} className={`px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}>{t.viewList}</button>
                <button onClick={() => setViewMode('grid')} className={`px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}>{t.viewGrid}</button>
              </div>

              <span className="text-xs md:text-sm text-gray-500 font-medium">{filteredInventory.length} {t.items}</span>

              <div className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 shadow-sm">
                <span className="text-xs text-gray-500 font-medium">{t.sort}</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent text-xs md:text-sm font-semibold text-gray-800 outline-none cursor-pointer">
                  <option value="default">{t.featured}</option>
                  <option value="low-high">{t.lowToHigh}</option>
                  <option value="high-low">{t.highToLow}</option>
                </select>
              </div>

              {(activeCategory !== 'All' || searchQuery) && (
                <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-2.5 py-1.5 rounded-lg font-semibold transition cursor-pointer">{t.reset}</button>
              )}
            </div>
          </div>

          {filteredInventory.length === 0 ? (
            <div className="text-center text-gray-500 py-20 text-lg md:text-xl">{t.noProducts}</div>
          ) : viewMode === 'list' ? (
            
            /* DETAILED LIST VIEW WITH SWIPEABLE CAROUSEL & PILL SPECS */
            <div className="space-y-4 md:space-y-6">
              {filteredInventory.map(item => {
                const qty = getItemQuantity(item.id);
                const isOutOfStock = item.in_stock === false;
                const images = item.image ? item.image.split(',').map(i => i.trim()) : ['/images/default.jpg'];

                return (
                  <ScrollFadeItem key={item.id}>
                    <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col gap-4 relative">
                      
                      {/* Compare Checkbox */}
                      <div className="absolute top-4 left-4 z-20 bg-white/90 p-1.5 rounded-lg shadow-sm backdrop-blur">
                        <input type="checkbox" className="w-4 h-4 cursor-pointer accent-blue-600" checked={compareItems.some(i => i.id === item.id)} onChange={(e) => { e.stopPropagation(); handleToggleCompare(item); }} title="Compare this item" />
                      </div>

                      {/* IMAGE CAROUSEL (TOP) */}
                      <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {images.map((img, idx) => (
                          <div key={idx} className="w-[85%] sm:w-[45%] md:w-[30%] shrink-0 snap-start relative border border-gray-100 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                            <img 
                              src={img} 
                              alt={`${item.name} - View ${idx + 1}`} 
                              className="h-40 md:h-56 w-full object-contain cursor-pointer hover:scale-105 transition-transform"
                              onClick={() => openDetailModal(item)}
                              onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=PC+Component'; }}
                            />
                            {isOutOfStock && idx === 0 && (
                              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10 pointer-events-none">
                                <span className="bg-red-600 text-white font-black text-xs uppercase tracking-widest px-3 py-1.5 rounded-md shadow-lg">{t.outOfStockBadge}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* INFO SECTION */}
                      <div className="flex flex-col">
                        <span className="text-[10px] md:text-xs font-black text-blue-600 uppercase tracking-widest mb-1 pl-10 md:pl-0">{t.categories[item.category] || item.category}</span>
                        <h3 className="font-extrabold text-gray-900 text-base md:text-xl leading-snug cursor-pointer hover:text-blue-600 transition" onClick={() => openDetailModal(item)}>
                          {item.name}
                        </h3>
                        
                        <div className="flex items-center gap-1 text-xs text-yellow-500 font-bold mt-1.5">
                          ★★★★★ <span className="text-gray-400 text-[10px] font-medium">(48)</span>
                        </div>

                        {renderProductSpecs(item)}
                      </div>

                      {/* FOOTER SECTION */}
                      <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                        <div className="text-2xl md:text-3xl font-black text-gray-900">${item.price}</div>
                        
                        {isOutOfStock ? (
                          <button onClick={(e) => { e.stopPropagation(); setNotifyModalOpen(true); }} className="bg-gray-800 hover:bg-gray-900 text-white font-bold px-4 md:px-6 py-2.5 rounded-xl text-sm shadow-md transition cursor-pointer flex items-center gap-2">
                            {t.notifyMe}
                          </button>
                        ) : qty === 0 ? (
                          <button onClick={() => addToCart(item)} className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold px-6 md:px-8 py-2.5 md:py-3 rounded-xl text-sm shadow-md transition transform active:scale-95 cursor-pointer flex items-center gap-2">
                            + {t.add}
                          </button>
                        ) : (
                          <div className="flex items-center bg-gray-100 rounded-xl border border-gray-300 p-1 shadow-inner h-10 md:h-12">
                            <button onClick={() => updateQuantity(item.id, -1)} className="bg-white hover:bg-gray-200 text-black font-bold h-full w-10 md:w-12 rounded-lg flex items-center justify-center text-sm shadow-sm cursor-pointer transition">-</button>
                            <span className="px-4 font-black text-sm md:text-base text-gray-800">{qty}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold h-full w-10 md:w-12 rounded-lg flex items-center justify-center text-sm shadow-sm cursor-pointer transition">+</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </ScrollFadeItem>
                );
              })}
            </div>

          ) : (

            /* CLASSIC GRID VIEW */
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
              {filteredInventory.map((item) => {
                const qty = getItemQuantity(item.id);
                const isOutOfStock = item.in_stock === false;
                const firstImage = item.image ? item.image.split(',')[0].trim() : '/images/default.jpg';

                return (
                  <ScrollFadeItem key={item.id}>
                    <div className={`group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full overflow-hidden relative ${isOutOfStock ? 'opacity-75' : ''}`}>
                      
                      <div className="absolute top-2 left-2 z-30 bg-white/90 p-1 rounded shadow-sm backdrop-blur">
                        <input type="checkbox" className="w-4 h-4 cursor-pointer accent-blue-600" checked={compareItems.some(i => i.id === item.id)} onChange={(e) => { e.stopPropagation(); handleToggleCompare(item); }} />
                      </div>

                      <div onClick={() => openDetailModal(item)} className="h-32 md:h-56 bg-gray-50 flex items-center justify-center p-2 md:p-4 relative overflow-hidden cursor-pointer">
                        {isOutOfStock && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center z-20">
                            <span className="bg-red-600 text-white font-black text-xs md:text-sm uppercase tracking-widest px-3 py-1.5 rounded-md shadow-lg border border-red-400">{t.outOfStock}</span>
                          </div>
                        )}
                        <img src={firstImage} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=PC+Component'; }} />
                      </div>

                      <div className="p-3 md:p-5 flex flex-col flex-1">
                        <span className="text-[10px] md:text-xs font-bold text-blue-500 uppercase tracking-wider mb-1 line-clamp-1 pl-6 md:pl-0">{t.categories[item.category] || item.category}</span>
                        <h3 onClick={() => openDetailModal(item)} className="text-gray-900 font-semibold text-xs md:text-sm line-clamp-2 mb-2 md:mb-3 cursor-pointer hover:text-blue-600 transition">{item.name}</h3>
                        
                        <div className="mt-auto flex items-center justify-between gap-2">
                          <div className="text-base md:text-xl font-black text-gray-900">${item.price}</div>
                          
                          {isOutOfStock ? (
                            <button onClick={(e) => { e.stopPropagation(); setNotifyModalOpen(true); }} className="bg-gray-800 text-white font-bold px-2 py-1 rounded-lg text-xs cursor-pointer">{t.notifyMe}</button>
                          ) : qty === 0 ? (
                            <button onClick={() => addToCart(item)} className="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-black font-bold h-8 w-8 md:h-10 md:w-10 flex items-center justify-center rounded-full shadow transition-transform active:scale-90 text-sm md:text-base cursor-pointer">➕</button>
                          ) : (
                            <div className="flex items-center bg-gray-100 rounded-full border border-gray-300 p-0.5 shadow-inner">
                              <button onClick={() => updateQuantity(item.id, -1)} className="bg-white hover:bg-gray-200 text-black font-bold h-7 w-7 rounded-full flex items-center justify-center text-xs shadow cursor-pointer">-</button>
                              <span className="px-2 font-black text-xs text-gray-800">{qty}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold h-7 w-7 rounded-full flex items-center justify-center text-xs shadow cursor-pointer">+</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </ScrollFadeItem>
                );
              })}
            </div>
          )}
        </div>
      </main>{/* MOBILE-ONLY STICKY BOTTOM BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 p-2.5 px-4 flex justify-between items-center z-40 shadow-[0_-10px_25px_rgba(0,0,0,0.5)] gap-3">
        <button onClick={() => { setDrawerView('builder'); setIsDrawerOpen(true); }} className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer border ${buildStatus.isComplete ? 'bg-green-500/20 text-green-400 border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.15)]' : 'bg-gray-800 hover:bg-gray-700 text-white border-gray-700'}`}>
          <span className="text-base">{buildStatus.isComplete ? '✅' : '🛠️'}</span>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[9px] uppercase font-black tracking-wider text-gray-400">{t.system}</span>
            <span className="font-extrabold">{buildStatus.isComplete ? t.buildReady : t.buildPc}</span>
          </div>
        </button>

        <button onClick={() => { setDrawerView('cart'); setIsDrawerOpen(true); }} className="flex-1 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-black font-black py-2.5 px-3 rounded-xl text-xs shadow-[0_0_20px_rgba(250,204,21,0.25)] flex items-center justify-center gap-2.5 transition-all active:scale-95 cursor-pointer">
          <div className="relative flex items-center justify-center">
            <span className="text-base">🛒</span>
            {cartCount > 0 && <span className="absolute -top-1.5 -right-2.5 bg-black text-yellow-400 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-yellow-400">{cartCount}</span>}
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[9px] uppercase font-black text-black/70 tracking-wider">{t.total}</span>
            <span className="font-black text-sm">${cartTotal.toFixed(2)}</span>
          </div>
        </button>
      </div>

      {/* COMPARE MODAL */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-4xl rounded-2xl p-6 relative flex flex-col max-h-[90vh] shadow-2xl">
            <button onClick={() => setIsCompareModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl font-bold">&times;</button>
            <h2 className="text-xl md:text-2xl font-black mb-4 text-gray-900 flex items-center gap-2">⚖️ {t.compareItems}</h2>
            
            <div className="overflow-x-auto flex-1 border rounded-xl">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="p-3 border-r border-gray-200 font-bold text-gray-500 w-32">Spec</th>
                    {compareItems.map(i => (
                      <th key={i.id} className="p-4 border-r border-gray-200 w-48 align-top text-center relative">
                        <button onClick={() => setCompareItems(prev => prev.filter(c => c.id !== i.id))} className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-lg leading-none cursor-pointer">&times;</button>
                        <img src={i.image.split(',')[0]} className="h-20 w-full object-contain mb-3 bg-white rounded border p-1" />
                        <p className="text-xs font-bold text-gray-800 line-clamp-2">{i.name}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 border-r border-gray-200 font-bold text-gray-500 text-xs uppercase tracking-wider">Price</td>
                    {compareItems.map(i => <td key={i.id} className="p-3 border-r border-gray-200 font-black text-center text-lg text-gray-900">${i.price}</td>)}
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 border-r border-gray-200 font-bold text-gray-500 text-xs uppercase tracking-wider">Stock</td>
                    {compareItems.map(i => <td key={i.id} className="p-3 border-r border-gray-200 font-medium text-center">{i.in_stock === false ? '❌' : '✅'}</td>)}
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 border-r border-gray-200 font-bold text-gray-500 text-xs uppercase tracking-wider">Category</td>
                    {compareItems.map(i => <td key={i.id} className="p-3 border-r border-gray-200 font-bold text-blue-600 text-center text-xs">{i.category}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>
            
            <button onClick={() => setCompareItems([])} className="mt-4 text-red-500 hover:text-red-600 font-bold text-sm mx-auto cursor-pointer transition underline">Clear Comparison</button>
          </div>
        </div>
      )}

      {/* STOCK ALERT MODAL */}
      {notifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm relative shadow-2xl text-center">
            <button onClick={() => setNotifyModalOpen(false)} className="absolute top-3 right-4 text-gray-400 hover:text-gray-800 text-2xl font-bold cursor-pointer">&times;</button>
            <div className="text-4xl mb-3">🔔</div>
            <h2 className="text-xl font-black mb-2 text-gray-900">{t.notifyMe}</h2>
            <p className="text-xs text-gray-500 mb-5 leading-relaxed">{t.emailAlert}</p>
            <input type="email" placeholder="you@example.com" className="w-full border border-gray-300 p-3 rounded-xl mb-4 outline-none focus:border-blue-500 text-sm font-medium text-black" />
            <button onClick={() => { showToast('Alert saved! We will notify you.'); setNotifyModalOpen(false); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition active:scale-95 cursor-pointer">Save Alert</button>
          </div>
        </div>
      )}

      {/* INTERACTIVE MULTI-STEP CHECKOUT & BUILDER DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
            
            <div className="p-4 md:p-6 bg-gray-900 text-white flex justify-between items-center shadow-md">
              <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                {drawerView === 'cart' ? t.yourCart : drawerView === 'checkout' ? t.checkout : drawerView === 'auth' ? 'Login' : t.pcBuilder}
              </h2>
              <button onClick={() => setIsDrawerOpen(false)} className="text-gray-400 hover:text-white text-3xl font-bold leading-none cursor-pointer">&times;</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
              
              {/* BUILDER VIEW */}
              {drawerView === 'builder' && (
                <div className="space-y-4 pb-20 md:pb-0">
                  
                  {/* Performance & Wattage Meter Panel */}
                  <div className="bg-gray-900 text-white p-4 rounded-2xl shadow-lg space-y-3 border border-gray-800">
                    <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                      <span className="text-xs font-extrabold text-yellow-400 uppercase tracking-widest">{t.expectedPerf}</span>
                      
                      {/* Save Build Button */}
                      <button onClick={() => setDrawerView('auth')} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-3 py-1.5 rounded-lg transition shadow-sm cursor-pointer">
                        {t.saveBuild}
                      </button>
                    </div>

                    <p className="text-xs md:text-sm font-semibold text-gray-200 leading-snug">
                      {expectedPerformance}
                    </p>

                    <div className="pt-1">
                      <div className="flex justify-between text-[11px] font-bold mb-1">
                        <span className="text-gray-400">{t.estWattage}: <span className="text-white font-black">~{wattageInfo.estimated}W</span></span>
                        <span className={wattageInfo.psu >= wattageInfo.estimated ? "text-green-400 font-black" : "text-red-400 font-black"}>
                          {t.psuCapacity}: {wattageInfo.psu ? `${wattageInfo.psu}W` : 'None'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${wattageInfo.psu === 0 ? 'bg-yellow-400' : wattageInfo.estimated > wattageInfo.psu ? 'bg-red-500' : 'bg-green-400'}`} 
                          style={{ width: `${Math.min(100, wattageInfo.psu ? (wattageInfo.estimated / wattageInfo.psu) * 100 : 50)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {compatibilityErrors.length > 0 && (
                    <div className="space-y-2">
                      {compatibilityErrors.map(err => (
                        <div key={err.id} className="bg-red-500/10 border-2 border-red-500/50 p-3 rounded-xl flex items-center justify-between gap-2 shadow-sm animate-pulse">
                          <div className="flex items-start gap-2">
                            <span className="text-lg">🚨</span>
                            <p className="text-xs text-red-700 font-bold leading-tight">{lang === 'ar' ? err.messageAr : err.messageEn}</p>
                          </div>
                          <button onClick={() => startSelectingPart(err.categoryTarget)} className="bg-green-500 hover:bg-green-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-lg shadow cursor-pointer">{t.fixBtn}</button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className={`p-4 rounded-xl border shadow-sm ${buildStatus.isComplete ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                    <div className="flex justify-between items-end mb-2">
                      <h3 className={`font-black text-lg ${buildStatus.isComplete ? 'text-green-800' : 'text-gray-800'}`}>{buildStatus.isComplete ? t.buildComplete : t.missingComponents}</h3>
                      <span className="text-xs font-bold text-gray-500">{buildStatus.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden shadow-inner">
                      <div className={`h-2.5 rounded-full transition-all duration-500 ${buildStatus.isComplete ? 'bg-green-500' : 'bg-yellow-400'}`} style={{ width: `${buildStatus.progress}%` }}></div>
                    </div>
                    {!buildStatus.isComplete && buildStatus.missing.length > 0 && (
                      <p className="text-xs text-gray-500 font-medium mt-2 leading-relaxed">{t.requiredLabel} <span className="font-bold text-gray-700">{buildStatus.missing.join(', ')}</span>.</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {requiredParts.map(part => {
                      const selectedItem = cart.find(item => item.category === part.key);
                      const isAdded = !!selectedItem;
                      const thumb = selectedItem?.image ? selectedItem.image.split(',')[0].trim() : '/images/default.jpg';
                      const partName = t.partLabels[part.labelKey] || part.labelKey;

                      return (
                        <div key={part.key} className={`flex flex-col bg-white p-3 rounded-xl shadow-sm border transition-colors ${isAdded ? 'border-green-200' : 'border-gray-200 hover:border-blue-300'}`}>
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-700 bg-gray-100 p-2 rounded-lg shadow-inner flex items-center justify-center">{part.icon}</span>
                              <div className="flex flex-col"><span className="font-bold text-gray-800 text-xs md:text-sm flex items-center gap-1.5">{partName} {!part.required && <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider bg-gray-100 px-1.5 rounded">{t.optional}</span>}</span></div>
                            </div>
                            {!isAdded && <button onClick={() => startSelectingPart(part.key)} className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md font-bold transition shadow-sm cursor-pointer">{t.choose}</button>}
                          </div>

                          {isAdded && (
                            <div className="mt-2 ml-10 pl-3 border-l-2 border-green-300 flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 overflow-hidden">
                                <img src={thumb} className="w-10 h-10 object-cover rounded shadow-sm border border-gray-100 shrink-0" />
                                <div className="flex flex-col overflow-hidden">
                                  <span className="text-xs text-gray-700 font-bold truncate block w-[120px] sm:w-[150px]">{selectedItem.name}</span>
                                  <span className="text-sm font-black text-gray-900">${selectedItem.price}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <button onClick={() => startSelectingPart(part.key)} className="text-[10px] text-blue-600 font-bold bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded cursor-pointer transition">{t.swap}</button>
                                <button onClick={() => removeFromCart(selectedItem.id)} className="text-[10px] text-red-500 font-bold bg-red-50 hover:bg-red-100 p-1.5 rounded cursor-pointer transition" title="Remove from build">🗑️</button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CART VIEW */}
              {drawerView === 'cart' && (
                <div className="space-y-3 md:space-y-4 pb-20 md:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-gray-500">{cart.length} {t.items}</span>
                    <button onClick={() => setIsShareModalOpen(true)} className="text-xs bg-gray-800 hover:bg-gray-900 text-yellow-400 font-bold px-3 py-1 rounded-lg transition cursor-pointer">{t.shareCartBtn}</button>
                  </div>

                  {cart.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20 flex flex-col items-center">
                      <span className="text-5xl md:text-6xl mb-4">🪹</span>
                      <p className="text-lg md:text-xl font-medium">{t.cartEmpty}</p>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="flex gap-3 items-center bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-100">
                        <img src={item.image.split(',')[0]} className="w-12 h-12 object-cover rounded shrink-0 border border-gray-100" />
                        <div className="flex-1 overflow-hidden">
                          <h4 className="font-bold text-gray-800 text-xs md:text-sm truncate">{item.name}</h4>
                          <p className="text-gray-500 text-xs md:text-sm mt-1">${item.price} {t.each}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => updateQuantity(item.id, -1)} className="bg-gray-100 hover:bg-gray-200 text-black font-bold h-6 w-6 rounded flex items-center justify-center text-xs cursor-pointer">-</button>
                            <span className="font-bold text-xs">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold h-6 w-6 rounded flex items-center justify-center text-xs cursor-pointer">+</button>
                          </div>
                        </div>
                        <div className="text-base md:text-lg font-black text-gray-900">${item.price * item.quantity}</div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-md transition text-sm cursor-pointer">🗑️</button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* CHECKOUT VIEW */}
              {drawerView === 'checkout' && (
                <form id="checkout-form" onSubmit={submitOrder} className="space-y-4 md:space-y-5 pb-20 md:pb-0">
                  <div><label className="block text-xs md:text-sm font-bold text-gray-700 mb-1">{t.fullName}</label><input required type="text" placeholder="John Doe" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-sm md:text-base text-black font-medium" value={customerInfo.name} onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})} /></div>
                  <div><label className="block text-xs md:text-sm font-bold text-gray-700 mb-1">{t.phone}</label><input required type="tel" placeholder="+963..." className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-sm md:text-base text-black font-medium" value={customerInfo.phone} onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} /></div>
                  <div><label className="block text-xs md:text-sm font-bold text-gray-700 mb-1">{t.address}</label><textarea required rows="3" placeholder="City, Street, Building..." className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-sm md:text-base text-black font-medium" value={customerInfo.address} onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}></textarea></div>
                  
                  {/* Payment Method Toggle */}
                  <div className="border-t pt-4 mt-4">
                    <label className="block text-xs md:text-sm font-bold text-gray-700 mb-3">{t.paymentMethod}</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div onClick={() => setPaymentMethod('whatsapp')} className={`p-3 rounded-xl border-2 cursor-pointer flex flex-col items-center gap-1 transition ${paymentMethod === 'whatsapp' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <span className="text-xl">💬</span><span className="text-xs font-bold">{t.whatsapp}</span>
                      </div>
                      <div onClick={() => setPaymentMethod('card')} className={`p-3 rounded-xl border-2 cursor-pointer flex flex-col items-center gap-1 transition ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <span className="text-xl">💳</span><span className="text-xs font-bold">{t.card}</span>
                      </div>
                    </div>
                  </div>
                  {paymentMethod === 'card' && <div className="bg-gray-100 p-3 rounded-lg text-xs text-gray-500 text-center font-medium mt-3 border border-gray-200">🔒 Secure encrypted checkout powered by Stripe.</div>}

                  <button type="button" onClick={() => setDrawerView('cart')} className="text-sm text-blue-600 font-bold hover:underline cursor-pointer">{t.backToCartBtn}</button>
                </form>
              )}

              {/* AUTH VIEW (Save Build UI) */}
              {drawerView === 'auth' && (
                <div className="flex flex-col items-center text-center mt-10 p-4">
                  <span className="text-6xl mb-4">🔐</span>
                  <h3 className="font-black text-xl mb-2 text-gray-900">Create Account</h3>
                  <p className="text-sm text-gray-500 mb-6">{t.loginToSave}</p>
                  <input type="email" placeholder="Email Address" className="w-full border border-gray-300 p-3 rounded-xl mb-3 outline-none focus:border-blue-500 text-sm font-medium text-black" />
                  <input type="password" placeholder="Password" className="w-full border border-gray-300 p-3 rounded-xl mb-6 outline-none focus:border-blue-500 text-sm font-medium text-black" />
                  <button onClick={() => { showToast('Build Saved to Account!'); setDrawerView('builder'); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition active:scale-95 cursor-pointer">Sign In & Save</button>
                </div>
              )}
            </div>

            {/* Bottom Drawer Action Bar */}
            <div className="p-4 md:p-6 bg-white border-t border-gray-200 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between text-lg md:text-xl mb-4 md:mb-6">
                <span className="font-medium text-gray-600">{t.totalDue}</span>
                <span className="font-black text-gray-900">${cartTotal.toFixed(2)}</span>
              </div>
              
              {drawerView === 'builder' ? (
                <button onClick={() => setDrawerView('cart')} className="w-full bg-gray-800 hover:bg-gray-900 text-white font-extrabold py-3 md:py-4 rounded-xl text-base md:text-lg shadow-lg cursor-pointer">{t.reviewCart}</button>
              ) : drawerView === 'cart' ? (
                <button disabled={cart.length === 0} onClick={() => setDrawerView('checkout')} className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-black font-extrabold py-3 md:py-4 rounded-xl text-base md:text-lg shadow-lg cursor-pointer">{t.proceedToCheckout}</button>
              ) : drawerView === 'checkout' ? (
                <button type="submit" form="checkout-form" className="w-full bg-green-500 hover:bg-green-600 text-white font-extrabold py-3 md:py-4 rounded-xl text-base md:text-lg shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                  {paymentMethod === 'whatsapp' ? t.sendOrder : 'Pay Securely'}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* SHARE BUILD SUMMARY MODAL */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-gray-900 text-white w-full max-w-lg rounded-2xl p-6 border border-gray-800 shadow-2xl relative">
            <button onClick={() => setIsShareModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold cursor-pointer">&times;</button>
            <h2 className="text-xl font-extrabold text-yellow-400 mb-4 flex items-center gap-2">⚡ {t.shareBuildTitle}</h2>
            <div className="bg-gray-800/80 p-4 rounded-xl border border-gray-700 mb-6 space-y-3 max-h-[300px] overflow-y-auto">
              <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
                <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest block mb-1">{t.expectedPerf}</span>
                <p className="text-xs font-bold text-gray-200">{expectedPerformance}</p>
              </div>
              <div className="text-xs text-gray-300 font-semibold space-y-2">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-gray-700/50 pb-1.5"><span className="truncate max-w-[240px]">{item.name}</span><span className="font-black text-yellow-400">${item.price}</span></div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-2 text-sm font-black text-white border-t border-gray-700"><span>{t.totalDue}:</span><span className="text-yellow-400 text-base">${cartTotal.toFixed(2)}</span></div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={handleShareBuildWhatsApp} className="w-full bg-green-500 hover:bg-green-600 text-white font-extrabold py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"><span>💬</span> {t.shareWhatsApp}</button>
              <button onClick={handleCopyShareText} className="w-full bg-gray-800 hover:bg-gray-700 text-yellow-400 font-extrabold py-3 rounded-xl border border-gray-700 transition flex items-center justify-center gap-2 cursor-pointer">{t.copyLink}</button>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT DETAIL & MULTI-PICTURE MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-4 bg-gray-900 text-white flex justify-between items-center shrink-0">
              <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">{t.categories[selectedProduct.category] || selectedProduct.category}</span>
              <button onClick={() => setSelectedProduct(null)} className="text-gray-400 hover:text-white text-2xl font-bold cursor-pointer">✕</button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                  <div className="h-64 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center p-4 relative">
                    <img src={activeImage || '/images/default.jpg'} alt={selectedProduct.name} className="w-full h-full object-contain" onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=PC+Component'; }} />
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {(selectedProduct.image ? selectedProduct.image.split(',').map(s => s.trim()) : ['/images/default.jpg']).map((img, idx) => (
                      <button key={idx} onClick={() => setActiveImage(img)} className={`h-14 w-14 rounded-lg border-2 overflow-hidden bg-gray-50 flex items-center justify-center p-0.5 shrink-0 cursor-pointer ${activeImage === img ? 'border-yellow-500' : 'border-gray-200'}`}>
                        <img src={img} className="w-full h-full object-cover rounded-md" onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Img'; }} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                    <div className="text-2xl font-black text-gray-900 mb-4">${selectedProduct.price}</div>
                    <div className="mb-4">
                      <span className="text-xs font-bold text-gray-500 uppercase block mb-1">{t.availability}</span>
                      {selectedProduct.in_stock === false ? (
                        <span className="inline-block bg-red-100 text-red-600 font-bold text-xs px-2.5 py-1 rounded-md">{t.outOfStockBadge}</span>
                      ) : (
                        <span className="inline-block bg-green-100 text-green-700 font-bold text-xs px-2.5 py-1 rounded-md">{t.inStockReady}</span>
                      )}
                    </div>
                    <div className="mb-6">
                      <span className="text-xs font-bold text-gray-500 uppercase block mb-1">{t.descSpecs}</span>
                      <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200 whitespace-pre-wrap">
                        {selectedProduct.description || `Official ${selectedProduct.category} component by EngineerPCs. Verified for high performance, compatibility, and full manufacturer warranty.`}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    {selectedProduct.in_stock === false ? (
                      <button onClick={(e) => { e.stopPropagation(); setNotifyModalOpen(true); }} className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-xl text-sm cursor-pointer">{t.notifyMe}</button>
                    ) : (
                      <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold py-3 rounded-xl text-sm shadow-md transition-transform active:scale-95 cursor-pointer">
                        {selectingFor === selectedProduct.category ? t.addToBuild : t.addToCart}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* FREQUENTLY BOUGHT TOGETHER */}
              {relatedItems.length > 0 && (
                <div className="mt-8 border-t border-gray-100 pt-6">
                  <h3 className="font-black text-sm text-gray-900 mb-4">{t.frequentlyBought}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedItems.map(item => (
                      <div key={item.id} className="border border-gray-200 rounded-xl p-3 flex gap-3 items-center bg-gray-50 hover:bg-white transition cursor-pointer shadow-sm group" onClick={() => { setSelectedProduct(item); setActiveImage(item.image.split(',')[0].trim()); }}>
                        <img src={item.image.split(',')[0]} className="w-14 h-14 object-contain rounded bg-white border border-gray-200 p-1 group-hover:scale-105 transition" />
                        <div className="flex-1 overflow-hidden">
                          <p className="text-xs font-bold text-gray-800 truncate mb-1">{item.name}</p>
                          <p className="text-sm text-blue-600 font-black">${item.price}</p>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); addToCart(item); }} className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold h-8 w-8 rounded-full shadow-sm flex items-center justify-center shrink-0 cursor-pointer">➕</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}