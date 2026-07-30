"use client";

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';

const categories = [
  'Motherboards', 
  'PC Cases', 
  'Power Supplies', 
  'Liquid & Air Cooling', 
  'Case Fans & Hubs', 
  'Monitors', 
  'Chairs & Accessories',
  'CPUs'
];

// Master Starter Inventory
const staticInventory = [
  // Power Supplies
  { id: 'psu-1', category: 'Power Supplies', name: 'ThermalRight TR-TB650S 650W 80 PLUS', price: 58, image: '/images/tr-tb650s.jpg', in_stock: true },
  { id: 'psu-2', category: 'Power Supplies', name: 'ThermalRight TR-TB750S 750W', price: 76, image: '/images/tr-tb750s.jpg', in_stock: true },
  { id: 'psu-3', category: 'Power Supplies', name: 'ThermalRight TR-SP750 750W 80 PLUS', price: 100, image: '/images/tr-sp750.jpg', in_stock: true },
  { id: 'psu-4', category: 'Power Supplies', name: 'ThermalRight TR-SP850 850W', price: 115, image: '/images/tr-sp850.jpg', in_stock: true },
  { id: 'psu-5', category: 'Power Supplies', name: 'ThermalRight TR-SP850-W 850W White', price: 118, image: '/images/tr-sp850-w.jpg', in_stock: true },
  { id: 'psu-6', category: 'Power Supplies', name: 'ThermalRight TR-SP1000 1000W', price: 130, image: '/images/tr-sp1000.jpg', in_stock: true },
  { id: 'psu-7', category: 'Power Supplies', name: 'ThermalRight TR-SP1000-W 1000W White', price: 135, image: '/images/tr-sp1000-w.jpg', in_stock: true },
  
  // Coolers
  { id: 'cool-1', category: 'Liquid & Air Cooling', name: 'ThermalRight Assassin X 120 Refined SE ARGB (AM4,AM5)', price: 18, image: '/images/cool1.jpg', in_stock: true },
  { id: 'cool-2', category: 'Liquid & Air Cooling', name: 'ThermalRight Burst Assassin 120 SE ARGB', price: 24, image: '/images/burst120.jpg', in_stock: true },
  { id: 'cool-3', category: 'Liquid & Air Cooling', name: 'ThermalRight Phantom Spirit 120 SE ARGB', price: 40, image: '/images/phantom120.jpg', in_stock: true },
  { id: 'cool-4', category: 'Liquid & Air Cooling', name: 'ThermalRight Aqua Elite 240 V3', price: 57, image: '/images/aqua240.jpg', in_stock: true },
  { id: 'cool-5', category: 'Liquid & Air Cooling', name: 'ThermalRight Aqua Elite 240 WHITE V3', price: 60, image: '/images/aqua240w.jpg', in_stock: true },
  { id: 'cool-6', category: 'Liquid & Air Cooling', name: 'ThermalRight Aqua Elite 240 ARGB BLACK V6', price: 57, image: '/images/aqua240v6.jpg', in_stock: true },
  { id: 'cool-7', category: 'Liquid & Air Cooling', name: 'ThermalRight Aqua Elite 240 ARGB WHITE V6', price: 60, image: '/images/aqua240v6w.jpg', in_stock: true },
  { id: 'cool-8', category: 'Liquid & Air Cooling', name: 'ThermalRight Aqua Elite 360 V3', price: 70, image: '/images/aqua360.jpg', in_stock: true },
  { id: 'cool-9', category: 'Liquid & Air Cooling', name: 'ThermalRight Aqua Elite 360 WHITE V3', price: 73, image: '/images/aqua360w.jpg', in_stock: true },
  { id: 'cool-10', category: 'Liquid & Air Cooling', name: 'ThermalRight Aqua Elite 360 ARGB BLACK V6', price: 70, image: '/images/aqua360v6.jpg', in_stock: true },
  { id: 'cool-11', category: 'Liquid & Air Cooling', name: 'ThermalRight Aqua Elite 360 ARGB WHITE V6', price: 73, image: '/images/aqua360v6w.jpg', in_stock: true },
  { id: 'cool-12', category: 'Liquid & Air Cooling', name: 'ThermalRight Frozen Infinity 360 BLACK', price: 82, image: '/images/frozinf360.jpg', in_stock: true },
  { id: 'cool-13', category: 'Liquid & Air Cooling', name: 'ThermalRight Frozen Infinity 360 WHITE', price: 85, image: '/images/frozinf360w.jpg', in_stock: true },
  { id: 'cool-14', category: 'Liquid & Air Cooling', name: 'ThermalRight Frozen Notte 240 BLACK ARGB V2', price: 68, image: '/images/froz240argb.jpg', in_stock: true },
  { id: 'cool-15', category: 'Liquid & Air Cooling', name: 'ThermalRight Frozen Notte 240 WHITE ARGB V2', price: 68, image: '/images/froz240argbw.jpg', in_stock: true },
  { id: 'cool-16', category: 'Liquid & Air Cooling', name: 'ThermalRight Frozen Notte 360 BLACK ARGB V2', price: 90, image: '/images/froz360argb.jpg', in_stock: true },
  { id: 'cool-17', category: 'Liquid & Air Cooling', name: 'ThermalRight Frozen Notte 360 WHITE ARGB V2', price: 90, image: '/images/froz360argbw.jpg', in_stock: true },
  { id: 'cool-18', category: 'Liquid & Air Cooling', name: 'ThermalRight Peerless Vision 240 ARGB BLACK', price: 108, image: '/images/pv240.jpg', in_stock: true },
  { id: 'cool-19', category: 'Liquid & Air Cooling', name: 'ThermalRight Peerless Vision 240 ARGB WHITE', price: 110, image: '/images/pv240w.jpg', in_stock: true },
  { id: 'cool-20', category: 'Liquid & Air Cooling', name: 'ThermalRight Peerless Vision 360 ARGB BLACK', price: 125, image: '/images/pv360.jpg', in_stock: true },
  { id: 'cool-21', category: 'Liquid & Air Cooling', name: 'ThermalRight Peerless Vision 360 ARGB WHITE', price: 127, image: '/images/pv360w.jpg', in_stock: true },
  { id: 'cool-22', category: 'Liquid & Air Cooling', name: 'ThermalRight Peerless Vision 360 UB ARGB BLACK', price: 134, image: '/images/pv360ub.jpg', in_stock: true },
  { id: 'cool-23', category: 'Liquid & Air Cooling', name: 'ThermalRight Peerless Vision 360 UB ARGB WHITE', price: 137, image: '/images/pv360ubw.jpg', in_stock: true },
  { id: 'cool-24', category: 'Liquid & Air Cooling', name: 'ThermalRight Trofeo Vision 360 ARGB BLACK', price: 177, image: '/images/trof360.jpg', in_stock: true },
  { id: 'cool-25', category: 'Liquid & Air Cooling', name: 'ThermalRight Trofeo Vision 360 ARGB WHITE', price: 180, image: '/images/trof360w.jpg', in_stock: true },
  { id: 'cool-26', category: 'Liquid & Air Cooling', name: 'ThermalRight Levita Vision 360 ARGB BLACK', price: 230, image: '/images/lev360.jpg', in_stock: true },
  { id: 'cool-27', category: 'Liquid & Air Cooling', name: 'ThermalRight Levita Vision 360 ARGB WHITE', price: 235, image: '/images/lev360w.jpg', in_stock: true },

  // PC Cases
  { id: 'case-1', category: 'PC Cases', name: 'ThermalRight A70 VISION', price: 160, image: '/images/a70.jpg', in_stock: true },
  { id: 'case-2', category: 'PC Cases', name: 'ThermalRight A70 VISION WHITE', price: 165, image: '/images/a70w.jpg', in_stock: true },
  { id: 'case-3', category: 'PC Cases', name: 'ThermalRight TL-M10 VISION', price: 123, image: '/images/tlm10.jpg', in_stock: true },
  { id: 'case-4', category: 'PC Cases', name: 'ThermalRight TL-M10W VISION', price: 129, image: '/images/tlm10w.jpg', in_stock: true },
  { id: 'case-5', category: 'PC Cases', name: 'Darkflash DY470 Black with 4 argb fans', price: 145, image: '/images/dy470.jpg', in_stock: true },
  { id: 'case-6', category: 'PC Cases', name: 'Darkflash DY470 White with 4 argb fans', price: 148, image: '/images/dy470w.jpg', in_stock: true },
  { id: 'case-7', category: 'PC Cases', name: 'Darkflash DS950 Black with 6 argb fans', price: 88, image: '/images/ds950.jpg', in_stock: true },
  { id: 'case-8', category: 'PC Cases', name: 'Darkflash DS950 White with 6 argb fans', price: 91, image: '/images/ds950w.jpg', in_stock: true },
  { id: 'case-9', category: 'PC Cases', name: 'Darkflash DS950V Black with 6 argb fans(with Screen)', price: 118, image: '/images/ds950v.jpg', in_stock: true },
  { id: 'case-10', category: 'PC Cases', name: 'Darkflash DS950V White with 6 argb fans(with Screen)', price: 120, image: '/images/ds950vw.jpg', in_stock: true },
  { id: 'case-11', category: 'PC Cases', name: 'Darkflash F1 Black with 6 argb fans', price: 136, image: '/images/f1.jpg', in_stock: true },
  { id: 'case-12', category: 'PC Cases', name: 'Darkflash F1 White with 6 argb fans', price: 138, image: '/images/f1w.jpg', in_stock: true },
  { id: 'case-13', category: 'PC Cases', name: 'Darkflash C280 Black with 7 argb fans', price: 84, image: '/images/c280.jpg', in_stock: true },
  { id: 'case-14', category: 'PC Cases', name: 'Darkflash C280 White with 7 argb fans', price: 86, image: '/images/c280w.jpg', in_stock: true },
  { id: 'case-15', category: 'PC Cases', name: 'Darkflash DK431 Mesh Black with 4 argb fans', price: 70, image: '/images/dk431m.jpg', in_stock: true },
  { id: 'case-16', category: 'PC Cases', name: 'Darkflash DK431 Glass Black with 4 argb fans', price: 73, image: '/images/dk431g.jpg', in_stock: true },
  { id: 'case-17', category: 'PC Cases', name: 'Darkflash B275 PRO Black with 6 argb fans', price: 54, image: '/images/b275.jpg', in_stock: true },
  { id: 'case-18', category: 'PC Cases', name: 'Darkflash B275 PRO White with 6 argb fans', price: 58, image: '/images/b275w.jpg', in_stock: true },
  { id: 'case-19', category: 'PC Cases', name: 'Darkflash DRX70 Mesh White with 4 rgb fans', price: 66, image: '/images/drx70.jpg', in_stock: true },
  { id: 'case-20', category: 'PC Cases', name: 'Darkflash FT418 PRO Black with 7 argb fans', price: 105, image: '/images/ft418.jpg', in_stock: true },
  { id: 'case-21', category: 'PC Cases', name: 'Darkflash FT418 PRO White with 7 argb fans', price: 109, image: '/images/ft418w.jpg', in_stock: true },
  { id: 'case-22', category: 'PC Cases', name: 'Darkflash DB330M Glass Black with 3 argb fans', price: 45, image: '/images/db330m.jpg', in_stock: true },
  { id: 'case-23', category: 'PC Cases', name: 'Darkflash DB330M Glass White with 3 argb fans', price: 47, image: '/images/db330mw.jpg', in_stock: true },
  { id: 'case-24', category: 'PC Cases', name: 'Darkflash DK361 Black with 4 argb fans', price: 58, image: '/images/dk361.jpg', in_stock: true },

  // Fans & Accessories
  { id: 'fan-1', category: 'Case Fans & Hubs', name: 'ThermalRight TL-C12C-S X5', price: 28, image: '/images/tlc12c.jpg', in_stock: true },
  { id: 'fan-2', category: 'Case Fans & Hubs', name: 'ThermalRight TL-C12CW-S X5', price: 28, image: '/images/tlc12cw.jpg', in_stock: true },
  { id: 'fan-3', category: 'Case Fans & Hubs', name: 'ThermalRight TL-M12Q-S X3', price: 25, image: '/images/tlm12q.jpg', in_stock: true },
  { id: 'fan-4', category: 'Case Fans & Hubs', name: 'ThermalRight TL-M12QW-S X3', price: 25, image: '/images/tlm12qw.jpg', in_stock: true },
  { id: 'hub-1', category: 'Case Fans & Hubs', name: 'ThermalRight USB 2.0 HUB X5 BLACK', price: 11, image: '/images/usbhub.jpg', in_stock: true },
  { id: 'hub-2', category: 'Case Fans & Hubs', name: 'ThermalRight USB 2.0 HUB X5 WHITE', price: 11, image: '/images/usbhubw.jpg', in_stock: true },
  { id: 'hub-3', category: 'Case Fans & Hubs', name: 'ThermalRight FANArgb -HUB Controller REV.A', price: 9, image: '/images/fanhub.jpg', in_stock: true },
  { id: 'hub-4', category: 'Case Fans & Hubs', name: 'ThermalRight FAN-AND Argb HUB X8', price: 11, image: '/images/fanhubx8.jpg', in_stock: true },
  { id: 'hub-5', category: 'Case Fans & Hubs', name: 'ThermalRight TL-ARGB and FAN HUB x12 IR BLACK', price: 14, image: '/images/fanhub12.jpg', in_stock: true },
  { id: 'hub-6', category: 'Case Fans & Hubs', name: 'ThermalRight TL-ARGB and FAN HUB x12 IR WHITE', price: 14, image: '/images/fanhub12w.jpg', in_stock: true },
  { id: 'acc-1', category: 'Case Fans & Hubs', name: 'ThermalRight TR-GCSF ARGB VGA Holder', price: 10, image: '/images/vgaholder.jpg', in_stock: true },
  { id: 'fan-5', category: 'Case Fans & Hubs', name: 'Darkflash INF34 3IN1 Black', price: 26, image: '/images/inf34.jpg', in_stock: true },
  { id: 'fan-6', category: 'Case Fans & Hubs', name: 'Darkflash INF34 3IN1 White', price: 27, image: '/images/inf34w.jpg', in_stock: true },
  { id: 'pad-1', category: 'Chairs & Accessories', name: 'Darkflash Mouse Pad M2 Grey', price: 8, image: '/images/m2grey.jpg', in_stock: true },
  { id: 'pad-2', category: 'Chairs & Accessories', name: 'Darkflash Mouse Pad M2 Black', price: 8, image: '/images/m2black.jpg', in_stock: true },
  { id: 'pad-3', category: 'Chairs & Accessories', name: 'Darkflash Mouse Pad M5 Black', price: 10, image: '/images/m5black.jpg', in_stock: true },
  { id: 'pad-4', category: 'Chairs & Accessories', name: 'Darkflash Mouse Pad M5 Brown', price: 10, image: '/images/m5brown.jpg', in_stock: true },
  { id: 'chair-1', category: 'Chairs & Accessories', name: 'Darkflash Gaming Chair RC400', price: 166, image: '/images/rc400.jpg', in_stock: true },
  { id: 'chair-2', category: 'Chairs & Accessories', name: 'Darkflash Ergonomic Chair EA100 RED', price: 176, image: '/images/ea100r.jpg', in_stock: true },
  { id: 'chair-3', category: 'Chairs & Accessories', name: 'Darkflash Ergonomic Chair EA100 WHITE', price: 176, image: '/images/ea100w.jpg', in_stock: true },
  { id: 'chair-4', category: 'Chairs & Accessories', name: 'Darkflash Ergonomic Chair EA100 BLUE', price: 176, image: '/images/ea100b.jpg', in_stock: true },

  // Monitors & CPUs & MBs
  { id: 'mon-1', category: 'Monitors', name: 'MSI MAG 271QPX QD-OLED X28', price: 590, image: '/images/msi271.jpg', in_stock: true },
  { id: 'mon-2', category: 'Monitors', name: 'MSI MAG 244F', price: 125, image: '/images/msi244.jpg', in_stock: true },
  { id: 'mon-3', category: 'Monitors', name: 'MSI MAG 272QPF E20', price: 240, image: '/images/msi272qpf.jpg', in_stock: true },
  { id: 'mon-4', category: 'Monitors', name: 'MSI MAG 275QPF X30', price: 290, image: '/images/msi275qpf.jpg', in_stock: true },
  { id: 'mon-5', category: 'Monitors', name: 'MSI MAG 272URDF E16', price: 385, image: '/images/msi272urdf.jpg', in_stock: true },
  { id: 'mon-6', category: 'Monitors', name: 'MSI MAG 345CQR', price: 390, image: '/images/msi345cqr.jpg', in_stock: true },
  { id: 'mon-7', category: 'Monitors', name: 'MSI MAG 274UPDF E16M', price: 565, image: '/images/msi274updf.jpg', in_stock: true },
  { id: 'mon-8', category: 'Monitors', name: 'MSI MAG 274QPF X30MV', price: 440, image: '/images/msi274qpf.jpg', in_stock: true },
  { id: 'cpu-amd-1', category: 'CPUs', name: 'Ryzen 5 7500F', price: 138, image: '/images/r5-7500f.jpg', in_stock: true },
  { id: 'cpu-amd-2', category: 'CPUs', name: 'Ryzen 5 9600X', price: 205, image: '/images/r5-9600x.jpg', in_stock: true },
  { id: 'cpu-amd-3', category: 'CPUs', name: 'Ryzen 7 7800X3D', price: 315, image: '/images/r7-7800x3d.jpg', in_stock: true },
  { id: 'cpu-amd-4', category: 'CPUs', name: 'Ryzen 7 9700X', price: 285, image: '/images/r7-9700x.jpg', in_stock: true },
  { id: 'cpu-amd-5', category: 'CPUs', name: 'Ryzen 7 9800X3D', price: 420, image: '/images/r7-9800x3d.jpg', in_stock: true },
  { id: 'cpu-amd-6', category: 'CPUs', name: 'Ryzen 9 9900X', price: 410, image: '/images/r9-9900x.jpg', in_stock: true },
  { id: 'cpu-amd-7', category: 'CPUs', name: 'Ryzen 9 9950X3D', price: 690, image: '/images/r9-9950x3d.jpg', in_stock: true },
  { id: 'mb-1', category: 'Motherboards', name: 'ASUS Main GAMING Motherboard', price: 89, image: '/images/asus-mb.jpg', in_stock: true },
  { id: 'mb-2', category: 'Motherboards', name: 'ASUS B850M AYW GAMING WIFI', price: 185, image: '/images/asus-b850m.jpg', in_stock: true },
  { id: 'mb-3', category: 'Motherboards', name: 'GigaByte B650M-D2HP', price: 121, image: '/images/gb-b650m-d2hp.jpg', in_stock: true },
  { id: 'mb-4', category: 'Motherboards', name: 'MSI H610M-E', price: 80, image: '/images/msi-h610m-e.jpg', in_stock: true },
  { id: 'mb-5', category: 'Motherboards', name: 'GigaByte B650M Gaming WIFI', price: 147, image: '/images/gb-b650m-wifi.jpg', in_stock: true },
  { id: 'mb-6', category: 'Motherboards', name: 'GigaByte X870 AORUS ELITE WIFI7', price: 315, image: '/images/gb-x870-aorus.jpg', in_stock: true },
];

