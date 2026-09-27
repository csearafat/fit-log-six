import Link from 'next/link';
import WorkoutActionButtons from '@/components/WorkoutActionButtons';

export default async function WorkoutDetailPage({ params }) {
  const { id } = await params;
  
  let workout = null;
  try {
    const res = await fetch('https://api.api-store.workers.dev/api/fitlog', {
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.workouts || data.data || []);
      workout = list.find((w) => String(w._id || w.id) === String(id));
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }

  if (!workout) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        Workout not found
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 text-white min-h-[calc(100vh-120px)] flex flex-col justify-center items-center">
      
      {/* Outer Card Container matched with Figma */}
      <div className="w-full bg-[#12141c] border border-gray-800/80 rounded-2xl p-4 sm:p-6 lg:p-7 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        
        {/* Left Side: Image Box with controlled height */}
        <div className="w-full h-full min-h-[260px] max-h-[320px] lg:max-h-[360px] overflow-hidden rounded-xl border border-gray-800/60 bg-[#0b0c0e]">
          <img
            src={workout.image || workout.imageUrl || '/placeholder.png'}
            alt={workout.title || workout.name}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Right Side: Information & Action Buttons */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Title & Badge */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                {workout.title || workout.name}
              </h1>
              <span className="bg-[#c2f970] text-black text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded">
                {workout.category || workout.muscleGroup || 'FITNESS'}
              </span>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed mb-3">
              {workout.description || 'Bodyweight vertical pull that hammers lats, biceps, and grip while improving relative strength.'}
            </p>

            {/* Compact Stats Table */}
            <div className="bg-[#0b0c0e]/80 border border-gray-800/60 rounded-xl p-2.5 text-xs divide-y divide-gray-800/50 mb-3">
              <div className="flex justify-between py-1">
                <span className="text-gray-400 uppercase text-[10px] font-bold tracking-wider">Equipment</span>
                <span className="font-semibold text-white">{workout.equipment || 'Pull-up Bar'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-400 uppercase text-[10px] font-bold tracking-wider">Difficulty</span>
                <span className="font-semibold text-white">{workout.difficulty || 'Intermediate'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-400 uppercase text-[10px] font-bold tracking-wider">Sets</span>
                <span className="font-semibold text-white">{workout.sets || 4}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-400 uppercase text-[10px] font-bold tracking-wider">Reps</span>
                <span className="font-semibold text-white">{workout.reps || '6-10'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-400 uppercase text-[10px] font-bold tracking-wider">Duration</span>
                <span className="font-semibold text-white">{workout.duration || workout.time || '15 min'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-400 uppercase text-[10px] font-bold tracking-wider">Calories</span>
                <span className="font-semibold text-white">{workout.calories || '180 kcal'}</span>
              </div>
            </div>

            {/* Instructions */}
            {workout.instructions && workout.instructions.length > 0 && (
              <div className="mb-2">
                <h3 className="text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-1">Instructions</h3>
                <ol className="list-decimal list-inside text-[11px] text-gray-400 space-y-0.5">
                  {workout.instructions.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Action Buttons inside Card */}
          <div className="pt-1">
            <WorkoutActionButtons workout={workout} />
          </div>
        </div>

      </div>
    </main>
  );
}