import Link from 'next/link';

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
      {/* Hero Rounded Container */}
      <div className="bg-[#12141c] border border-gray-800/80 rounded-2xl p-8 sm:p-12 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        
        {/* Left Text Content */}
        <div className="max-w-3xl z-10">
          <span className="text-[#c2f970] text-xs font-black tracking-widest uppercase mb-4 block">
            WORKOUT LIBRARY
          </span>
          
          {/* Exact 2-Line Break Alignment */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[0.95] mb-6">
            <span className="block whitespace-nowrap">TRAIN WITH INTENT. LOG</span>
            <span className="block">EVERY SET.</span>
          </h1>
          
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          
          <Link
            href="#library"
            className="inline-flex items-center justify-center bg-[#c2f970] hover:bg-[#b0f550] text-black font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition shadow-lg shadow-[#c2f970]/10"
          >
            BROWSE WORKOUTS
          </Link>
        </div>

        {/* Right Banner Image */}
        <div className="relative w-full md:w-auto flex justify-center md:justify-end z-10 shrink-0">
          <img
            src="/banner.png"
            alt="Workout Banner"
            className="h-64 sm:h-80 md:h-[350px] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          />
        </div>

      </div>
    </section>
  );
}