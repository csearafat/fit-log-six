'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dumbbell, Bookmark } from 'lucide-react';
import { usePlan } from '@/context/PlanContext';

export default function Navbar() {
  const pathname = usePathname();
  const { savedWorkouts } = usePlan();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Workouts', path: '/workouts' },
    { name: 'My Plan', path: '/my-plan' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-emerald-600 hover:opacity-90 transition">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
            <Dumbbell className="w-6 h-6" />
          </div>
          <span>Fit<span className="text-gray-800">Log</span></span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                  isActive ? 'text-emerald-600 font-semibold' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Button / Plan Badge */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-emerald-700 transition shadow-sm"
          >
            <Bookmark className="w-4 h-4" />
            <span>Plan</span>
            <span className="bg-emerald-800 text-emerald-100 text-xs px-2 py-0.5 rounded-full font-bold">
              {savedWorkouts.length}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}