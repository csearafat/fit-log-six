import Hero from '@/components/Hero';
import WorkoutCard from '@/components/WorkoutCard';

async function getWorkouts() {
  try {
    const res = await fetch('https://api.api-store.workers.dev/api/fitlog', {
      cache: 'no-store',
    });

    if (!res.ok) return [];
    const data = await res.json();

    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.workouts)) return data.workouts;
    if (data && Array.isArray(data.data)) return data.data;
    if (data && typeof data === 'object') {
      return Object.values(data).find((val) => Array.isArray(val)) || [];
    }

    return [];
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return [];
  }
}

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main className="min-h-screen bg-[#0b0c0e] text-white pb-20">
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-black tracking-tight uppercase">THE LIBRARY</h2>
          <p className="text-gray-400 text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* 3 Columns Grid Layout */}
        {workouts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout, index) => (
              <WorkoutCard 
                key={workout._id || workout.id || index} 
                workout={workout} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500 font-medium bg-[#12141a] border border-gray-800 rounded-2xl">
            Unable to load workouts. Please check connection or API status.
          </div>
        )}
      </section>
    </main>
  );
}