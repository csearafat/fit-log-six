'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const updateCounts = () => {
    const storedPlans = JSON.parse(localStorage.getItem('my_plans') || '[]');
    const storedSaved = JSON.parse(localStorage.getItem('my_saved') || '[]');
    setPlanCount(storedPlans.length);
    setSavedCount(storedSaved.length);
  };

  useEffect(() => {
    updateCounts();

    
    window.addEventListener('storage_update', updateCounts);
    window.addEventListener('storage', updateCounts);

    return () => {
      window.removeEventListener('storage_update', updateCounts);
      window.removeEventListener('storage', updateCounts);
    };
  }, []);

  return (
    
    <nav className="sticky top-0 z-50 w-full bg-[#0b0c0e]/95 backdrop-blur-md border-b border-gray-800/60 py-3">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="FITLOG Logo"
            className="h-7 w-auto object-contain"
          />
          <span className="text-white font-black tracking-wider text-xl uppercase font-sans">
            FITLOG
          </span>
        </Link>

        {/* Middle Navigation */}
        <div className="flex items-center gap-1 bg-[#12141a] p-1 rounded-full border border-gray-800">
          <Link
            href="/"
            className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
              pathname === '/' || pathname === '/workouts'
                ? 'bg-[#c2f970] text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
              pathname === '/my-plan'
                ? 'bg-[#c2f970] text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Dynamic Count Badges */}
        <div className="flex items-center gap-2 bg-[#12141a] p-1.5 rounded-full border border-gray-800/80">
          <Link
            href="/my-plan?tab=plan"
            className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-gray-300 hover:text-white transition-all"
          >
            <span>Plan</span>
            <span className="bg-[#c2f970] text-black text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-gray-300 hover:text-white transition-all"
          >
            <span>Saved</span>
            <span className="bg-[#c2f970] text-black text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {savedCount}
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
}