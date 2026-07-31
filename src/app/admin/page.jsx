"use client";

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';

// Expanded Categories to match all PCPartPicker hardware types
const categories = [
  'CPUs',
  'GPUs',
  'Motherboards', 
  'RAM',
  'Storage',
  'PC Cases', 
  'Power Supplies', 
  'Liquid & Air Cooling', 
  'Case Fans & Hubs', 
  'Monitors', 
  'Chairs & Accessories'
];

// Master Starter Inventory
const staticInventory = [
  // Power Supplies
  { id: 'psu-1', category: 'Power Supplies', name: 'ThermalRight TR-TB650S 650W 80 PLUS', price: 58, image: '/images/tr-tb650s.jpg', in_stock: true, specs: { type: 'ATX', efficiency: '80+ Gold', wattage: '650 W', modular: 'Full', color: 'Black' } },
  { id: 'psu-2', category: 'Power Supplies', name: 'ThermalRight TR-TB750S 750W', price: 76, image: '/images/tr-tb750s.jpg', in_stock: true, specs: { type: 'ATX', efficiency: '80+ Gold', wattage: '750 W', modular: 'Full', color: 'Black' } },
  { id: 'psu-3', category: 'Power Supplies', name: 'ThermalRight TR-SP750 750W 80 PLUS', price: 100, image: '/images/tr-sp750.jpg', in_stock: true, specs: { type: 'ATX', efficiency: '80+ Gold', wattage: '750 W', modular: 'Full', color: 'Black' } },
  { id: 'psu-4', category: 'Power Supplies', name: 'ThermalRight TR-SP850 850W', price: 115, image: '/images/tr-sp850.jpg', in_stock: true, specs: { type: 'ATX', efficiency: '80+ Gold', wattage: '850 W', modular: 'Full', color: 'Black' } },
  { id: 'psu-5', category: 'Power Supplies', name: 'ThermalRight TR-SP850-W 850W White', price: 118, image: '/images/tr-sp850-w.jpg', in_stock: true, specs: { type: 'ATX', efficiency: '80+ Gold', wattage: '850 W', modular: 'Full', color: 'White' } },
  { id: 'psu-6', category: 'Power Supplies', name: 'ThermalRight TR-SP1000 1000W', price: 130, image: '/images/tr-sp1000.jpg', in_stock: true, specs: { type: 'ATX', efficiency: '80+ Gold', wattage: '1000 W', modular: 'Full', color: 'Black' } },
  { id: 'psu-7', category: 'Power Supplies', name: 'ThermalRight TR-SP1000-W 1000W White', price: 135, image: '/images/tr-sp1000-w.jpg', in_stock: true, specs: { type: 'ATX', efficiency: '80+ Gold', wattage: '1000 W', modular: 'Full', color: 'White' } },
  
  // Coolers
  { id: 'cool-1', category: 'Liquid & Air Cooling', name: 'ThermalRight Assassin X 120 Refined SE ARGB (AM4,AM5)', price: 18, image: '/images/cool1.jpg', in_stock: true, specs: { rpm: '1550 RPM', noise: '25.6 dB', color: 'Black / Silver', radSize: '120 mm' } },
  { id: 'cool-2', category: 'Liquid & Air Cooling', name: 'ThermalRight Burst Assassin 120 SE ARGB', price: 24, image: '/images/burst120.jpg', in_stock: true, specs: { rpm: '1550 RPM', noise: '25.6 dB', color: 'Black', radSize: '120 mm' } },
  { id: 'cool-3', category: 'Liquid & Air Cooling', name: 'ThermalRight Phantom Spirit 120 SE ARGB', price: 40, image: '/images/phantom120.jpg', in_stock: true, specs: { rpm: '1500 RPM', noise: '25.6 dB', color: 'Black', radSize: '120 mm' } },

  // PC Cases
  { id: 'case-1', category: 'PC Cases', name: 'ThermalRight A70 VISION', price: 160, image: '/images/a70.jpg', in_stock: true, specs: { type: 'ATX Mid Tower', color: 'Black', sidePanel: 'Tempered Glass', volume: '45.0 L', bays: '2' } },
  { id: 'case-2', category: 'PC Cases', name: 'ThermalRight A70 VISION WHITE', price: 165, image: '/images/a70w.jpg', in_stock: true, specs: { type: 'ATX Mid Tower', color: 'White', sidePanel: 'Tempered Glass', volume: '45.0 L', bays: '2' } },

  // Monitors & CPUs & MBs
  { id: 'mon-1', category: 'Monitors', name: 'MSI MAG 271QPX QD-OLED X28', price: 590, image: '/images/msi271.jpg', in_stock: true, specs: { size: '27.0"', resolution: '2560 x 1440', refresh: '360 Hz', response: '0.03 ms', panel: 'QD-OLED', aspect: '16:9' } },
  { id: 'mon-2', category: 'Monitors', name: 'MSI MAG 244F', price: 125, image: '/images/msi244.jpg', in_stock: true, specs: { size: '23.8"', resolution: '1920 x 1080', refresh: '200 Hz', response: '0.5 ms', panel: 'IPS', aspect: '16:9' } },
  { id: 'cpu-amd-5', category: 'CPUs', name: 'Ryzen 7 9800X3D', price: 420, image: '/images/r7-9800x3d.jpg', in_stock: true, specs: { cores: '8', clock: '4.7 GHz', boost: '5.2 GHz', arch: 'Zen 5', tdp: '120 W', igpu: 'Radeon' } },
  { id: 'cpu-amd-3', category: 'CPUs', name: 'Ryzen 7 7800X3D', price: 315, image: '/images/r7-7800x3d.jpg', in_stock: true, specs: { cores: '8', clock: '4.2 GHz', boost: '5.0 GHz', arch: 'Zen 4', tdp: '120 W', igpu: 'Radeon' } },
  { id: 'mb-2', category: 'Motherboards', name: 'ASUS B850M AYW GAMING WIFI', price: 185, image: '/images/asus-b850m.jpg', in_stock: true, specs: { socket: 'AM5', formFactor: 'Micro ATX', memoryMax: '256 GB', memorySlots: '4', color: 'Black / Silver' } },
];export default function AdminDashboard() {
  // Tabs State (3 Tabs)
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'banners', or 'newHero'

  // --- PRODUCT MANAGER STATE ---
  const [dbProducts, setDbProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [adminSearch, setAdminSearch] = useState('');

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'CPUs',
    price: '',
    image: '',
    in_stock: true,
    description: '',
    specs: {}
  });

  // --- BANNER MANAGER STATE (OLD) ---
  const [dbSlides, setDbSlides] = useState([]);
  const [loadingSlides, setLoadingSlides] = useState(true);
  const [editingSlide, setEditingSlide] = useState(null);

  const [slideFormData, setSlideFormData] = useState({
    id: '',
    tag: '',
    title: '',
    subtitle: '',
    button_text: 'Shop Now',
    category_target: 'All',
    text_alignment: 'right',
    images: []
  });

  // FETCH DATA
  useEffect(() => {
    fetchProducts();
    fetchSlides();
  }, []);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    const { data, error } = await supabase.from('products').select('*').order('name');
    if (error) console.error('Error fetching products:', error);
    else setDbProducts(data || []);
    setLoadingProducts(false);
  };

  const fetchSlides = async () => {
    setLoadingSlides(true);
    const { data, error } = await supabase.from('hero_slides').select('*').order('created_at', { ascending: true });
    if (error) console.error('Error fetching slides:', error);
    else setDbSlides(data || []);
    setLoadingSlides(false);
  };// --- PRODUCT FUNCTIONS ---
  const allProducts = useMemo(() => {
    const dbIds = new Set(dbProducts.map(p => p.id));
    const remainingStatic = staticInventory.filter(item => !dbIds.has(item.id));
    return [...dbProducts, ...remainingStatic].sort((a, b) => a.name.localeCompare(b.name));
  }, [dbProducts]);

  const displayedProducts = useMemo(() => {
    if (!adminSearch) return allProducts;
    const lowerSearch = adminSearch.toLowerCase();
    return allProducts.filter(item => 
      item.name.toLowerCase().includes(lowerSearch) || 
      item.category.toLowerCase().includes(lowerSearch)
    );
  }, [allProducts, adminSearch]);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const itemData = {
      id: formData.id || `item-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      image: formData.image || '/images/default.jpg',
      in_stock: formData.in_stock,
      description: formData.description || '',
      specs: formData.specs || {}
    };

    const { error } = await supabase.from('products').upsert([itemData]);
    if (error) {
      console.error("Error saving product:", error);
      alert(`Failed to save product: ${error.message}`);
    } else {
      setFormData({ id: '', name: '', category: 'CPUs', price: '', image: '', in_stock: true, description: '', specs: {} });
      setEditingItem(null);
      fetchProducts();
    }
  };

  const handleProductEdit = (product) => {
    setEditingItem(product);
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      in_stock: product.in_stock !== undefined ? product.in_stock : true,
      description: product.description || '',
      specs: product.specs || {}
    });
  };

  const handleProductDelete = async (id) => {
    if (confirm('Are you sure you want to delete or hide this item?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  };

  const updateSpecField = (key, value) => {
    setFormData(prev => ({
      ...prev,
      specs: { ...(prev.specs || {}), [key]: value }
    }));
  };

  const renderSpecFields = () => {
    const cat = formData.category;
    const s = formData.specs || {};

    if (cat === 'CPUs') {
      return (
        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Core Count</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.cores || ''} onChange={e => updateSpecField('cores', e.target.value)} placeholder="e.g. 8" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Core Clock</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.clock || ''} onChange={e => updateSpecField('clock', e.target.value)} placeholder="e.g. 4.7 GHz" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Boost Clock</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.boost || ''} onChange={e => updateSpecField('boost', e.target.value)} placeholder="e.g. 5.2 GHz" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Microarchitecture</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.arch || ''} onChange={e => updateSpecField('arch', e.target.value)} placeholder="e.g. Zen 5" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">TDP</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.tdp || ''} onChange={e => updateSpecField('tdp', e.target.value)} placeholder="e.g. 120 W" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Integrated Graphics</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.igpu || ''} onChange={e => updateSpecField('igpu', e.target.value)} placeholder="e.g. Radeon / None" /></div>
        </div>
      );
    } else if (cat === 'GPUs') {
      return (
        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Chipset</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.chipset || ''} onChange={e => updateSpecField('chipset', e.target.value)} placeholder="e.g. GeForce RTX 5070" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Memory (VRAM)</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.memory || ''} onChange={e => updateSpecField('memory', e.target.value)} placeholder="e.g. 12 GB" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Core Clock</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.clock || ''} onChange={e => updateSpecField('clock', e.target.value)} placeholder="e.g. 2160 MHz" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Boost Clock</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.boost || ''} onChange={e => updateSpecField('boost', e.target.value)} placeholder="e.g. 2542 MHz" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Color</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.color || ''} onChange={e => updateSpecField('color', e.target.value)} placeholder="e.g. Black / White" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Length</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.length || ''} onChange={e => updateSpecField('length', e.target.value)} placeholder="e.g. 282 mm" /></div>
        </div>
      );
    } else if (cat === 'Motherboards') {
      return (
        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Socket / CPU</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.socket || ''} onChange={e => updateSpecField('socket', e.target.value)} placeholder="e.g. AM5 / LGA1700" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Form Factor</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.formFactor || ''} onChange={e => updateSpecField('formFactor', e.target.value)} placeholder="e.g. ATX / Micro ATX" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Memory Slots</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.memorySlots || ''} onChange={e => updateSpecField('memorySlots', e.target.value)} placeholder="e.g. 4" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Memory Max</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.memoryMax || ''} onChange={e => updateSpecField('memoryMax', e.target.value)} placeholder="e.g. 256 GB" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Color</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.color || ''} onChange={e => updateSpecField('color', e.target.value)} placeholder="e.g. Black / Silver" /></div>
        </div>
      );
    } else if (cat === 'RAM') {
      return (
        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Speed</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.speed || ''} onChange={e => updateSpecField('speed', e.target.value)} placeholder="e.g. DDR5-6000" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Modules</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.modules || ''} onChange={e => updateSpecField('modules', e.target.value)} placeholder="e.g. 2 x 16GB" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Price / GB</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.pricePerGb || ''} onChange={e => updateSpecField('pricePerGb', e.target.value)} placeholder="e.g. $13.30" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">CAS Latency</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.cas || ''} onChange={e => updateSpecField('cas', e.target.value)} placeholder="e.g. 30 / 36" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">First Word Latency</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.latency || ''} onChange={e => updateSpecField('latency', e.target.value)} placeholder="e.g. 10 ns" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Color</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.color || ''} onChange={e => updateSpecField('color', e.target.value)} placeholder="e.g. Black / White" /></div>
        </div>
      );
    } else if (cat === 'Storage') {
      return (
        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Capacity</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.capacity || ''} onChange={e => updateSpecField('capacity', e.target.value)} placeholder="e.g. 1 TB / 2 TB" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Type</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.type || ''} onChange={e => updateSpecField('type', e.target.value)} placeholder="e.g. SSD / HDD" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Form Factor</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.formFactor || ''} onChange={e => updateSpecField('formFactor', e.target.value)} placeholder="e.g. M.2-2280" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Interface</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.interface || ''} onChange={e => updateSpecField('interface', e.target.value)} placeholder="e.g. M.2 PCIe 4.0 X4" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Cache</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.cache || ''} onChange={e => updateSpecField('cache', e.target.value)} placeholder="e.g. 2048 MB" /></div>
        </div>
      );
    } else if (cat === 'Power Supplies') {
      return (
        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Type</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.type || ''} onChange={e => updateSpecField('type', e.target.value)} placeholder="e.g. ATX / SFX" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Efficiency Rating</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.efficiency || ''} onChange={e => updateSpecField('efficiency', e.target.value)} placeholder="e.g. 80+ Gold" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Wattage</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.wattage || ''} onChange={e => updateSpecField('wattage', e.target.value)} placeholder="e.g. 850 W" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Modular</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.modular || ''} onChange={e => updateSpecField('modular', e.target.value)} placeholder="e.g. Full / Semi / No" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Color</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.color || ''} onChange={e => updateSpecField('color', e.target.value)} placeholder="e.g. Black / White" /></div>
        </div>
      );
    } else if (cat === 'Monitors') {
      return (
        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Screen Size</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.size || ''} onChange={e => updateSpecField('size', e.target.value)} placeholder='e.g. 27.0"' /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Resolution</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.resolution || ''} onChange={e => updateSpecField('resolution', e.target.value)} placeholder="e.g. 2560 x 1440" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Refresh Rate</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.refresh || ''} onChange={e => updateSpecField('refresh', e.target.value)} placeholder="e.g. 240 Hz" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Response Time</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.response || ''} onChange={e => updateSpecField('response', e.target.value)} placeholder="e.g. 1 ms" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Panel Type</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.panel || ''} onChange={e => updateSpecField('panel', e.target.value)} placeholder="e.g. IPS / QD-OLED" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Aspect Ratio</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.aspect || ''} onChange={e => updateSpecField('aspect', e.target.value)} placeholder="e.g. 16:9" /></div>
        </div>
      );
    } else if (cat === 'PC Cases') {
      return (
        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Type</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.type || ''} onChange={e => updateSpecField('type', e.target.value)} placeholder="e.g. ATX Mid Tower" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Color</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.color || ''} onChange={e => updateSpecField('color', e.target.value)} placeholder="e.g. Black / White" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Side Panel</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.sidePanel || ''} onChange={e => updateSpecField('sidePanel', e.target.value)} placeholder="e.g. Tempered Glass" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">External Volume</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.volume || ''} onChange={e => updateSpecField('volume', e.target.value)} placeholder="e.g. 45.0 L" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Internal 3.5" Bays</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.bays || ''} onChange={e => updateSpecField('bays', e.target.value)} placeholder="e.g. 2" /></div>
        </div>
      );
    } else if (cat === 'Liquid & Air Cooling') {
      return (
        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Fan RPM</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.rpm || ''} onChange={e => updateSpecField('rpm', e.target.value)} placeholder="e.g. 1550 RPM" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Noise Level</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.noise || ''} onChange={e => updateSpecField('noise', e.target.value)} placeholder="e.g. 25.6 dB" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Radiator Size</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.radSize || ''} onChange={e => updateSpecField('radSize', e.target.value)} placeholder="e.g. 360 mm" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Color</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.color || ''} onChange={e => updateSpecField('color', e.target.value)} placeholder="e.g. Black / White" /></div>
        </div>
      );
    }
    return null;
  };// --- PRODUCT FUNCTIONS ---
  const allProducts = useMemo(() => {
    const dbIds = new Set(dbProducts.map(p => p.id));
    const remainingStatic = staticInventory.filter(item => !dbIds.has(item.id));
    return [...dbProducts, ...remainingStatic].sort((a, b) => a.name.localeCompare(b.name));
  }, [dbProducts]);

  const displayedProducts = useMemo(() => {
    if (!adminSearch) return allProducts;
    const lowerSearch = adminSearch.toLowerCase();
    return allProducts.filter(item => 
      item.name.toLowerCase().includes(lowerSearch) || 
      item.category.toLowerCase().includes(lowerSearch)
    );
  }, [allProducts, adminSearch]);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const itemData = {
      id: formData.id || `item-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      image: formData.image || '/images/default.jpg',
      in_stock: formData.in_stock,
      description: formData.description || '',
      specs: formData.specs || {}
    };

    const { error } = await supabase.from('products').upsert([itemData]);
    if (error) {
      console.error("Error saving product:", error);
      alert(`Failed to save product: ${error.message}`);
    } else {
      setFormData({ id: '', name: '', category: 'CPUs', price: '', image: '', in_stock: true, description: '', specs: {} });
      setEditingItem(null);
      fetchProducts();
    }
  };

  const handleProductEdit = (product) => {
    setEditingItem(product);
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      in_stock: product.in_stock !== undefined ? product.in_stock : true,
      description: product.description || '',
      specs: product.specs || {}
    });
  };

  const handleProductDelete = async (id) => {
    if (confirm('Are you sure you want to delete or hide this item?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  };

  const updateSpecField = (key, value) => {
    setFormData(prev => ({
      ...prev,
      specs: { ...(prev.specs || {}), [key]: value }
    }));
  };

  const renderSpecFields = () => {
    const cat = formData.category;
    const s = formData.specs || {};

    if (cat === 'CPUs') {
      return (
        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Core Count</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.cores || ''} onChange={e => updateSpecField('cores', e.target.value)} placeholder="e.g. 8" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Core Clock</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.clock || ''} onChange={e => updateSpecField('clock', e.target.value)} placeholder="e.g. 4.7 GHz" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Boost Clock</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.boost || ''} onChange={e => updateSpecField('boost', e.target.value)} placeholder="e.g. 5.2 GHz" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Microarchitecture</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.arch || ''} onChange={e => updateSpecField('arch', e.target.value)} placeholder="e.g. Zen 5" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">TDP</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.tdp || ''} onChange={e => updateSpecField('tdp', e.target.value)} placeholder="e.g. 120 W" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Integrated Graphics</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.igpu || ''} onChange={e => updateSpecField('igpu', e.target.value)} placeholder="e.g. Radeon / None" /></div>
        </div>
      );
    } else if (cat === 'GPUs') {
      return (
        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Chipset</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.chipset || ''} onChange={e => updateSpecField('chipset', e.target.value)} placeholder="e.g. GeForce RTX 5070" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Memory (VRAM)</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.memory || ''} onChange={e => updateSpecField('memory', e.target.value)} placeholder="e.g. 12 GB" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Core Clock</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.clock || ''} onChange={e => updateSpecField('clock', e.target.value)} placeholder="e.g. 2160 MHz" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Boost Clock</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.boost || ''} onChange={e => updateSpecField('boost', e.target.value)} placeholder="e.g. 2542 MHz" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Color</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.color || ''} onChange={e => updateSpecField('color', e.target.value)} placeholder="e.g. Black / White" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Length</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.length || ''} onChange={e => updateSpecField('length', e.target.value)} placeholder="e.g. 282 mm" /></div>
        </div>
      );
    } else if (cat === 'Motherboards') {
      return (
        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Socket / CPU</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.socket || ''} onChange={e => updateSpecField('socket', e.target.value)} placeholder="e.g. AM5 / LGA1700" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Form Factor</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.formFactor || ''} onChange={e => updateSpecField('formFactor', e.target.value)} placeholder="e.g. ATX / Micro ATX" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Memory Slots</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.memorySlots || ''} onChange={e => updateSpecField('memorySlots', e.target.value)} placeholder="e.g. 4" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Memory Max</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.memoryMax || ''} onChange={e => updateSpecField('memoryMax', e.target.value)} placeholder="e.g. 256 GB" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Color</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.color || ''} onChange={e => updateSpecField('color', e.target.value)} placeholder="e.g. Black / Silver" /></div>
        </div>
      );
    } else if (cat === 'RAM') {
      return (
        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Speed</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.speed || ''} onChange={e => updateSpecField('speed', e.target.value)} placeholder="e.g. DDR5-6000" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Modules</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.modules || ''} onChange={e => updateSpecField('modules', e.target.value)} placeholder="e.g. 2 x 16GB" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Price / GB</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.pricePerGb || ''} onChange={e => updateSpecField('pricePerGb', e.target.value)} placeholder="e.g. $13.30" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">CAS Latency</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.cas || ''} onChange={e => updateSpecField('cas', e.target.value)} placeholder="e.g. 30 / 36" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">First Word Latency</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.latency || ''} onChange={e => updateSpecField('latency', e.target.value)} placeholder="e.g. 10 ns" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Color</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.color || ''} onChange={e => updateSpecField('color', e.target.value)} placeholder="e.g. Black / White" /></div>
        </div>
      );
    } else if (cat === 'Storage') {
      return (
        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Capacity</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.capacity || ''} onChange={e => updateSpecField('capacity', e.target.value)} placeholder="e.g. 1 TB / 2 TB" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Type</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.type || ''} onChange={e => updateSpecField('type', e.target.value)} placeholder="e.g. SSD / HDD" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Form Factor</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.formFactor || ''} onChange={e => updateSpecField('formFactor', e.target.value)} placeholder="e.g. M.2-2280" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Interface</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.interface || ''} onChange={e => updateSpecField('interface', e.target.value)} placeholder="e.g. M.2 PCIe 4.0 X4" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Cache</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.cache || ''} onChange={e => updateSpecField('cache', e.target.value)} placeholder="e.g. 2048 MB" /></div>
        </div>
      );
    } else if (cat === 'Power Supplies') {
      return (
        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Type</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.type || ''} onChange={e => updateSpecField('type', e.target.value)} placeholder="e.g. ATX / SFX" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Efficiency Rating</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.efficiency || ''} onChange={e => updateSpecField('efficiency', e.target.value)} placeholder="e.g. 80+ Gold" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Wattage</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.wattage || ''} onChange={e => updateSpecField('wattage', e.target.value)} placeholder="e.g. 850 W" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Modular</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.modular || ''} onChange={e => updateSpecField('modular', e.target.value)} placeholder="e.g. Full / Semi / No" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Color</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.color || ''} onChange={e => updateSpecField('color', e.target.value)} placeholder="e.g. Black / White" /></div>
        </div>
      );
    } else if (cat === 'Monitors') {
      return (
        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Screen Size</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.size || ''} onChange={e => updateSpecField('size', e.target.value)} placeholder='e.g. 27.0"' /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Resolution</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.resolution || ''} onChange={e => updateSpecField('resolution', e.target.value)} placeholder="e.g. 2560 x 1440" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Refresh Rate</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.refresh || ''} onChange={e => updateSpecField('refresh', e.target.value)} placeholder="e.g. 240 Hz" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Response Time</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.response || ''} onChange={e => updateSpecField('response', e.target.value)} placeholder="e.g. 1 ms" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Panel Type</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.panel || ''} onChange={e => updateSpecField('panel', e.target.value)} placeholder="e.g. IPS / QD-OLED" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Aspect Ratio</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.aspect || ''} onChange={e => updateSpecField('aspect', e.target.value)} placeholder="e.g. 16:9" /></div>
        </div>
      );
    } else if (cat === 'PC Cases') {
      return (
        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Type</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.type || ''} onChange={e => updateSpecField('type', e.target.value)} placeholder="e.g. ATX Mid Tower" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Color</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.color || ''} onChange={e => updateSpecField('color', e.target.value)} placeholder="e.g. Black / White" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Side Panel</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.sidePanel || ''} onChange={e => updateSpecField('sidePanel', e.target.value)} placeholder="e.g. Tempered Glass" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">External Volume</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.volume || ''} onChange={e => updateSpecField('volume', e.target.value)} placeholder="e.g. 45.0 L" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Internal 3.5" Bays</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.bays || ''} onChange={e => updateSpecField('bays', e.target.value)} placeholder="e.g. 2" /></div>
        </div>
      );
    } else if (cat === 'Liquid & Air Cooling') {
      return (
        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Fan RPM</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.rpm || ''} onChange={e => updateSpecField('rpm', e.target.value)} placeholder="e.g. 1550 RPM" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Noise Level</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.noise || ''} onChange={e => updateSpecField('noise', e.target.value)} placeholder="e.g. 25.6 dB" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Radiator Size</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.radSize || ''} onChange={e => updateSpecField('radSize', e.target.value)} placeholder="e.g. 360 mm" /></div>
          <div><label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Color</label><input type="text" className="w-full p-2 border rounded text-xs text-gray-900 bg-white font-medium" value={s.color || ''} onChange={e => updateSpecField('color', e.target.value)} placeholder="e.g. Black / White" /></div>
        </div>
      );
    }
    return null;
  };// --- OLD BANNER FUNCTIONS ---
  const handleSlideSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      tag: slideFormData.tag,
      title: slideFormData.title,
      subtitle: slideFormData.subtitle,
      button_text: slideFormData.button_text,
      category_target: slideFormData.category_target,
      text_alignment: slideFormData.text_alignment,
      images: slideFormData.images
    };

    if (slideFormData.id) payload.id = slideFormData.id;

    const { error } = await supabase.from('hero_slides').upsert([payload]);
    if (error) {
      alert(`Failed to save slide: ${error.message}`);
    } else {
      setSlideFormData({ id: '', tag: '', title: '', subtitle: '', button_text: 'Shop Now', category_target: 'All', text_alignment: 'right', images: [] });
      setEditingSlide(null);
      fetchSlides();
    }
  };

  const handleSlideEdit = (slide) => {
    setEditingSlide(slide);
    setSlideFormData({
      id: slide.id,
      tag: slide.tag,
      title: slide.title,
      subtitle: slide.subtitle,
      button_text: slide.button_text,
      category_target: slide.category_target,
      text_alignment: slide.text_alignment || 'right',
      images: slide.images || []
    });
  };

  const handleSlideDelete = async (id) => {
    if (confirm('Are you sure you want to permanently delete this slide?')) {
      await supabase.from('hero_slides').delete().eq('id', id);
      fetchSlides();
    }
  };

  const addSlideImage = () => {
    const newImage = { url: '', width: 'w-32 md:w-48', position: 'top-[10%] left-[10%]', animation: 'anim-float-1 delay-100', zIndex: 'z-10' };
    setSlideFormData(prev => ({ ...prev, images: [...prev.images, newImage] }));
  };

  const updateSlideImage = (index, field, value) => {
    const updatedImages = [...slideFormData.images];
    updatedImages[index][field] = value;
    setSlideFormData(prev => ({ ...prev, images: updatedImages }));
  };

  const removeSlideImage = (index) => {
    const updatedImages = slideFormData.images.filter((_, i) => i !== index);
    setSlideFormData(prev => ({ ...prev, images: updatedImages }));
  };return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans pb-20">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900">⚡ Admin Panel</h1>
          <a href="/" className="bg-gray-800 text-white px-5 py-2 rounded-lg font-bold hover:bg-gray-700 shadow-md">
            ← Back to Store
          </a>
        </div>

        {/* 3-TAB NAVIGATION */}
        <div className="flex gap-2 sm:gap-4 mb-6 border-b-2 border-gray-200 pb-2 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('products')}
            className={`text-sm sm:text-lg font-bold px-4 py-2 rounded-t-lg transition cursor-pointer whitespace-nowrap ${activeTab === 'products' ? 'text-blue-600 border-b-4 border-blue-600 bg-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
          >
            📦 Product Catalog
          </button>
          <button 
            onClick={() => setActiveTab('banners')}
            className={`text-sm sm:text-lg font-bold px-4 py-2 rounded-t-lg transition cursor-pointer whitespace-nowrap ${activeTab === 'banners' ? 'text-blue-600 border-b-4 border-blue-600 bg-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
          >
            🖼️ Old Hero Builder
          </button>
          <button 
            onClick={() => setActiveTab('newHero')}
            className={`text-sm sm:text-lg font-bold px-4 py-2 rounded-t-lg transition cursor-pointer whitespace-nowrap ${activeTab === 'newHero' ? 'text-blue-600 border-b-4 border-blue-600 bg-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
          >
            ✨ New Sliding Hero
          </button>
        </div>

        {/* PRODUCT MANAGER */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            {/* PRODUCT FORM */}
            <div className="bg-white p-6 rounded-xl shadow-md h-fit border-t-4 border-blue-500">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {editingItem ? '✏️ Edit Product' : '➕ Add New Product'}
              </h2>
              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Product Name</label><input required type="text" className="w-full p-2.5 border rounded-lg outline-none text-sm text-gray-900 bg-white font-medium" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Ryzen 7 9800X3D" /></div>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Category</label><select className="w-full p-2.5 border rounded-lg outline-none text-sm text-gray-900 font-medium bg-white" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Retail Price ($)</label><input required type="number" step="0.01" className="w-full p-2.5 border rounded-lg outline-none text-sm text-gray-900 bg-white font-medium" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="422" /></div>
                <div><label className="block text-xs font-bold text-blue-600 mb-1">⚙️ Technical Specifications ({formData.category})</label>{renderSpecFields()}</div>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Description & Overview</label><textarea rows="3" className="w-full p-2.5 border rounded-lg outline-none text-sm text-gray-900 bg-white font-medium resize-y" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Enter general overview..." /></div>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Image Path(s) / URL(s)</label><input type="text" className="w-full p-2.5 border rounded-lg outline-none text-sm text-gray-900 bg-white font-medium" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} placeholder="url1.jpg, url2.jpg" /></div>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Availability Status</label><select className="w-full p-2.5 border rounded-lg outline-none text-sm text-gray-900 bg-white font-medium" value={formData.in_stock ? 'true' : 'false'} onChange={(e) => setFormData({...formData, in_stock: e.target.value === 'true'})}><option value="true">In Stock ✅</option><option value="false">Out of Stock ❌</option></select></div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition shadow-md cursor-pointer">{editingItem ? 'Update Product' : 'Save Product'}</button>
                  {editingItem && (<button type="button" onClick={() => { setEditingItem(null); setFormData({ id: '', name: '', category: 'CPUs', price: '', image: '', in_stock: true, description: '', specs: {} }); }} className="bg-gray-200 hover:bg-gray-300 px-4 py-2.5 rounded-lg font-bold text-gray-700 cursor-pointer">Cancel</button>)}
                </div>
              </form>
            </div>

            {/* PRODUCT LIST */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border-t-4 border-gray-800">
              <h2 className="text-xl font-bold mb-4 text-gray-800">📦 All Store Catalog ({allProducts.length})</h2>
              <div className="mb-4"><input type="text" placeholder="Search products by name or category..." className="w-full p-2.5 border border-gray-300 rounded-lg outline-none text-sm text-gray-900 bg-white font-medium focus:border-blue-500 transition-colors" value={adminSearch} onChange={(e) => setAdminSearch(e.target.value)} /></div>
              {loadingProducts ? (
                <div className="text-center py-10 text-gray-500 font-bold animate-pulse">Loading catalog...</div>
              ) : displayedProducts.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No items found matching your search.</div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {displayedProducts.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/50 transition">
                      <div className="mb-2 sm:mb-0">
                        <div className="flex items-center gap-2"><h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>{item.in_stock === false && <span className="text-[10px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded">Out of Stock</span>}</div>
                        <p className="text-xs text-blue-600 font-medium">{item.category} — <span className="text-gray-900 font-bold">${item.price}</span></p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleProductEdit(item)} className="bg-white border border-gray-300 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded text-xs font-bold shadow-sm cursor-pointer">Edit</button>
                        <button onClick={() => handleProductDelete(item.id)} className="bg-white border border-gray-300 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded text-xs font-bold shadow-sm cursor-pointer">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* OLD BANNER BUILDER */}
        {activeTab === 'banners' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            {/* SLIDE FORM */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md h-fit border-t-4 border-yellow-400">
              <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                {editingSlide ? '✏️ Edit Slide' : '➕ Create New Slide'}
              </h2>
              <form onSubmit={handleSlideSubmit} className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">1. Text & Content</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="block text-xs font-bold text-gray-600 mb-1">Badge / Tagline</label><input required type="text" className="w-full p-2 border rounded-lg text-sm text-gray-900 bg-white font-medium" value={slideFormData.tag} onChange={e => setSlideFormData({...slideFormData, tag: e.target.value})} placeholder="e.g. GEFORCE RTX 40 SERIES" /></div>
                    <div><label className="block text-xs font-bold text-gray-600 mb-1">Main Title</label><input required type="text" className="w-full p-2 border rounded-lg text-sm text-gray-900 bg-white font-medium" value={slideFormData.title} onChange={e => setSlideFormData({...slideFormData, title: e.target.value})} placeholder="e.g. Next-Level Performance" /></div>
                    <div className="sm:col-span-2"><label className="block text-xs font-bold text-gray-600 mb-1">Subtitle</label><input required type="text" className="w-full p-2 border rounded-lg text-sm text-gray-900 bg-white font-medium" value={slideFormData.subtitle} onChange={e => setSlideFormData({...slideFormData, subtitle: e.target.value})} placeholder="e.g. RTX Graphics · Fast Memory" /></div>
                    <div><label className="block text-xs font-bold text-gray-600 mb-1">Button Text</label><input required type="text" className="w-full p-2 border rounded-lg text-sm text-gray-900 bg-white font-medium" value={slideFormData.button_text} onChange={e => setSlideFormData({...slideFormData, button_text: e.target.value})} placeholder="e.g. Shop Build Parts" /></div>
                    <div><label className="block text-xs font-bold text-gray-600 mb-1">Button Category Target</label><select className="w-full p-2 border rounded-lg text-sm text-gray-900 font-medium bg-white" value={slideFormData.category_target} onChange={e => setSlideFormData({...slideFormData, category_target: e.target.value})}>{categories.map(c => <option key={c} value={c}>{c}</option>)}<option value="All">All Store</option></select></div>
                    <div className="sm:col-span-2"><label className="block text-xs font-bold text-gray-600 mb-1">Text Alignment</label><select className="w-full p-2 border rounded-lg text-sm text-gray-900 font-medium bg-white" value={slideFormData.text_alignment} onChange={e => setSlideFormData({...slideFormData, text_alignment: e.target.value})}><option value="left">Left Side</option><option value="right">Right Side</option></select></div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-3 border-b pb-2">
                    <h3 className="font-bold text-gray-800">2. Floating Images Layering</h3>
                    <button type="button" onClick={addSlideImage} className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-bold px-3 py-1.5 rounded shadow cursor-pointer">+ Add Image</button>
                  </div>
                  {slideFormData.images.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">No images added to this slide yet. Click "+ Add Image".</p>
                  ) : (
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                      {slideFormData.images.map((img, idx) => (
                        <div key={idx} className="bg-white border border-gray-300 rounded-lg p-3 shadow-sm relative">
                          <button type="button" onClick={() => removeSlideImage(idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-xl leading-none cursor-pointer">&times;</button>
                          <h4 className="text-xs font-extrabold text-blue-600 mb-2 uppercase">Image Layer {idx + 1}</h4>
                          <div className="space-y-3">
                            <div><label className="block text-[10px] font-bold text-gray-500 uppercase">Direct Image URL (.png / .jpg)</label><input type="text" className="w-full p-2 border rounded text-sm text-gray-900 bg-white font-medium" value={img.url} onChange={(e) => updateSlideImage(idx, 'url', e.target.value)} placeholder="https://..." /></div>
                            <div className="grid grid-cols-2 gap-3">
                              <div><label className="block text-[10px] font-bold text-gray-500 uppercase">Width / Size</label><input type="text" className="w-full p-2 border rounded text-sm text-gray-900 bg-white font-medium" value={img.width} onChange={(e) => updateSlideImage(idx, 'width', e.target.value)} placeholder="e.g. w-32 md:w-48" /></div>
                              <div><label className="block text-[10px] font-bold text-gray-500 uppercase">X/Y Exact Position</label><input type="text" className="w-full p-2 border rounded text-sm text-gray-900 bg-white font-medium" value={img.position} onChange={(e) => updateSlideImage(idx, 'position', e.target.value)} placeholder="e.g. top-[10%] left-[5%]" /></div>
                              <div><label className="block text-[10px] font-bold text-gray-500 uppercase">Animation & Delay</label><input type="text" className="w-full p-2 border rounded text-sm text-gray-900 bg-white font-medium" value={img.animation} onChange={(e) => updateSlideImage(idx, 'animation', e.target.value)} placeholder="e.g. anim-float-1 delay-100" /></div>
                              <div><label className="block text-[10px] font-bold text-gray-500 uppercase">Z-Index (Layer Height)</label><input type="text" className="w-full p-2 border rounded text-sm text-gray-900 bg-white font-medium" value={img.zIndex} onChange={(e) => updateSlideImage(idx, 'zIndex', e.target.value)} placeholder="e.g. z-10, z-20" /></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  <button type="submit" className="flex-1 bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-lg transition shadow-md cursor-pointer">{editingSlide ? '💾 Update Slide' : '💾 Save New Slide'}</button>
                  {editingSlide && (<button type="button" onClick={() => { setEditingSlide(null); setSlideFormData({ id: '', tag: '', title: '', subtitle: '', button_text: 'Shop Now', category_target: 'All', text_alignment: 'right', images: [] }); }} className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg font-bold text-gray-700 cursor-pointer">Cancel</button>)}
                </div>
              </form>
            </div>

            {/* LIVE SLIDES LIST */}
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-gray-800">
              <h2 className="text-xl font-bold mb-4 text-gray-800">📋 Active Slides ({dbSlides.length})</h2>
              {loadingSlides ? (
                <div className="text-center py-10 text-gray-500 font-bold animate-pulse">Loading slides...</div>
              ) : dbSlides.length === 0 ? (
                <div className="text-center py-10 text-gray-500 text-sm">No slides saved yet. Create one on the left!</div>
              ) : (
                <div className="space-y-4">
                  {dbSlides.map((slide, i) => (
                    <div key={slide.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-white transition shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-[10px] font-black bg-yellow-400 text-black px-2 py-0.5 rounded-full mb-1 inline-block">Slide #{i + 1}</span>
                          <h4 className="font-black text-gray-900 leading-tight">{slide.title}</h4>
                          <p className="text-xs text-gray-500 truncate w-48">{slide.tag}</p>
                        </div>
                      </div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase mb-3">{slide.images?.length || 0} Floating Images</div>
                      <div className="flex gap-2">
                        <button onClick={() => handleSlideEdit(slide)} className="flex-1 bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 py-1.5 rounded text-xs font-bold shadow-sm cursor-pointer">Edit</button>
                        <button onClick={() => handleSlideDelete(slide.id)} className="bg-white border border-red-200 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded text-xs font-bold shadow-sm cursor-pointer">Trash</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}{/* NEW SLIDING HERO MANAGER */}
        {activeTab === 'newHero' && (
          <NewHeroManager supabase={supabase} />
        )}

      </div>
    </div>
  );
}// =========================================================================
// 🌟 NEW SLIDING HERO MANAGER COMPONENT (Fixed Contrast & Seed Ability)
// =========================================================================
const NewHeroManager = ({ supabase }) => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(null);
  
  const [formData, setFormData] = useState({
    image_url: '', title_en: '', title_ar: '', subtitle_en: '', subtitle_ar: '',
    btn_text_en: '', btn_text_ar: '', btn_icon: '🚀', action_target: 'explore',
    gradient: 'from-blue-900/90 via-black/80 to-transparent', sort_order: 1, is_active: true
  });

  const defaultPresets = [
    {
      image_url: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2000&auto=format&fit=crop',
      title_en: 'Ultimate Gaming Power',
      title_ar: 'قوة ألعاب لا مثيل لها',
      subtitle_en: 'Experience the next generation of graphics with the RTX 50-Series and elite components.',
      subtitle_ar: 'اختبر الجيل القادم من الرسومات مع سلسلة RTX 50 وقطع الحاسوب النخبة.',
      btn_text_en: 'Explore Components',
      btn_text_ar: 'استكشف القطع',
      btn_icon: '🚀',
      action_target: 'explore',
      gradient: 'from-blue-900/90 via-black/80 to-transparent',
      sort_order: 1,
      is_active: true
    },
    {
      image_url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=2000&auto=format&fit=crop',
      title_en: 'Engineer Your Dream',
      title_ar: 'صمم حاسوب أحلامك',
      subtitle_en: 'Custom PC building made effortless, perfectly compatible, and tailored to your needs.',
      subtitle_ar: 'تجميع الحاسوب المخصص أصبح سهلاً، متوافقاً تماماً، ومصمماً لاحتياجاتك.',
      btn_text_en: 'Start Building Now',
      btn_text_ar: 'ابدأ التجميع الآن',
      btn_icon: '🛠️',
      action_target: 'builder',
      gradient: 'from-purple-900/90 via-black/80 to-transparent',
      sort_order: 2,
      is_active: true
    },
    {
      image_url: 'https://images.unsplash.com/photo-1611078709841-11d4db9e34cd?q=80&w=2000&auto=format&fit=crop',
      title_en: 'Stay Frosty Under Pressure',
      title_ar: 'أداء فائق البرودة',
      subtitle_en: 'Premium liquid cooling solutions like the Thermalright Wonder Vision 360 ensuring maximum performance.',
      subtitle_ar: 'حلول تبريد مائي ممتازة مثل Thermalright Wonder Vision 360 تضمن لك أقصى أداء.',
      btn_text_en: 'View Cooling Systems',
      btn_text_ar: 'عرض أنظمة التبريد',
      btn_icon: '❄️',
      action_target: 'Liquid & Air Cooling',
      gradient: 'from-cyan-900/90 via-black/80 to-transparent',
      sort_order: 3,
      is_active: true
    }
  ];

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    setLoading(true);
    const { data } = await supabase.from('new_sliding_hero').select('*').order('sort_order', { ascending: true });
    if (data) setSlides(data);
    setLoading(false);
  };

  const seedDefaultSlides = async () => {
    if (window.confirm('Load default pre-existing slides into the database?')) {
      const { error } = await supabase.from('new_sliding_hero').insert(defaultPresets);
      if (error) {
        alert(`Failed to load default slides: ${error.message}`);
      } else {
        alert('Default slides loaded into Database successfully! You can now edit them below.');
        fetchSlides();
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await supabase.from('new_sliding_hero').update(formData).eq('id', isEditing);
    } else {
      await supabase.from('new_sliding_hero').insert([formData]);
    }
    setFormData({
      image_url: '', title_en: '', title_ar: '', subtitle_en: '', subtitle_ar: '',
      btn_text_en: '', btn_text_ar: '', btn_icon: '🚀', action_target: 'explore',
      gradient: 'from-blue-900/90 via-black/80 to-transparent', sort_order: 1, is_active: true
    });
    setIsEditing(null);
    fetchSlides();
  };

  const handleEdit = (slide) => {
    setFormData(slide);
    setIsEditing(slide.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this slide?')) {
      await supabase.from('new_sliding_hero').delete().eq('id', id);
      fetchSlides();
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-purple-500 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">✨ Manage New Sliding Hero Panels</h2>
          <p className="text-xs text-gray-500 font-medium">Add, edit, or customize any slide featured on the storefront hero banner.</p>
        </div>
        <button 
          type="button" 
          onClick={seedDefaultSlides} 
          className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold px-4 py-2.5 rounded-lg shadow transition cursor-pointer"
        >
          ⚡ Load Default Pre-Existing Slides
        </button>
      </div>
      
      {/* Editor Form - Text inputs explicitly styled for dark readable text */}
      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
        
        {/* Core Settings */}
        <div className="col-span-1 md:col-span-2 space-y-4 border-b pb-6 border-gray-300">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Background Image URL</label>
            <input required className="w-full p-2.5 border rounded-lg outline-none text-sm text-gray-900 bg-white font-medium focus:border-blue-500" type="text" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} placeholder="https://images.unsplash.com/photo-..." />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Button Icon Emoji</label>
              <input required className="w-full p-2.5 border rounded-lg outline-none text-sm text-gray-900 bg-white font-medium focus:border-blue-500" type="text" value={formData.btn_icon} onChange={e => setFormData({...formData, btn_icon: e.target.value})} placeholder="🚀, 🛠️, ❄️" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Action Target</label>
              <select className="w-full p-2.5 border rounded-lg outline-none text-sm text-gray-900 font-medium bg-white focus:border-blue-500" value={formData.action_target} onChange={e => setFormData({...formData, action_target: e.target.value})}>
                <option value="explore">Explore Catalog (Scrolls down)</option>
                <option value="builder">Open PC Builder Drawer</option>
                <option value="Liquid & Air Cooling">Filter by Cooling</option>
                <option value="CPUs">Filter by CPUs</option>
                <option value="GPUs">Filter by GPUs</option>
                <option value="PC Cases">Filter by PC Cases</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Gradient Overlay Tailwind Class</label>
              <input className="w-full p-2.5 border rounded-lg outline-none text-sm text-gray-900 bg-white font-medium focus:border-blue-500" type="text" value={formData.gradient} onChange={e => setFormData({...formData, gradient: e.target.value})} placeholder="from-blue-900/90 via-black/80 to-transparent" />
            </div>
          </div>
        </div>

        {/* English Content */}
        <div className="space-y-4">
          <h3 className="font-bold text-blue-600 border-b pb-2 text-sm uppercase tracking-wider">English Content</h3>
          <div><label className="block text-xs font-bold text-gray-700 mb-1">Title (EN)</label><input required className="w-full p-2.5 border rounded-lg outline-none text-sm text-gray-900 bg-white font-medium focus:border-blue-500" type="text" value={formData.title_en} onChange={e => setFormData({...formData, title_en: e.target.value})} placeholder="e.g. Ultimate Gaming Power" /></div>
          <div><label className="block text-xs font-bold text-gray-700 mb-1">Subtitle (EN)</label><textarea required rows="2" className="w-full p-2.5 border rounded-lg outline-none text-sm text-gray-900 bg-white font-medium resize-y focus:border-blue-500" value={formData.subtitle_en} onChange={e => setFormData({...formData, subtitle_en: e.target.value})} placeholder="e.g. Experience next generation graphics..." /></div>
          <div><label className="block text-xs font-bold text-gray-700 mb-1">Button Text (EN)</label><input required className="w-full p-2.5 border rounded-lg outline-none text-sm text-gray-900 bg-white font-medium focus:border-blue-500" type="text" value={formData.btn_text_en} onChange={e => setFormData({...formData, btn_text_en: e.target.value})} placeholder="e.g. Explore Components" /></div>
        </div>

        {/* Arabic Content */}
        <div className="space-y-4" dir="rtl">
          <h3 className="font-bold text-green-600 border-b pb-2 text-sm uppercase tracking-wider text-right">المحتوى العربي</h3>
          <div><label className="block text-xs font-bold text-gray-700 mb-1 text-right">العنوان الرئيسية</label><input required className="w-full p-2.5 border rounded-lg outline-none text-sm text-gray-900 bg-white font-medium focus:border-blue-500" type="text" value={formData.title_ar} onChange={e => setFormData({...formData, title_ar: e.target.value})} placeholder="مثال: قوة ألعاب لا مثيل لها" /></div>
          <div><label className="block text-xs font-bold text-gray-700 mb-1 text-right">العنوان الفرعي</label><textarea required rows="2" className="w-full p-2.5 border rounded-lg outline-none text-sm text-gray-900 bg-white font-medium resize-y focus:border-blue-500" value={formData.subtitle_ar} onChange={e => setFormData({...formData, subtitle_ar: e.target.value})} placeholder="مثال: اختبر الجيل القادم من الرسومات..." /></div>
          <div><label className="block text-xs font-bold text-gray-700 mb-1 text-right">نص الزر</label><input required className="w-full p-2.5 border rounded-lg outline-none text-sm text-gray-900 bg-white font-medium focus:border-blue-500" type="text" value={formData.btn_text_ar} onChange={e => setFormData({...formData, btn_text_ar: e.target.value})} placeholder="مثال: استكشف القطع" /></div>
        </div>

        {/* Settings & Save */}
        <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-300 gap-4">
          <div className="flex gap-6 w-full sm:w-auto">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-800"><input type="number" className="w-16 p-2 border rounded-lg text-center text-gray-900 bg-white font-bold" value={formData.sort_order} onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value) || 1})} /> Sort Order</label>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-800 cursor-pointer"><input type="checkbox" className="w-5 h-5 accent-blue-600 cursor-pointer" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} /> Is Active</label>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            {isEditing && <button type="button" onClick={() => { setIsEditing(null); setFormData({ image_url: '', title_en: '', title_ar: '', subtitle_en: '', subtitle_ar: '', btn_text_en: '', btn_text_ar: '', btn_icon: '🚀', action_target: 'explore', gradient: 'from-blue-900/90 via-black/80 to-transparent', sort_order: 1, is_active: true }); }} className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-500 transition cursor-pointer">Cancel</button>}
            <button type="submit" className="flex-1 sm:flex-none px-8 py-2.5 bg-blue-600 text-white font-black rounded-lg hover:bg-blue-700 shadow-md transition cursor-pointer">
              {isEditing ? 'Update Slide' : 'Add New Slide'}
            </button>
          </div>
        </div>
      </form>

      {/* List of Existing Database Slides */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-gray-500 text-center py-6 font-bold animate-pulse">Loading hero slides from database...</p>
        ) : slides.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-sm font-medium mb-3">No slides found in your Supabase table.</p>
            <button onClick={seedDefaultSlides} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow transition cursor-pointer">
              Click here to load the 3 default pre-existing slides
            </button>
          </div>
        ) : (
          slides.map(slide => (
            <div key={slide.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
              <img src={slide.image_url} alt="thumbnail" className="w-full sm:w-32 h-24 object-cover rounded-lg bg-gray-100 border" />
              <div className="flex-1 w-full">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase text-white ${slide.is_active ? 'bg-green-500' : 'bg-red-500'}`}>{slide.is_active ? 'Active' : 'Hidden'}</span>
                  <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded border">Order: {slide.sort_order}</span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{slide.btn_icon} Target: {slide.action_target}</span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{slide.title_en} <span className="text-gray-300 font-normal mx-1">|</span> <span dir="rtl" className="text-green-700">{slide.title_ar}</span></h4>
                <p className="text-xs text-gray-500 line-clamp-1">{slide.subtitle_en}</p>
              </div>
              <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                <button onClick={() => handleEdit(slide)} className="flex-1 sm:flex-none px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition text-xs shadow-sm cursor-pointer">Edit</button>
                <button onClick={() => handleDelete(slide.id)} className="flex-1 sm:flex-none px-4 py-2 bg-red-100 text-red-600 font-bold rounded-lg hover:bg-red-200 transition text-xs shadow-sm cursor-pointer">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};