import Hero from '@/components/Hero';
import WorkoutCard from '@/components/WorkoutCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

async function getFeaturedWorkouts() {
  try {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch workouts');
    const data = await res.json();
    return Array.isArray(data) ? data.slice(0, 6) : [];
  } catch (error) {
    console.error('Error fetching API:', error);
    return [];
  }
}

export default async function HomePage() {
  const featuredWorkouts = await getFeaturedWorkouts();

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <Hero />

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Workouts</h2>
            <p className="text-sm text-gray-500 mt-1">Handpicked exercises to boost your routine.</p>
          </div>
          <Link
            href="/workouts"
            className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {featuredWorkouts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-sm">Unable to load workouts right now. Please check back later!</p>
          </div>
        )}
      </section>
    </div>
  );
}