'use client';

import Link from 'next/link';
import { Flame, Clock, Plus, Check } from 'lucide-react';
import { usePlan } from '@/context/PlanContext';

export default function WorkoutCard({ workout }) {
  const { savedWorkouts, addToPlan } = usePlan();
  const isSaved = savedWorkouts.some((item) => item.id === workout.id);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col group">
      {/* Image Container */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <img
          src={workout.image || workout.thumbnail || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop'}
          alt={workout.name || workout.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {workout.category || workout.difficulty || 'General'}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition line-clamp-1">
            {workout.name || workout.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {workout.description || 'A complete target exercise designed to keep you fit and healthy.'}
          </p>
        </div>

        {/* Info Badges */}
        <div className="flex items-center gap-4 text-xs font-medium text-gray-600 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-500" />
            <span>{workout.duration || '20 min'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>{workout.calories || '150 kcal'}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 pt-2 mt-auto">
          <Link
            href={`/workouts/${workout.id}`}
            className="flex-1 text-center bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 text-xs font-semibold py-2.5 px-3 rounded-xl transition"
          >
            Details
          </Link>

          <button
            onClick={() => addToPlan(workout)}
            disabled={isSaved}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition ${
              isSaved
                ? 'bg-emerald-100 text-emerald-700 cursor-not-allowed'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}