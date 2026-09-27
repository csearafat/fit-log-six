'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState('plan'); // 'plan' or 'saved'
  const [planList, setPlanList] = useState([]);
  const [savedList, setSavedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('Duration'); // সর্টিং স্টেট: Duration, Calories, Rating

  useEffect(() => {
    const fetchMyPlanData = async () => {
      try {
        setLoading(true);
        const localPlans = JSON.parse(localStorage.getItem('my_plans') || '[]');
        const localSaved = JSON.parse(localStorage.getItem('my_saved') || '[]');

        if (localPlans.length === 0 && localSaved.length === 0) {
          const res = await fetch('https://api.api-store.workers.dev/api/fitlog');
          const data = await res.json();
          
          if (Array.isArray(data) && data.length >= 3) {
            const initialPlans = data.slice(0, 2);
            const initialSaved = data.slice(2, 3);
            
            setPlanList(initialPlans);
            setSavedList(initialSaved);

            localStorage.setItem('my_plans', JSON.stringify(initialPlans));
            localStorage.setItem('my_saved', JSON.stringify(initialSaved));
            
            window.dispatchEvent(new Event('storage_update'));
          }
        } else {
          setPlanList(localPlans);
          setSavedList(localSaved);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPlanData();
  }, []);

  const handleRemove = (id, type) => {
    if (type === 'plan') {
      const updated = planList.filter(item => (item._id || item.id) !== id);
      setPlanList(updated);
      localStorage.setItem('my_plans', JSON.stringify(updated));
    } else {
      const updated = savedList.filter(item => (item._id || item.id) !== id);
      setSavedList(updated);
      localStorage.setItem('my_saved', JSON.stringify(updated));
    }

    window.dispatchEvent(new Event('storage_update'));
  };

  const currentList = activeTab === 'plan' ? planList : savedList;

  // সর্টিং/ফিল্টারিং লজিক (Duration, Calories, Rating অনুযায়ী)
  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === 'Duration') {
      const durationA = parseInt(a.duration || a.time || 0);
      const durationB = parseInt(b.duration || b.time || 0);
      return durationB - durationA; // বেশি সময় থেকে কম সময়
    }
    if (sortBy === 'Calories') {
      const calA = parseInt(a.calories || a.kcal || 0);
      const calB = parseInt(b.calories || b.kcal || 0);
      return calB - calA; // বেশি ক্যালোরি থেকে কম ক্যালোরি
    }
    if (sortBy === 'Rating') {
      const ratingA = parseFloat(a.rating || 0);
      const ratingB = parseFloat(b.rating || 0);
      return ratingB - ratingA; // বেশি রেটিং (Top rated) থেকে কম রেটিং
    }
    return 0;
  });

  const totalMinutes = currentList.reduce((acc, item) => acc + parseInt(item.duration || item.time || 15), 0);
  const totalCalories = currentList.reduce((acc, item) => acc + parseInt(item.calories || item.kcal || 120), 0);

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-white p-6 max-w-6xl mx-auto">
      {/* Title Header */}
      <h1 className="text-3xl font-black tracking-tight uppercase">MY PLAN</h1>
      <p className="text-xs text-gray-400 mb-6">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Summary Cards */}
      <div className="bg-[#12141a] border border-gray-800/80 rounded-2xl p-5 mb-8 grid grid-cols-3 gap-4">
        <div>
          <span className="text-xs text-gray-400 font-semibold block mb-1">Exercises</span>
          <span className="text-3xl font-black text-[#c2f970]">{currentList.length}</span>
        </div>
        <div>
          <span className="text-xs text-gray-400 font-semibold block mb-1">Minutes</span>
          <span className="text-3xl font-black text-white">{totalMinutes}</span>
        </div>
        <div>
          <span className="text-xs text-gray-400 font-semibold block mb-1">Calories</span>
          <span className="text-3xl font-black text-white">{totalCalories}</span>
        </div>
      </div>

      {/* Tabs & Sort Controls */}
      <div className="flex items-center justify-between border-b border-gray-800/80 pb-3 mb-6">
        <div className="flex items-center gap-2 bg-[#12141a] p-1 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'plan' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Today's Plan ({planList.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'saved' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Saved ({savedList.length})
          </button>
        </div>

        {/* Sort By Option Dropdown with Rating */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Sort By</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#12141a] border border-gray-800 rounded-lg px-3 py-1.5 text-white font-medium focus:outline-none cursor-pointer"
          >
            <option value="Duration">Duration</option>
            <option value="Calories">Calories</option>
            <option value="Rating">Rating</option>
          </select>
        </div>
      </div>

      {/* List / Empty State */}
      {loading ? (
        <div className="text-center py-12 text-gray-400 text-sm">Loading your workouts...</div>
      ) : sortedList.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center justify-center my-6">
          <h2 className="text-2xl font-black text-white tracking-wide uppercase mb-2">
            NOTHING HERE YET
          </h2>
          <p className="text-xs text-gray-400 max-w-md mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link 
            href="/" 
            className="bg-[#c2f970] text-black text-xs font-black px-6 py-3 rounded-full hover:bg-[#b0f050] transition-all"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedList.map((item) => {
            const id = item._id || item.id;
            return (
              <div
                key={id}
                className="bg-[#12141a] border border-gray-800/80 rounded-2xl p-3.5 flex items-center justify-between hover:border-gray-700 transition-all"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || item.imageUrl || '/placeholder.png'}
                    alt={item.title || item.name}
                    className="w-20 h-14 object-cover rounded-xl"
                  />
                  <div>
                    <h4 className="text-sm font-extrabold text-white uppercase mb-1">
                      {item.title || item.name}
                    </h4>
                    <p className="text-xs text-gray-400 mb-1">
                      {item.equipment || 'Bodyweight'}
                    </p>
                    <div className="flex items-center gap-4 text-[11px] text-gray-400">
                      <span>⏱ {item.duration || item.time || 15} min</span>
                      <span>🔥 {item.calories || item.kcal || '120'} kcal</span>
                      <span className="text-white font-bold">★ {item.rating || '4.5'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/workouts/${id}`}
                    className="bg-[#1c2029] text-gray-300 hover:text-white text-xs font-bold px-4 py-2 rounded-xl border border-gray-700/50 transition-all"
                  >
                    View Details
                  </Link>
                  <button className="bg-[#c2f970] text-black text-xs font-black px-4 py-2 rounded-xl hover:bg-[#b0f050] transition-all">
                    ✓ Mark as Done
                  </button>
                  <button
                    onClick={() => handleRemove(id, activeTab)}
                    className="text-gray-500 hover:text-red-400 p-2 text-lg transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}