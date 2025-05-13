// src/components/PopularBoatsSection.jsx
import BoatCard from './BoatCard'

export default function PopularBoatsSection() {
  const popularBoats = [
    {
      id: 1,
      name: 'Lagoon 450',
      price: 550,
      rating: 4.9,
      image: '/public/beach.jpg',
    },
    {
      id: 2,
      name: 'Bali 4.1',
      price: 620,
      rating: 4.8,
      image: '/boats/boat8.jpg',
    },
    {
      id: 3,
      name: 'Sunseeker 55',
      price: 750,
      rating: 4.7,
      image: '/boats/boat9.jpg',
    },

  ];

  return (
    <section className="px-6 py-12">
      <h2 className="text-2xl font-bold mb-8">No License needed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {popularBoats.map((boat) => (
          <BoatCard key={boat.id} boat={boat} />
        ))}
      </div>
    </section>
  );
}
