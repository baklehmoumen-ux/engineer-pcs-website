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
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  
  // NEW: Search Engine State
  const [adminSearch, setAdminSearch] = useState('');

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'Motherboards',
    price: '',
    image: '',
    in_stock: true
  });

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('name');
    if (error) console.error('Error fetching:', error);
    else setDbProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Merge static items with DB items (DB entries override static items)
  const allProducts = useMemo(() => {
    const dbIds = new Set(dbProducts.map(p => p.id));
    const remainingStatic = staticInventory.filter(item => !dbIds.has(item.id));
    return [...dbProducts, ...remainingStatic].sort((a, b) => a.name.localeCompare(b.name));
  }, [dbProducts]);

  // NEW: Filter items based on the admin search bar
  const displayedProducts = useMemo(() => {
    if (!adminSearch) return allProducts;
    const lowerSearch = adminSearch.toLowerCase();
    return allProducts.filter(item => 
      item.name.toLowerCase().includes(lowerSearch) || 
      item.category.toLowerCase().includes(lowerSearch)
    );
  }, [allProducts, adminSearch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemData = {
      id: formData.id || `item-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      image: formData.image || '/images/default.jpg',
      in_stock: formData.in_stock
    };

    // Upsert into Supabase so editing static items creates/updates their record in Supabase
    const { error } = await supabase.from('products').upsert([itemData]);
    if (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product to database.");
    }

    setFormData({ id: '', name: '', category: 'Motherboards', price: '', image: '', in_stock: true });
    setEditingItem(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditingItem(product);
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      in_stock: product.in_stock !== undefined ? product.in_stock : true
    });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete or hide this item?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">⚡ EngineerPCs Admin Panel</h1>
          <a href="/" className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700">
            ← Back to Store
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md h-fit">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {editingItem ? '✏️ Edit Product' : '➕ Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Product Name</label>
                <input required type="text" className="w-full p-2.5 border rounded-lg outline-none text-sm text-black" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Ryzen 7 7800X3D" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Category</label>
                <select className="w-full p-2.5 border rounded-lg outline-none text-sm text-black bg-white" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Retail Price ($)</label>
                <input required type="number" step="0.01" className="w-full p-2.5 border rounded-lg outline-none text-sm text-black" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="299" />
              </div>

              <div>
                {/* UPDATED: Multiple Images prompt */}
                <label className="block text-xs font-bold text-gray-600 mb-1">Image Path(s) / URL(s) - Separate with commas</label>
                <input type="text" className="w-full p-2.5 border rounded-lg outline-none text-sm text-black" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} placeholder="url1.jpg, url2.jpg" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Availability Status</label>
                <select 
                  className="w-full p-2.5 border rounded-lg outline-none text-sm text-black bg-white font-medium" 
                  value={formData.in_stock ? 'true' : 'false'} 
                  onChange={(e) => setFormData({...formData, in_stock: e.target.value === 'true'})}
                >
                  <option value="true">In Stock ✅</option>
                  <option value="false">Out of Stock ❌</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-yellow-400 hover:bg-yellow-500 font-bold py-2.5 rounded-lg text-black cursor-pointer">
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
                {editingItem && (
                  <button type="button" onClick={() => { setEditingItem(null); setFormData({ id: '', name: '', category: 'Motherboards', price: '', image: '', in_stock: true }); }} className="bg-gray-300 hover:bg-gray-400 px-4 py-2.5 rounded-lg font-bold text-gray-700 cursor-pointer">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">📦 All Store Catalog ({allProducts.length})</h2>
            
            {/* NEW: Admin Search Bar */}
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Search products by name or category..." 
                className="w-full p-2.5 border border-gray-300 rounded-lg outline-none text-sm text-black focus:border-yellow-500 transition-colors"
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
              />
            </div>

            {loading ? (
              <div className="text-center py-10 text-gray-500">Loading catalog...</div>
            ) : displayedProducts.length === 0 ? (
              <div className="text-center py-10 text-gray-500">No items found matching your search.</div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {displayedProducts.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:border-gray-300 transition">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                        {item.in_stock === false && (
                          <span className="text-[10px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded">Out of Stock</span>
                        )}
                      </div>
                      <p className="text-xs text-blue-600 font-medium">{item.category} — <span className="text-gray-900 font-bold">${item.price}</span></p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(item)} className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded text-xs font-bold cursor-pointer">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded text-xs font-bold cursor-pointer">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}