export default function AdminDashboard() {
  // Tabs State
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'banners'

  // --- PRODUCT MANAGER STATE ---
  const [dbProducts, setDbProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [adminSearch, setAdminSearch] = useState('');

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'Motherboards',
    price: '',
    image: '',
    in_stock: true,
    description: ''
  });

  // --- BANNER MANAGER STATE ---
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
  };

  // --- PRODUCT FUNCTIONS ---
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
      description: formData.description || ''
    };

    const { error } = await supabase.from('products').upsert([itemData]);
    if (error) {
      console.error("Error saving product:", error);
      alert(`Failed to save: ${error.message}`);
    } else {
      setFormData({ id: '', name: '', category: 'Motherboards', price: '', image: '', in_stock: true, description: '' });
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
      description: product.description || ''
    });
  };

  const handleProductDelete = async (id) => {
    if (confirm('Are you sure you want to delete or hide this item?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  };

  // --- BANNER FUNCTIONS ---
  const handleSlideSubmit = async (e) => {
    e.preventDefault();
    
    // Create payload. If new, omit ID so Supabase generates a UUID.
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

  // --- DYNAMIC IMAGE BUILDER FUNCTIONS ---
  const addSlideImage = () => {
    const newImage = { 
      url: '', 
      width: 'w-32 md:w-48', 
      position: 'top-[10%] left-[10%]', 
      animation: 'anim-float-1 delay-100', 
      zIndex: 'z-10' 
    };
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
  };


  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans pb-20">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900">⚡ Admin Panel</h1>
          <a href="/" className="bg-gray-800 text-white px-5 py-2 rounded-lg font-bold hover:bg-gray-700 shadow-md">
            ← Back to Store
          </a>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex gap-4 mb-6 border-b-2 border-gray-200 pb-2">
          <button 
            onClick={() => setActiveTab('products')}
            className={`text-lg font-bold px-4 py-2 rounded-t-lg transition cursor-pointer ${activeTab === 'products' ? 'text-blue-600 border-b-4 border-blue-600 bg-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
          >
            📦 Product Catalog
          </button>
          <button 
            onClick={() => setActiveTab('banners')}
            className={`text-lg font-bold px-4 py-2 rounded-t-lg transition cursor-pointer ${activeTab === 'banners' ? 'text-blue-600 border-b-4 border-blue-600 bg-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
          >
            🖼️ Hero Banner Builder
          </button>
        </div>

        {/* ========================================= */}
        {/*              PRODUCT MANAGER              */}
        {/* ========================================= */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            {/* PRODUCT FORM */}
            <div className="bg-white p-6 rounded-xl shadow-md h-fit border-t-4 border-blue-500">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {editingItem ? '✏️ Edit Product' : '➕ Add New Product'}
              </h2>
              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Product Name</label>
                  <input required type="text" className="w-full p-2.5 border rounded-lg outline-none text-sm text-black font-medium" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Ryzen 7 7800X3D" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Category</label>
                  <select className="w-full p-2.5 border rounded-lg outline-none text-sm text-black font-medium bg-white" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Retail Price ($)</label>
                  <input required type="number" step="0.01" className="w-full p-2.5 border rounded-lg outline-none text-sm text-black font-medium" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="299" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Description & Specifications</label>
                  <textarea rows="3" className="w-full p-2.5 border rounded-lg outline-none text-sm text-black font-medium resize-y" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Enter detailed specifications here..." />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Image Path(s) / URL(s)</label>
                  <input type="text" className="w-full p-2.5 border rounded-lg outline-none text-sm text-black font-medium" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} placeholder="url1.jpg, url2.jpg" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Availability Status</label>
                  <select className="w-full p-2.5 border rounded-lg outline-none text-sm text-black bg-white font-medium" value={formData.in_stock ? 'true' : 'false'} onChange={(e) => setFormData({...formData, in_stock: e.target.value === 'true'})}>
                    <option value="true">In Stock ✅</option>
                    <option value="false">Out of Stock ❌</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition shadow-md cursor-pointer">
                    {editingItem ? 'Update Product' : 'Save Product'}
                  </button>
                  {editingItem && (
                    <button type="button" onClick={() => { setEditingItem(null); setFormData({ id: '', name: '', category: 'Motherboards', price: '', image: '', in_stock: true, description: '' }); }} className="bg-gray-200 hover:bg-gray-300 px-4 py-2.5 rounded-lg font-bold text-gray-700 cursor-pointer">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* PRODUCT LIST */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border-t-4 border-gray-800">
              <h2 className="text-xl font-bold mb-4 text-gray-800">📦 All Store Catalog ({allProducts.length})</h2>
              
              <div className="mb-4">
                <input type="text" placeholder="Search products by name or category..." className="w-full p-2.5 border border-gray-300 rounded-lg outline-none text-sm text-black font-medium focus:border-blue-500 transition-colors bg-gray-50" value={adminSearch} onChange={(e) => setAdminSearch(e.target.value)} />
              </div>

              {loadingProducts ? (
                <div className="text-center py-10 text-gray-500 font-bold animate-pulse">Loading catalog...</div>
              ) : displayedProducts.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No items found matching your search.</div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {displayedProducts.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/50 transition">
                      <div className="mb-2 sm:mb-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                          {item.in_stock === false && <span className="text-[10px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded">Out of Stock</span>}
                        </div>
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


        {/* ========================================= */}
        {/*               BANNER BUILDER              */}
        {/* ========================================= */}
        {activeTab === 'banners' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            
            {/* SLIDE FORM */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md h-fit border-t-4 border-yellow-400">
              <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                {editingSlide ? '✏️ Edit Slide' : '➕ Create New Slide'}
              </h2>
              
              <form onSubmit={handleSlideSubmit} className="space-y-6">
                {/* 1. TEXT SETTINGS */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">1. Text & Content</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Badge / Tagline</label>
                      <input required type="text" className="w-full p-2 border rounded-lg text-sm text-black font-medium" value={slideFormData.tag} onChange={e => setSlideFormData({...slideFormData, tag: e.target.value})} placeholder="e.g. GEFORCE RTX 40 SERIES" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Main Title</label>
                      <input required type="text" className="w-full p-2 border rounded-lg text-sm text-black font-medium" value={slideFormData.title} onChange={e => setSlideFormData({...slideFormData, title: e.target.value})} placeholder="e.g. Next-Level Performance" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-600 mb-1">Subtitle</label>
                      <input required type="text" className="w-full p-2 border rounded-lg text-sm text-black font-medium" value={slideFormData.subtitle} onChange={e => setSlideFormData({...slideFormData, subtitle: e.target.value})} placeholder="e.g. RTX Graphics · Fast Memory" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Button Text</label>
                      <input required type="text" className="w-full p-2 border rounded-lg text-sm text-black font-medium" value={slideFormData.button_text} onChange={e => setSlideFormData({...slideFormData, button_text: e.target.value})} placeholder="e.g. Shop Build Parts" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Button Category Target</label>
                      <select className="w-full p-2 border rounded-lg text-sm text-black font-medium bg-white" value={slideFormData.category_target} onChange={e => setSlideFormData({...slideFormData, category_target: e.target.value})}>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        <option value="All">All Store</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-600 mb-1">Text Alignment (Left or Right side of banner)</label>
                      <select className="w-full p-2 border rounded-lg text-sm text-black font-medium bg-white" value={slideFormData.text_alignment} onChange={e => setSlideFormData({...slideFormData, text_alignment: e.target.value})}>
                        <option value="left">Left Side</option>
                        <option value="right">Right Side</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 2. DYNAMIC IMAGES BUILDER */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-3 border-b pb-2">
                    <h3 className="font-bold text-gray-800">2. Floating Images Layering</h3>
                    <button type="button" onClick={addSlideImage} className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-bold px-3 py-1.5 rounded shadow cursor-pointer">
                      + Add Image
                    </button>
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
                            <div>
                              <label className="block text-[10px] font-bold text-gray-500 uppercase">Direct Image URL (.png / .jpg)</label>
                              <input type="text" className="w-full p-2 border rounded text-sm text-black font-medium" value={img.url} onChange={(e) => updateSlideImage(idx, 'url', e.target.value)} placeholder="https://..." />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase">Width / Size</label>
                                <input type="text" className="w-full p-2 border rounded text-sm text-black font-medium" value={img.width} onChange={(e) => updateSlideImage(idx, 'width', e.target.value)} placeholder="e.g. w-32 md:w-48" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase">X/Y Exact Position</label>
                                <input type="text" className="w-full p-2 border rounded text-sm text-black font-medium" value={img.position} onChange={(e) => updateSlideImage(idx, 'position', e.target.value)} placeholder="e.g. top-[10%] left-[5%]" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase">Animation & Delay</label>
                                <input type="text" className="w-full p-2 border rounded text-sm text-black font-medium" value={img.animation} onChange={(e) => updateSlideImage(idx, 'animation', e.target.value)} placeholder="e.g. anim-float-1 delay-100" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase">Z-Index (Layer Height)</label>
                                <input type="text" className="w-full p-2 border rounded text-sm text-black font-medium" value={img.zIndex} onChange={(e) => updateSlideImage(idx, 'zIndex', e.target.value)} placeholder="e.g. z-10, z-20" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  <button type="submit" className="flex-1 bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-lg transition shadow-md cursor-pointer">
                    {editingSlide ? '💾 Update Slide' : '💾 Save New Slide'}
                  </button>
                  {editingSlide && (
                    <button type="button" onClick={() => { setEditingSlide(null); setSlideFormData({ id: '', tag: '', title: '', subtitle: '', button_text: 'Shop Now', category_target: 'All', text_alignment: 'right', images: [] }); }} className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg font-bold text-gray-700 cursor-pointer">
                      Cancel
                    </button>
                  )}
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
                      <div className="text-[10px] text-gray-400 font-bold uppercase mb-3">
                        {slide.images?.length || 0} Floating Images
                      </div>
                      
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
        )}

      </div>
    </div>
  );
}