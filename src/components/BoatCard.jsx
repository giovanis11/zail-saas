// src/components/BoatCard.jsx
import { ArrowRight } from 'lucide-react';

export default function BoatCard({ boat }) {
  if (!boat) return null;

  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition-all duration-300 relative group">
      <img
        src={boat.image}
        alt={boat.name}
        className="w-full h-60 object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-center bg-gradient-to-t from-black/70 to-transparent">
        <div>
          <h3 className="text-white text-lg font-semibold">{boat.name}</h3>
          <p className="text-white text-sm">from ${boat.price}</p>
        </div>
        <div className="bg-blue-800 p-2 rounded-full group-hover:bg-blue-900 transition">
          <ArrowRight size={18} className="text-white" style={{ transform: 'rotate(-45deg)'}}/>
        </div>
      </div>
    </div>
  );
}
