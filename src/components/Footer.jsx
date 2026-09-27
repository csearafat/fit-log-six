import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0b0c0e] border-t border-gray-800/60 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="text-[#c2f970]">
            <svg 
              className="w-5 h-5" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M6 5v14M18 5v14M3 8v8M21 8v8M6 12h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-black text-white text-base tracking-wider uppercase">
            FITLOG
          </span>
        </Link>

        {/* Right Side: Copyright & Tagline */}
        <p className="text-gray-400 text-xs sm:text-sm font-normal">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}