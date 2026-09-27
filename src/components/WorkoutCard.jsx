import Link from 'next/link';

export default function WorkoutCard({ workout }) {
  if (!workout) return null;

  // ID Handling
  const workoutId = workout._id || workout.id;
  const title = workout.title || workout.name || '';

  
  const getCategoryFromTitle = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('bench press') || lowerName.includes('push-up') || lowerName.includes('chest')) return 'CHEST';
    if (lowerName.includes('pull-up') || lowerName.includes('row') || lowerName.includes('lat') || lowerName.includes('back')) return 'BACK';
    if (lowerName.includes('squat') || lowerName.includes('lunge') || lowerName.includes('leg') || lowerName.includes('calf')) return 'LEGS';
    if (lowerName.includes('overhead press') || lowerName.includes('shoulder') || lowerName.includes('deltoid')) return 'SHOULDERS';
    if (lowerName.includes('curl') || lowerName.includes('bicep') || lowerName.includes('tricep') || lowerName.includes('arm')) return 'ARMS';
    if (lowerName.includes('plank') || lowerName.includes('twist') || lowerName.includes('abs') || lowerName.includes('core')) return 'CORE';
    return null;
  };

  
  const rawCategory = 
    workout.category || 
    workout.target || 
    workout.muscleGroup || 
    workout.muscle;

  const categoryFromApi = typeof rawCategory === 'object' && rawCategory !== null
    ? (rawCategory.name || rawCategory.title)
    : rawCategory;

  
  const categoryName = 
    (categoryFromApi && categoryFromApi.toUpperCase() !== 'FITNESS' ? categoryFromApi : null) || 
    getCategoryFromTitle(title) || 
    'FITNESS';

  
  const equipmentName = 
    workout.equipment || 
    (Array.isArray(workout.equipments) ? workout.equipments.join(', ') : 'Bodyweight');

  
  const durationValue = workout.duration || workout.time || '15';
  const caloriesValue = workout.calories || workout.kcal || '180 kcal';
  const ratingValue = workout.rating || '4.8';

  return (
    <Link href={`/workouts/${workoutId}`} className="group block h-full">
      <div className="bg-[#12141a] border border-gray-800/80 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-300 flex flex-col h-full p-1.5">
        
        {/* Compact & Fixed Height Image Box */}
        <div className="w-full h-36 sm:h-40 overflow-hidden rounded-xl bg-[#0b0c0e]">
          <img
            src={workout.image || workout.imageUrl || '/placeholder.png'}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-xl"
          />
        </div>

        {/* Card Body */}
        <div className="p-3 flex flex-col justify-between flex-grow">
          <div>
            {/* Dynamic Category Tag */}
            <div className="mb-2">
              <span className="bg-[#c2f970] text-black text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded inline-block">
                {categoryName}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-sm font-extrabold text-white uppercase tracking-tight group-hover:text-[#c2f970] transition-colors line-clamp-1 mb-0.5">
              {title}
            </h3>

            {/* Equipment Subtitle */}
            <p className="text-xs text-gray-400 font-medium line-clamp-1 mb-3">
              {equipmentName}
            </p>
          </div>

          {/* Bottom Footer: পাশাপাশি টাইম, ক্যালোরি ও রেটিং */}
          <div className="flex items-center justify-start gap-5 text-xs text-gray-400 pt-1">
            {/* Time / Duration */}
            <div className="flex items-center gap-1 text-[11px] font-medium text-gray-300">
              <span className="text-gray-400 text-xs">⏱</span>
              <span>{durationValue}</span>
            </div>

            {/* Calories */}
            <div className="flex items-center gap-1 text-[11px] font-medium text-gray-300">
              <span className="text-orange-500 text-xs">🔥</span>
              <span>{caloriesValue}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 text-[11px] font-bold text-white">
              <span className="text-yellow-400 text-xs">★</span>
              <span>{ratingValue}</span>
            </div>
          </div>

        </div>

      </div>
    </Link>
  );
}