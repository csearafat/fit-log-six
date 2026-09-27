'use client';

import { usePlan } from '@/context/PlanContext';

export default function WorkoutActionButtons({ workout }) {
  const { addToPlan, addToSaved } = usePlan();

  return (
    <div className="flex flex-wrap items-center gap-4 pt-4">
      <button 
        onClick={() => addToPlan(workout)}
        className="flex-1 bg-[#c2f970] text-black font-extrabold text-xs sm:text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b0f550] transition cursor-pointer"
      >
        <span>📅</span> Add to today's plan
      </button>

      <button 
        onClick={() => addToSaved(workout)}
        className="flex-1 bg-transparent border border-gray-800 text-gray-300 font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 hover:border-gray-700 transition cursor-pointer"
      >
        <span>🔖</span> Save for later
      </button>
    </div>
  );
}