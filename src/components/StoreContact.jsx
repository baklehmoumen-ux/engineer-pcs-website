import React from 'react';

export default function StoreContact() {
  return (
    <div className="flex gap-2 text-sm font-bold">
      <a href="https://wa.me/963946508988" target="_blank" rel="noopener noreferrer" className="hover:border-white border border-transparent p-2 rounded flex flex-col justify-center">
        <span className="text-gray-300 font-normal text-xs">Need help?</span>
        WhatsApp Us
      </a>
      <a href="https://www.instagram.com/engineer_pcs/" target="_blank" rel="noopener noreferrer" className="hover:border-white border border-transparent p-2 rounded flex flex-col justify-center">
        <span className="text-gray-300 font-normal text-xs">Follow us</span>
        Instagram
      </a>
    </div>
  );
}