import Link from 'next/link';
import { ArrowRight, Flame, Target, Trophy } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-emerald-900 via-gray-900 to-black text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-3xl shadow-xl">
      <div className="max-w-7xl mx-auto relative z-10 text-center sm:text-left grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Flame className="w-4 h-4 text-emerald-400" />
            <span>Transform Your Fitness Today</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Log Your Workouts, <br />
            <span className="text-emerald-400">Build Your Plan.</span>
          </h1>
          
          <p className="text-gray-300 text-base sm:text-lg max-w-xl">
            Discover customized exercise routines, track your daily routines, and save target plans seamlessly for maximum performance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center sm:justify-start">
            <Link
              href="/workouts"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-gray-900 font-bold px-6 py-3.5 rounded-xl hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/25"
            >
              Explore Workouts
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/my-plan"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-medium px-6 py-3.5 rounded-xl hover:bg-white/20 transition border border-white/10 backdrop-blur-sm"
            >
              View My Plan
            </Link>
          </div>
        </div>

        {/* Right Stats Cards */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto w-full">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col items-center sm:items-start text-center sm:text-left">
            <Target className="w-8 h-8 text-emerald-400 mb-3" />
            <span className="text-3xl font-bold">50+</span>
            <span className="text-xs text-gray-400 mt-1">Exercise Routines</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col items-center sm:items-start text-center sm:text-left">
            <Trophy className="w-8 h-8 text-emerald-400 mb-3" />
            <span className="text-3xl font-bold">100%</span>
            <span className="text-xs text-gray-400 mt-1">Free Access</span>
          </div>
        </div>

      </div>
    </section>
  );
}