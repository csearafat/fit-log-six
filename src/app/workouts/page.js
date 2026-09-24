'use client';

import { useState, useEffect } from 'react';
import WorkoutCard from '@/components/WorkoutCard';
import { Search, Dumbbell, Loader2 } from 'lucide-react';

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setWorkouts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  // ক্যাটাগরি ফিল্টারিং অপশন বের করা
  const categories = ['All', ...new Set(workouts.map((item) => item.category || item.difficulty).filter(Boolean))];

  // সার্চ এবং ক্যাটাগরি ফিল্টার করা ডাটা
  const filteredWorkouts = workouts.filter((workout) => {
    const nameMatch = (workout.name || workout.title || '').toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch =
      selectedCategory === 'All' || (workout.category || workout.difficulty) === selectedCategory;
    return nameMatch && categoryMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
          <Dumbbell className="w-8 h-8 text-emerald-600" />
          <span>Workout Library</span>
        </h1>
        <p className="text-gray-500 text-sm">
          Browse through our full list of routines and customize your fitness journey.
        </p>
      </div>

      {/* Controls: Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search workouts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading workout routines...</p>
        </div>
      ) : filteredWorkouts.length > 0 ? (
        /* Workouts Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <p className="text-gray-800 font-bold text-lg">No workouts found</p>
          <p className="text-gray-500 text-sm">
            Try adjusting your search or category filter to find what you are looking for.
          </p>
        </div>
      )}
    </div>
  );
}