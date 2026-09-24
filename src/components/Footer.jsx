import Link from 'next/link';
import { Dumbbell, Globe, Share2, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xl font-bold text-emerald-500">
              <Dumbbell className="w-6 h-6" />
              <span>FitLog</span>
            </div>
            <p className="text-sm text-gray-400">
              Your ultimate workout companion. Track routines, save personalized plans, and achieve your fitness goals effectively.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-emerald-400 transition">Home</Link></li>
              <li><Link href="/workouts" className="hover:text-emerald-400 transition">Workout Library</Link></li>
              <li><Link href="/my-plan" className="hover:text-emerald-400 transition">My Saved Plan</Link></li>
            </ul>
          </div>

          {/* Col 3: Social Links */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-3">Connect With Us</h3>
            <div className="flex items-center gap-4 text-gray-400">
              <a href="#" className="hover:text-emerald-400 transition"><Globe className="w-5 h-5" /></a>
              <a href="#" className="hover:text-emerald-400 transition"><Share2 className="w-5 h-5" /></a>
              <a href="#" className="hover:text-emerald-400 transition"><Heart className="w-5 h-5" /></a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} FitLog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}