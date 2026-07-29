"use client";
import React, { useState, useEffect } from 'react';
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

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'Motherboards',
    price: '',
    image: ''
  });

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('name');
    if (error) console.error('Error fetching:', error);
    else setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemData = {
      id: formData.id || `item-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      image: formData.image || '/images/default.jpg'
    };

    if (editingItem) {
      await supabase.from('products').update(itemData).eq('id', editingItem.id);
    } else {
      await supabase.from('products').insert([itemData]);
    }

    setFormData({ id: '', name: '', category: 'Motherboards', price: '', image: '' });
    setEditingItem(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditingItem(product);
    setFormData(product);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
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
                <label className="block text-xs font-bold text-gray-600 mb-1">Image Path / URL</label>
                <input type="text" className="w-full p-2.5 border rounded-lg outline-none text-sm text-black" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} placeholder="/images/ryzen7.jpg" />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-yellow-400 hover:bg-yellow-500 font-bold py-2.5 rounded-lg text-black cursor-pointer">
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
                {editingItem && (
                  <button type="button" onClick={() => { setEditingItem(null); setFormData({ id: '', name: '', category: 'Motherboards', price: '', image: '' }); }} className="bg-gray-300 hover:bg-gray-400 px-4 py-2.5 rounded-lg font-bold text-gray-700 cursor-pointer">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">📦 Live Store Catalog ({products.length})</h2>
            
            {loading ? (
              <div className="text-center py-10 text-gray-500">Loading catalog...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-10 text-gray-500">No items in database yet. Add your first item on the left!</div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {products.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:border-gray-300 transition">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
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