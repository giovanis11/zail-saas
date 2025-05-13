// src/components/DownloadCTASection.jsx
import { Check } from 'lucide-react';

export default function DownloadCTASection() {
  return (
    <section className="px-6 py-16">
      <div className="relative bg-[#2C2E96] rounded-3xl overflow-hidden p-10 flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Blurred Background Shapes */}
        <div className="absolute inset-0 z-0">
          {/* Top Left Blur */}
          <div className="absolute top-8 right-60 w-72 h-32 bg-white opacity-20 rounded-xl filter blur-l"></div>

          {/* Bottom Right Blur */}
          <div className="absolute bottom-12 right-6 w-72 h-32 bg-white opacity-20 rounded-xl filter blur-l"></div>

          {/* Middle Right Blur */}
          <div className="absolute top-1/2 right-6 w-32 h-32 bg-white opacity-0 rounded-2xl filter blur-3xl"></div>
          <div className="absolute bottom-1/2 right-6 w-72 h-32 bg-white opacity-20 rounded-xl filter blur-l"></div>

        </div>

        {/* Left Text */}
        <div className="relative z-10 flex-1 text-white space-y-6">
          <h2 className="text-6xl font-bold leading-tight">
            Making Memories One<br />Sail at a Time.
          </h2>
          <a href="#" className="underline decoration-2 underline-offset-4 text-blue-200 text-lg">
            Book your next trip. Fast & easy
          </a>
        </div>

        {/* Right Phone & Buttons */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
          <div className="relative w-48 h-96 bg-gray-200 rounded-3xl overflow-hidden">
            <img
              src="/map.png"
              alt="Phone Map"
              className="w-full h-full object-cover"
            />
            
            {/* Small Orange Label */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs px-4 py-1 rounded-full">
              Join Zail
            </div>

            {/* Big Orange Get Deals Button */}
            <button className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-3 rounded-full flex items-center gap-2 font-bold shadow-lg">
              <Check size={20} /> Get Deals!
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
